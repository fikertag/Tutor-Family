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
  bio?: string;
  coverLetter?: string;
  languages?: string;
}

// Qualification type
export interface Qualification {
  id: string;
  certificate_name?: string;
  issuing_organization?: string;
  issue_date?: string;
  expiry_date?: string;
  certificate_cloudinary_id?: string; // Cloudinary ID for the uploaded certificate
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
  is_verified: boolean;
  transcript_doc_cloudinary_id: string;
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
  profilePicture?: string;
  profile_picture_url?: string;
  email?: string;
}

export interface BasicProfileUpdateInput {
  first_name?: string;
  last_name?: string;
  gender?: string;
  phone?: string;
  profilePicture?: File; // 👈 here it's a File, not a string
}
