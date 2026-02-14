export interface User {
  id: string;
  name: string;
  email: string;
  no_wa?: string;
  role: 'user' | 'asatidz' | 'admin';
  keilmuan?: string;
  bank?: string;
  no_rekening?: string;
  kode_asatidz?: string;
  created_at: string;
}

export interface QuranAISession {
  id: string;
  user_id: string;
  surah: number;
  start_ayat: number;
  end_ayat: number;
  mode: 'tahsin' | 'muroja\'ah';
  status: 'active' | 'paused' | 'completed';
  created_at: string;
}

export interface QuranAIError {
  id: string;
  session_id: string;
  ayat: number;
  wrong_word: string;
  correction: string;
  timestamp: string;
}

export interface LiveRoom {
  id: string;
  asatidz_id: string;
  tema: string;
  status: 'scheduled' | 'live' | 'ended';
  participant_count: number;
  created_at: string;
}

export interface PrivateClass {
  id: string;
  asatidz_id: string;
  student_id: string;
  room_code: string;
  kitab?: string;
  ayat_plan?: string;
  status: 'scheduled' | 'active' | 'completed';
  created_at: string;
}

export interface QuranAyat {
  number: number;
  text: string;
  translation_id: string;
  juz: number;
  surah: {
    number: number;
    name: string;
    english_name: string;
  };
}

export interface DoaHarian {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  category: 'pagi' | 'sore' | 'makan' | 'tidur' | 'perjalanan';
  audio_url?: string;
}

export interface BahtsulMasail {
  id: string;
  user_id: string;
  asatidz_id?: string;
  question: string;
  answer?: string;
  category: 'fiqh' | 'aqidah' | 'akhlaq' | 'muamalat';
  status: 'pending' | 'answered' | 'closed';
  created_at: string;
  answered_at?: string;
}

export interface Muamalat {
  id: string;
  title: string;
  content: string;
  category: 'jual_beli' | 'riba' | 'zakat' | 'wakaf' | 'investasi';
  author_id: string;
  created_at: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'quran' | 'hadits' | 'ulama' | 'motivasi';
  created_at: string;
}

export interface Donation {
  id: string;
  user_id: string;
  amount: number;
  purpose: 'operasional' | 'beasiswa' | 'masjid' | 'yatim';
  status: 'pending' | 'success' | 'failed';
  payment_method: string;
  created_at: string;
}

export interface KilasBalik {
  id: string;
  user_id: string;
  date: string;
  quran_read: number;
  doa_count: number;
  live_attended: number;
  ai_sessions: number;
  streak_days: number;
}

export interface Keilmuan {
  id: string;
  title: string;
  description: string;
  category: 'tafsir' | 'hadits' | 'fiqh' | 'aqidah' | 'akhlaq' | 'sirah';
  content: string;
  author_id: string;
  difficulty: 'pemula' | 'menengah' | 'lanjut';
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  total_asatidz: number;
  active_sessions: number;
  total_donations: number;
  pending_questions: number;
  live_rooms_today: number;
}