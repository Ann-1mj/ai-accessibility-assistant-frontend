// Request payload for /simplify
export interface SimplifyRequest {
  text: string;
  profile: UserProfile;
  user_id: string;
}

// Allowed reading profiles
export type UserProfile = 'default' | 'focus' | 'easy_read' | 'academic';

// Response from /simplify endpoint
export interface SimplifyResponse {
  cognitive_score: number;
  difficulty: string;
  reading_time: number;
  reduction_percent: number;
  impact_summary: string;
  simplified_text: string;
  chunked_version: string;
  isolation_mode: boolean;
  audio_file: string | null;
}

// Response from /progress/{user_id}
export interface ProgressResponse {
  total_sessions: number;
  average_cognitive_score: number;
  last_session_score: number;
  preferred_level: string;
}

