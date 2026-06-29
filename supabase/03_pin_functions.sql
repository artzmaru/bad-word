-- PIN functions using pgcrypto for bcrypt hashing
-- Run AFTER 02_rls.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Set parent PIN (stores bcrypt hash)
CREATE OR REPLACE FUNCTION set_parent_pin(p_hash TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO parent_settings (parent_id, pin_hash)
  VALUES (auth.uid(), crypt(p_hash, gen_salt('bf', 10)))
  ON CONFLICT (parent_id)
  DO UPDATE SET pin_hash = crypt(p_hash, gen_salt('bf', 10));
END;
$$;

-- Verify parent PIN
CREATE OR REPLACE FUNCTION verify_parent_pin(p_hash TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_pin_hash TEXT;
BEGIN
  SELECT pin_hash INTO v_pin_hash
  FROM parent_settings
  WHERE parent_id = auth.uid();

  IF v_pin_hash IS NULL THEN
    RETURN false;
  END IF;

  RETURN v_pin_hash = crypt(p_hash, v_pin_hash);
END;
$$;

-- RPC: Add XP and recalculate level
CREATE OR REPLACE FUNCTION add_child_xp(p_child_id UUID, p_amount INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE child_progress
  SET
    total_xp       = total_xp + p_amount,
    current_level  = GREATEST(1, LEAST(99, (total_xp + p_amount) / 100 + 1)),
    last_active_at = now()
  WHERE child_id = p_child_id;
END;
$$;

-- RPC: Increment words seen
CREATE OR REPLACE FUNCTION increment_words_seen(p_child_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE child_progress
  SET words_seen = words_seen + 1, last_active_at = now()
  WHERE child_id = p_child_id;
END;
$$;

-- RPC: Increment words learned
CREATE OR REPLACE FUNCTION increment_words_learned(p_child_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE child_progress
  SET words_learned = words_learned + 1, last_active_at = now()
  WHERE child_id = p_child_id;
END;
$$;

-- RPC: Record quiz attempt
CREATE OR REPLACE FUNCTION record_quiz_attempt(
  p_child_id UUID,
  p_word_id  UUID,
  p_is_correct BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO word_progress (child_id, word_id, quiz_correct, quiz_total)
  VALUES (
    p_child_id,
    p_word_id,
    CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    1
  )
  ON CONFLICT (child_id, word_id)
  DO UPDATE SET
    quiz_correct = word_progress.quiz_correct + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    quiz_total   = word_progress.quiz_total + 1;
END;
$$;

-- RPC: Increment quiz sessions
CREATE OR REPLACE FUNCTION increment_quiz_sessions(p_child_id UUID, p_xp INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE child_progress
  SET
    quiz_sessions_done = quiz_sessions_done + 1,
    total_xp           = total_xp + p_xp,
    last_active_at     = now()
  WHERE child_id = p_child_id;
END;
$$;

-- RPC: Increment scenarios completed
CREATE OR REPLACE FUNCTION increment_scenarios_completed(p_child_id UUID, p_xp INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE child_progress
  SET
    scenarios_completed = scenarios_completed + 1,
    total_xp            = total_xp + p_xp,
    last_active_at      = now()
  WHERE child_id = p_child_id;
END;
$$;
