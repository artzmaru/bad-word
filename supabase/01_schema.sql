-- คำเรียนรู้ — Schema v1
-- Run in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Child Profiles ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS child_profiles (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  avatar     TEXT NOT NULL DEFAULT 'avatar_1',
  color      TEXT NOT NULL DEFAULT '#38bdf8',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Words ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS words (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word            TEXT NOT NULL,
  lang            TEXT NOT NULL CHECK (lang IN ('th', 'en')),
  level           INT  NOT NULL CHECK (level BETWEEN 1 AND 5),
  stars           INT  NOT NULL DEFAULT 1 CHECK (stars BETWEEN 1 AND 5),
  meaning         TEXT NOT NULL,
  used_in         TEXT[] NOT NULL DEFAULT '{}',
  face_base       TEXT NOT NULL DEFAULT '#4ade80',
  face_shadow     TEXT NOT NULL DEFAULT '#16a34a',
  face_highlight  TEXT NOT NULL DEFAULT '#86efac',
  face_expression TEXT NOT NULL DEFAULT 'neutral' CHECK (
    face_expression IN ('angry', 'sad', 'neutral', 'happy', 'excited')
  ),
  UNIQUE (word, lang)
);

-- ─── Word Details ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS word_details (
  word_id           UUID PRIMARY KEY REFERENCES words(id) ON DELETE CASCADE,
  example_th        TEXT NOT NULL,
  example_en        TEXT NOT NULL,
  severity_text     TEXT NOT NULL,
  can_use_with      TEXT[] NOT NULL DEFAULT '{}',
  never_use_with    TEXT[] NOT NULL DEFAULT '{}',
  alternatives      TEXT[] NOT NULL DEFAULT '{}',
  impact            TEXT NOT NULL
);

-- ─── Child Progress ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS child_progress (
  child_id             UUID PRIMARY KEY REFERENCES child_profiles(id) ON DELETE CASCADE,
  total_xp             INT NOT NULL DEFAULT 0,
  current_level        INT NOT NULL DEFAULT 1,
  coins                INT NOT NULL DEFAULT 0,
  gems                 INT NOT NULL DEFAULT 0,
  words_seen           INT NOT NULL DEFAULT 0,
  words_learned        INT NOT NULL DEFAULT 0,
  scenarios_completed  INT NOT NULL DEFAULT 0,
  quiz_sessions_done   INT NOT NULL DEFAULT 0,
  streak_days          INT NOT NULL DEFAULT 0,
  last_active_at       TIMESTAMPTZ
);

-- ─── Word Progress ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS word_progress (
  child_id    UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  word_id     UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  seen_at     TIMESTAMPTZ,
  learned_at  TIMESTAMPTZ,
  quiz_correct INT NOT NULL DEFAULT 0,
  quiz_total   INT NOT NULL DEFAULT 0,
  PRIMARY KEY (child_id, word_id)
);

-- ─── Bookmarks ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookmarks (
  child_id   UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  word_id    UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (child_id, word_id)
);

-- ─── Parent Settings ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS parent_settings (
  parent_id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  max_level_visible      INT NOT NULL DEFAULT 5,
  show_level_4_5_to_child BOOLEAN NOT NULL DEFAULT false,
  daily_time_limit_min   INT NOT NULL DEFAULT 30,
  weekly_report_enabled  BOOLEAN NOT NULL DEFAULT true,
  push_notifications     BOOLEAN NOT NULL DEFAULT false,
  pin_hash               TEXT
);

-- ─── Child Settings ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS child_settings (
  child_id          UUID PRIMARY KEY REFERENCES child_profiles(id) ON DELETE CASCADE,
  max_level_visible INT NOT NULL DEFAULT 3,
  preferred_lang    TEXT NOT NULL DEFAULT 'both' CHECK (preferred_lang IN ('th', 'en', 'both')),
  sound_enabled     BOOLEAN NOT NULL DEFAULT true
);

-- ─── Quiz ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id        UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ,
  score           INT NOT NULL DEFAULT 0,
  total_questions INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word_id       UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (
    question_type IN ('impact', 'alternative', 'response', 'severity')
  )
);

CREATE TABLE IF NOT EXISTS quiz_options (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct  BOOLEAN NOT NULL,
  chest_color TEXT NOT NULL CHECK (chest_color IN ('brown', 'purple', 'red'))
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  session_id         UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id        UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id UUID NOT NULL REFERENCES quiz_options(id),
  is_correct         BOOLEAN NOT NULL,
  time_ms            INT NOT NULL DEFAULT 0,
  PRIMARY KEY (session_id, question_id)
);

-- ─── Scenarios ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scenarios (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  situation_text TEXT NOT NULL,
  target_word    TEXT NOT NULL,
  setting        TEXT NOT NULL CHECK (setting IN ('gaming', 'school', 'online', 'home')),
  character_id   TEXT NOT NULL CHECK (character_id IN ('fifok', 'noon', 'nong_guy')),
  background_id  TEXT NOT NULL,
  order_index    INT NOT NULL DEFAULT 0,
  xp_base        INT NOT NULL DEFAULT 30,
  is_active      BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS scenario_choices (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id         UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  choice_text         TEXT NOT NULL,
  choice_emoji        TEXT NOT NULL DEFAULT '💬',
  outcome_type        TEXT NOT NULL CHECK (outcome_type IN ('great', 'good', 'bad', 'terrible')),
  outcome_text        TEXT NOT NULL,
  xp_reward           INT NOT NULL DEFAULT 0,
  star_reward         INT NOT NULL DEFAULT 0,
  character_expr_after TEXT NOT NULL DEFAULT 'neutral',
  order_index         INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS scenario_attempts (
  child_id     UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  scenario_id  UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  choice_id    UUID NOT NULL REFERENCES scenario_choices(id),
  outcome_type TEXT NOT NULL,
  xp_earned    INT NOT NULL DEFAULT 0,
  stars_earned INT NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (child_id, scenario_id)
);

CREATE TABLE IF NOT EXISTS scenario_words (
  scenario_id UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  word_id     UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  PRIMARY KEY (scenario_id, word_id)
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_words_level ON words(level);
CREATE INDEX IF NOT EXISTS idx_words_lang ON words(lang);
CREATE INDEX IF NOT EXISTS idx_word_progress_child ON word_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_scenario_attempts_child ON scenario_attempts(child_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_child ON quiz_sessions(child_id);
