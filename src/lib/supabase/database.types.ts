export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      child_profiles: {
        Row: {
          id: string
          parent_id: string
          name: string
          avatar: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          avatar?: string
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          name?: string
          avatar?: string
          color?: string
          created_at?: string
        }
        Relationships: []
      }
      child_progress: {
        Row: {
          child_id: string
          total_xp: number
          current_level: number
          coins: number
          gems: number
          words_seen: number
          words_learned: number
          scenarios_completed: number
          quiz_sessions_done: number
          streak_days: number
          last_active_at: string | null
        }
        Insert: {
          child_id: string
          total_xp?: number
          current_level?: number
          coins?: number
          gems?: number
          words_seen?: number
          words_learned?: number
          scenarios_completed?: number
          quiz_sessions_done?: number
          streak_days?: number
          last_active_at?: string | null
        }
        Update: {
          child_id?: string
          total_xp?: number
          current_level?: number
          coins?: number
          gems?: number
          words_seen?: number
          words_learned?: number
          scenarios_completed?: number
          quiz_sessions_done?: number
          streak_days?: number
          last_active_at?: string | null
        }
        Relationships: []
      }
      child_settings: {
        Row: {
          child_id: string
          max_level_visible: number
          preferred_lang: string
          sound_enabled: boolean
        }
        Insert: {
          child_id: string
          max_level_visible?: number
          preferred_lang?: string
          sound_enabled?: boolean
        }
        Update: {
          child_id?: string
          max_level_visible?: number
          preferred_lang?: string
          sound_enabled?: boolean
        }
        Relationships: []
      }
      parent_settings: {
        Row: {
          parent_id: string
          max_level_visible: number
          show_level_4_5_to_child: boolean
          daily_time_limit_min: number
          weekly_report_enabled: boolean
          push_notifications: boolean
          pin_hash: string | null
        }
        Insert: {
          parent_id: string
          max_level_visible?: number
          show_level_4_5_to_child?: boolean
          daily_time_limit_min?: number
          weekly_report_enabled?: boolean
          push_notifications?: boolean
          pin_hash?: string | null
        }
        Update: {
          parent_id?: string
          max_level_visible?: number
          show_level_4_5_to_child?: boolean
          daily_time_limit_min?: number
          weekly_report_enabled?: boolean
          push_notifications?: boolean
          pin_hash?: string | null
        }
        Relationships: []
      }
      words: {
        Row: {
          id: string
          word: string
          lang: string
          level: number
          stars: number
          meaning: string
          used_in: string[]
          face_base: string
          face_shadow: string
          face_highlight: string
          face_expression: string
        }
        Insert: {
          id?: string
          word: string
          lang: string
          level: number
          stars?: number
          meaning: string
          used_in?: string[]
          face_base?: string
          face_shadow?: string
          face_highlight?: string
          face_expression?: string
        }
        Update: {
          id?: string
          word?: string
          lang?: string
          level?: number
          stars?: number
          meaning?: string
          used_in?: string[]
          face_base?: string
          face_shadow?: string
          face_highlight?: string
          face_expression?: string
        }
        Relationships: []
      }
      word_details: {
        Row: {
          word_id: string
          example_th: string
          example_en: string
          severity_text: string
          can_use_with: string[]
          never_use_with: string[]
          alternatives: string[]
          impact: string
          has_danger_flag: boolean
        }
        Insert: {
          word_id: string
          example_th: string
          example_en: string
          severity_text: string
          can_use_with?: string[]
          never_use_with?: string[]
          alternatives?: string[]
          impact: string
          has_danger_flag?: boolean
        }
        Update: {
          word_id?: string
          example_th?: string
          example_en?: string
          severity_text?: string
          can_use_with?: string[]
          never_use_with?: string[]
          alternatives?: string[]
          impact?: string
          has_danger_flag?: boolean
        }
        Relationships: []
      }
      word_progress: {
        Row: {
          child_id: string
          word_id: string
          seen_at: string | null
          learned_at: string | null
          quiz_correct: number
          quiz_total: number
        }
        Insert: {
          child_id: string
          word_id: string
          seen_at?: string | null
          learned_at?: string | null
          quiz_correct?: number
          quiz_total?: number
        }
        Update: {
          child_id?: string
          word_id?: string
          seen_at?: string | null
          learned_at?: string | null
          quiz_correct?: number
          quiz_total?: number
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          child_id: string
          word_id: string
          created_at: string
        }
        Insert: {
          child_id: string
          word_id: string
          created_at?: string
        }
        Update: {
          child_id?: string
          word_id?: string
          created_at?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          id: string
          title_th: string
          title_en: string
          description_th: string
          description_en: string
          image_situation: string
          category: string
          difficulty_level: number
          order_index: number
          is_active: boolean
        }
        Insert: {
          id?: string
          title_th: string
          title_en: string
          description_th: string
          description_en: string
          image_situation?: string
          category?: string
          difficulty_level?: number
          order_index?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          title_th?: string
          title_en?: string
          description_th?: string
          description_en?: string
          image_situation?: string
          category?: string
          difficulty_level?: number
          order_index?: number
          is_active?: boolean
        }
        Relationships: []
      }
      scenario_choices: {
        Row: {
          id: string
          scenario_id: string
          choice_text: string
          choice_text_en: string
          is_good_choice: boolean
          feedback_th: string
          feedback_en: string
          xp_reward: number
          order_index: number
        }
        Insert: {
          id?: string
          scenario_id: string
          choice_text: string
          choice_text_en?: string
          is_good_choice?: boolean
          feedback_th?: string
          feedback_en?: string
          xp_reward?: number
          order_index?: number
        }
        Update: {
          id?: string
          scenario_id?: string
          choice_text?: string
          choice_text_en?: string
          is_good_choice?: boolean
          feedback_th?: string
          feedback_en?: string
          xp_reward?: number
          order_index?: number
        }
        Relationships: []
      }
      scenario_attempts: {
        Row: {
          child_id: string
          scenario_id: string
          choice_id: string
          outcome_type: string
          xp_earned: number
          stars_earned: number
          completed_at: string
        }
        Insert: {
          child_id: string
          scenario_id: string
          choice_id: string
          outcome_type: string
          xp_earned?: number
          stars_earned?: number
          completed_at?: string
        }
        Update: {
          child_id?: string
          scenario_id?: string
          choice_id?: string
          outcome_type?: string
          xp_earned?: number
          stars_earned?: number
          completed_at?: string
        }
        Relationships: []
      }
      scenario_words: {
        Row: {
          scenario_id: string
          word_id: string
        }
        Insert: {
          scenario_id: string
          word_id: string
        }
        Update: {
          scenario_id?: string
          word_id?: string
        }
        Relationships: []
      }
      quiz_sessions: {
        Row: {
          id: string
          child_id: string
          started_at: string
          completed_at: string | null
          score: number
          total_questions: number
        }
        Insert: {
          id?: string
          child_id: string
          started_at?: string
          completed_at?: string | null
          score?: number
          total_questions?: number
        }
        Update: {
          id?: string
          child_id?: string
          started_at?: string
          completed_at?: string | null
          score?: number
          total_questions?: number
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          id: string
          word_id: string
          question_text: string
          question_type: string
        }
        Insert: {
          id?: string
          word_id: string
          question_text: string
          question_type: string
        }
        Update: {
          id?: string
          word_id?: string
          question_text?: string
          question_type?: string
        }
        Relationships: []
      }
      quiz_options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          is_correct: boolean
          chest_color: string
        }
        Insert: {
          id?: string
          question_id: string
          option_text: string
          is_correct: boolean
          chest_color: string
        }
        Update: {
          id?: string
          question_id?: string
          option_text?: string
          is_correct?: boolean
          chest_color?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          session_id: string
          question_id: string
          selected_option_id: string
          is_correct: boolean
          time_ms: number
        }
        Insert: {
          session_id: string
          question_id: string
          selected_option_id: string
          is_correct: boolean
          time_ms?: number
        }
        Update: {
          session_id?: string
          question_id?: string
          selected_option_id?: string
          is_correct?: boolean
          time_ms?: number
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      add_child_xp: {
        Args: { p_child_id: string; p_amount: number }
        Returns: void
      }
      increment_words_seen: {
        Args: { p_child_id: string }
        Returns: void
      }
      increment_words_learned: {
        Args: { p_child_id: string }
        Returns: void
      }
      record_quiz_attempt: {
        Args: { p_child_id: string; p_word_id: string; p_is_correct: boolean }
        Returns: void
      }
      increment_quiz_sessions: {
        Args: { p_child_id: string; p_xp: number }
        Returns: void
      }
      increment_scenarios_completed: {
        Args: { p_child_id: string; p_xp: number }
        Returns: void
      }
      set_parent_pin: {
        Args: { p_hash: string }
        Returns: void
      }
      verify_parent_pin: {
        Args: { p_hash: string }
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
