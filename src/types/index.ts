export type Qualification = {
  id: string;
  tutorId: string;
  certificate_name: string;
  issuing_organization: string;
  date_issued: string;
  verified_by_userId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Education = {
  id: string;
  tutorId: string;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Experience = {
  id: string;
  tutorId: string;
  title: string;
  company: string;
  description: string | null;
  start_date: string;
  end_date: string;
  is_current: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Availability = {
  id: string;
  user_id: string;
  tutor_id: string;
  weekday: string;
  time: string;
  createdAt: string;
  updatedAt: string;
};

export type VerificationDocument = {
  id: string;
  national_id: string;
  user_id: string;
  tutor_id: string;
  id_photo_cloudinary_id: string;
  id_photo_local_path: string;
  verification_status: string | null;
  country_name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  phone: string;
  profile_picture_url: string | null;
  profile_picture_cloudinary_id: string | null;
  profile_picture_local_path: string;
  gender: string;
  last_login_at: string | null;
  password: string | null;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  first_name: string;
  last_name: string;
};

export type Tutor = {
  id: string;
  userId: string;
  years_of_experience: number;
  hourly_rate: number;
  location: string;
  avg_review: number;
  review_num: number;
  languages: string[];
  cover_letter_cloudinary_id: string;
  cover_letter_local_path: string;
  snapshot_bio: string;
  verified_by_userId: string | null;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  user: User;
  qualifications: Qualification[];
  educations: Education[];
  experiences: Experience[];
  availabilities: Availability[];
  verificationDocument: VerificationDocument;
};

export type Tutor_Info = {
  id: string;
  name: string;
  profile_picture_url: string | null;
  avg_review: number;
  review_num: number;
  snapshot_bio: string;
  location: string;
  languages: string[];
};
