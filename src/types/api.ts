// Generic API response wrapper
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Tutor profile type
export interface TutorProfile {
  tutor_id: string;
  years_of_experience?: number;
  monthly_rate?: number;
  location?: string;
  snapshot_bio?: string;
  coverLetter?: string;
}

// Qualification type
export interface Qualification {
  id: string;
  certificate_name?: string;
  issuing_organization?: string;
  issue_date?: string;
  expiry_date?: string;
  credential_id?: string;
}

// Experience type
export interface Experience {
  id: string;
  company?: string;
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
}

export interface Transcript {
  id: string;
  transcriptDoc: string; // URL or identifier for the uploaded transcript
}

export interface Education {
  id: string;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  is_verified: boolean;
}

export interface Availability {
  id: string;
  weekday: string;
  time: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface TutorSubject {
  tutor_subject_id: string;
  subject_id: string;
  grade: string[];
  subject: Subject;
}

export interface BasicProfile {
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  phone?: string;
  profile_picture?: string;
}
