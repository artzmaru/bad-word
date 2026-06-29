-- Row Level Security Policies
-- Run AFTER 01_schema.sql

-- ─── Enable RLS ───────────────────────────────────────────────────────────────
ALTER TABLE child_profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_progress      ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_progress       ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_settings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_settings      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_attempts   ENABLE ROW LEVEL SECURITY;
-- words, word_details, scenarios, scenario_choices, quiz_questions, quiz_options = public read

-- ─── Words (public read) ──────────────────────────────────────────────────────
ALTER TABLE words               ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_details        ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios           ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_choices    ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options        ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_words      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "words_public_read" ON words FOR SELECT USING (true);
CREATE POLICY "word_details_public_read" ON word_details FOR SELECT USING (true);
CREATE POLICY "scenarios_public_read" ON scenarios FOR SELECT USING (true);
CREATE POLICY "scenario_choices_public_read" ON scenario_choices FOR SELECT USING (true);
CREATE POLICY "quiz_questions_public_read" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "quiz_options_public_read" ON quiz_options FOR SELECT USING (true);
CREATE POLICY "scenario_words_public_read" ON scenario_words FOR SELECT USING (true);

-- ─── Child Profiles ───────────────────────────────────────────────────────────
CREATE POLICY "profiles_parent_all" ON child_profiles
  FOR ALL USING (parent_id = auth.uid());

-- ─── Child Progress ───────────────────────────────────────────────────────────
CREATE POLICY "progress_parent_read" ON child_progress
  FOR SELECT USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "progress_parent_insert" ON child_progress
  FOR INSERT WITH CHECK (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

-- ─── Word Progress ────────────────────────────────────────────────────────────
CREATE POLICY "word_progress_parent_all" ON word_progress
  FOR ALL USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

-- ─── Bookmarks ────────────────────────────────────────────────────────────────
CREATE POLICY "bookmarks_parent_all" ON bookmarks
  FOR ALL USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

-- ─── Parent Settings ──────────────────────────────────────────────────────────
CREATE POLICY "parent_settings_own" ON parent_settings
  FOR ALL USING (parent_id = auth.uid());

-- ─── Child Settings ───────────────────────────────────────────────────────────
CREATE POLICY "child_settings_parent_all" ON child_settings
  FOR ALL USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

-- ─── Quiz ─────────────────────────────────────────────────────────────────────
CREATE POLICY "quiz_sessions_parent_all" ON quiz_sessions
  FOR ALL USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "quiz_attempts_parent_all" ON quiz_attempts
  FOR ALL USING (
    session_id IN (
      SELECT id FROM quiz_sessions WHERE child_id IN (
        SELECT id FROM child_profiles WHERE parent_id = auth.uid()
      )
    )
  );

-- ─── Scenarios ────────────────────────────────────────────────────────────────
CREATE POLICY "scenario_attempts_parent_all" ON scenario_attempts
  FOR ALL USING (
    child_id IN (
      SELECT id FROM child_profiles WHERE parent_id = auth.uid()
    )
  );
