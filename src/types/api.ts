// ========== Verification GET response types ==========

// /api/v1/verify/verification-docs GET
export interface PendingVerificationDoc {
  id: string;
  national_id: string;
  user_id: string;
  tutor_id: string;
  id_photo_cloudinary_id: string;
  verification_status: string; // "PENDING"
  country_name: string;
  createdAt: string;
  updatedAt: string;
}

// /api/v1/verify/transcripts GET
export interface UnverifiedTranscript {
  id: string;
  tutor_id: string;
  transcript_doc_cloudinary_id: string;
  is_verified: string; // "PENDING"
}

// /api/v1/verify/advertisements GET
export interface UnverifiedAdvertisement {
  id: string;
  user_id: string;
  job_title: string;
  job_description: string;
  job_weeks: number;
  location: string;
  status: string;
  is_verified: string; // "PENDING"
  created_at: string;
}

// /api/v1/verify/qualifications GET
export interface UnverifiedQualification {
  id: string;
  tutorId: string;
  certificate_name: string;
  issuing_organization: string;
  date_issued: string;
  certificate_cloudinary_id: string;
  is_verified: string; // "PENDING"
  createdAt: string;
}

// /api/v1/verify/educations GET
export interface UnverifiedEducation {
  id: string;
  tutorId: string;
  institution_name: string;
  degree_title: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  is_verified: boolean;
  createdAt: string;
}
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

export interface Notification {
  notification_id: string;
  user_id: string;
  notification_title: string;
  notification_type: string;
  advertisement_id: string | null;
  notification_description: string;
  createdAt: string;
  isRead: boolean;
}

export interface Advertisement {
  id: string;
  job_title: string;
  status: string;
  created_at: string;
}

export interface Application {
  application_id: string;
  advertisement_id: string;
  tutor_id: string;
  submitted_at: string;
  status: string;
  advertisement: Advertisement;
}

export interface Review {
  review_id: string;
  hired_tutor_id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user_id: string;
  tutor_id: string;
}

export interface TutorVerification {
  id: string;
  user_id: string;
  tutor_id: string;
  national_id: string;
  id_photo_cloudinary_id: string;
  verification_status: "PENDING" | "APPROVED" | "REJECTED";
  country_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimpleAdminList {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture_url: string;
}
