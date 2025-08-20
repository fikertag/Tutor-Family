import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import {
  TutorProfile,
  Qualification,
  Experience,
  Transcript,
  Education,
  Availability,
  TutorSubject,
  BasicProfile,
  BasicProfileUpdateInput,
  Subject,
} from "@/types/api";
import { toast } from "sonner";

// ================== PROFILE ==================

// 1. Get full tutor profile by ID
// export const useFullTutorProfile = (id?: string) =>
//   useQuery<TutorProfile>({
//     queryKey: ["fullProfile", id],
//     queryFn: () => apiClient<TutorProfile>(`/tutor/${id}`),
//     enabled: !!id,
//   });

// 2. Get tutor profile data
export const useTutorProfile = () =>
  useQuery<TutorProfile>({
    queryKey: ["tutorProfile"],
    queryFn: () => apiClient<TutorProfile>(`/tutor/profile`),
  });

export const useTutorBasicProfile = () =>
  useQuery<BasicProfile>({
    queryKey: ["basicProfile"],
    queryFn: () => apiClient<BasicProfile>(`/user/me`),
  });

// // 3. Create tutor profile
// export const useCreateProfile = () => {
//   const queryClient = useQueryClient();
//   return useMutation<TutorProfile, unknown, Omit<TutorProfile, "id">>({
//     mutationFn: (data) =>
//       apiClient<TutorProfile>(`/tutor/profile`, {
//         method: "POST",
//         body: JSON.stringify(data),
//       }),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
//   });
// };

// 4. Update tutor profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<TutorProfile, unknown, Partial<Omit<TutorProfile, "id">>>({
    mutationFn: (data: any) => {
      // If a file (coverLetter) is included, send as FormData
      if (data && data.coverLetter instanceof File) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(data)) {
          if (v === undefined || v === null) continue;
          if (v instanceof File) fd.append(k, v);
          else fd.append(k, String(v));
        }

        return apiClient<TutorProfile>(`/tutor/profile`, {
          method: "PATCH",
          body: fd,
          headers: {},
        });
      }

      return apiClient<TutorProfile>(`/tutor/profile`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorProfile"] });
      // queryClient.invalidateQueries({ queryKey: ["fullProfile"] });
      toast.success("Tutor profile updated successfully");
    },
    onError: () => toast.error("Failed to update tutor profile"),
  });
};
// 4. Update tutor profile
export const useUpdateBasicProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<BasicProfile, unknown, BasicProfileUpdateInput>({
    mutationFn: (data) => {
      if (data.profilePicture) {
        const formData = new FormData();
        if (data.first_name) formData.append("first_name", data.first_name);
        if (data.last_name) formData.append("last_name", data.last_name);
        if (data.gender) formData.append("gender", data.gender);
        if (data.phone) formData.append("phone", data.phone);
        formData.append("profilePicture", data.profilePicture);

        return apiClient<BasicProfile>(`/user/me`, {
          method: "PATCH",
          body: formData,
        });
      }

      return apiClient<BasicProfile>(`/user/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basicProfile"] });
      // queryClient.invalidateQueries({ queryKey: ["basicProfile"] });
      toast.success("Basic profile updated successfully");
    },
    onError: () => toast.error("Failed to update basic profile"),
  });
};

// 5. Delete tutor file
export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, void>({
    mutationFn: () =>
      apiClient<void>(`/tutor/profile/file`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tutorProfile"] }),
  });
};

// ================== QUALIFICATIONS ==================

// 6. Get all qualifications
export const useTutorQualifications = () =>
  useQuery<Qualification[]>({
    queryKey: ["qualifications"],
    queryFn: () => apiClient<Qualification[]>(`/tutor/qualifications`),
  });

// 7. Get qualifications by tutor ID
export const useTutorQualificationsById = (tutorId?: string) =>
  useQuery<Qualification[]>({
    queryKey: ["qualifications", tutorId],
    queryFn: () =>
      apiClient<Qualification[]>(`/tutor/${tutorId}/qualifications`),
    enabled: !!tutorId,
  });

// 8. Create a qualification
export const useCreateQualification = () => {
  const queryClient = useQueryClient();
  return useMutation<Qualification, unknown, any>({
    mutationFn: (data) => {
      // If certificate_picture is a File, send FormData
      if (data && data.certificate instanceof File) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(data)) {
          if (v === undefined || v === null) continue;
          if (v instanceof File) fd.append(k, v);
          else fd.append(k, String(v));
        }

        return apiClient<Qualification>(`/tutor/qualifications`, {
          method: "POST",
          body: fd,
          headers: {},
        });
      }

      return apiClient<Qualification>(`/tutor/qualifications`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });
      toast.success("Qualification created");
    },
    onError: () => toast.error("Failed to create qualification"),
  });
};

// 9. Update a qualification
export const useUpdateQualification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Qualification,
    unknown,
    { id: string; data: Partial<Qualification> }
  >({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      if (data && data.certificate instanceof File) {
        const fd = new FormData();
        for (const [k, v] of Object.entries(data)) {
          if (v === undefined || v === null) continue;
          if (v instanceof File) fd.append(k, v);
          else fd.append(k, String(v));
        }

        return apiClient<Qualification>(`/tutor/qualifications/${id}`, {
          method: "PATCH",
          body: fd,
          headers: {},
        });
      }

      return apiClient<Qualification>(`/tutor/qualifications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["qualifications"] });
      queryClient.invalidateQueries({ queryKey: ["qualifications", id] });
      toast.success("Qualification updated");
    },
    onError: () => toast.error("Failed to update qualification"),
  });
};

// 10. Delete a qualification
export const useDeleteQualification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/tutor/qualifications/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["qualifications"] }),
  });
};

// ================== TRANSCRIPTS ==================

// 11. Get all transcripts
export const useTutorTranscripts = () =>
  useQuery<Transcript[]>({
    queryKey: ["transcripts"],
    queryFn: () => apiClient<Transcript[]>(`/tutor/transcript`),
  });

// 12. Create a transcript (POST)
export const useCreateTranscript = () => {
  const queryClient = useQueryClient();
  return useMutation<Transcript, unknown, FormData>({
    mutationFn: (formData) =>
      apiClient<Transcript>(`/tutor/transcript`, {
        method: "POST",
        body: formData,
        headers: {}, // FormData will set the correct Content-Type
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transcripts"] }),
  });
};

// 13. Update a transcript (PATCH)
export const useUpdateTranscript = () => {
  const queryClient = useQueryClient();
  return useMutation<Transcript, unknown, { id: string; formData: FormData }>({
    mutationFn: ({ id, formData }) =>
      apiClient<Transcript>(`/tutor/transcript/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {},
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["transcripts"] });
      queryClient.invalidateQueries({ queryKey: ["transcripts", id] });
    },
  });
};

// 14. Delete a transcript (DELETE)
export const useDeleteTranscript = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/tutor/transcript/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transcripts"] }),
  });
};

// ================== EXPERIENCES ==================

// 15. Get all experiences
export const useTutorExperiences = () =>
  useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: () => apiClient<Experience[]>(`/tutor/experiences`),
  });

// 16. Get experiences by tutor ID
export const useTutorExperiencesById = (tutorId?: string) =>
  useQuery<Experience[]>({
    queryKey: ["experiences", tutorId],
    queryFn: () => apiClient<Experience[]>(`/tutor/${tutorId}/experiences`),
    enabled: !!tutorId,
  });

// 17. Create an experience (POST)
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<Experience, unknown, Omit<Experience, "id">>({
    mutationFn: (data) =>
      apiClient<Experience>(`/tutor/experiences`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      toast.success("Experience created");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: () => toast.error("Failed to create experience"),
  });
};

// 18. Update an experience (PATCH)
export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Experience,
    unknown,
    { id: string; data: Partial<Experience> }
  >({
    mutationFn: ({ id, data }) =>
      apiClient<Experience>(`/tutor/experiences/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      toast.success("Experience updated");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      queryClient.invalidateQueries({ queryKey: ["experiences", id] });
    },
    onError: () => toast.error("Failed to update experience"),
  });
};

// 19. Delete an experience (DELETE)
export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/tutor/experiences/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

// ================== EDUCATIONS ==================

// 20. Get all educations
export const useTutorEducations = () =>
  useQuery<Education[]>({
    queryKey: ["educations"],
    queryFn: () => apiClient<Education[]>(`/tutor/educations`),
  });

// 21. Get educations by tutor ID
export const useTutorEducationsById = (tutorId?: string) =>
  useQuery<Education[]>({
    queryKey: ["educations", tutorId],
    queryFn: () => apiClient<Education[]>(`/tutor/${tutorId}/educations`),
    enabled: !!tutorId,
  });

// 22. Create an education (POST)
export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation<Education, unknown, Omit<Education, "id">>({
    mutationFn: (data) =>
      apiClient<Education>(`/tutor/educations`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["educations"] }),
  });
};

// 23. Update an education (PATCH)
export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Education,
    unknown,
    { id: string; data: Partial<Education> }
  >({
    mutationFn: ({ id, data }) =>
      apiClient<Education>(`/tutor/educations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      queryClient.invalidateQueries({ queryKey: ["educations", id] });
    },
  });
};

// 24. Delete an education (DELETE)
export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/tutor/educations/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["educations"] }),
  });
};

// ================== AVAILABILITIES ==================

// 25. Get all availabilities
export const useTutorAvailabilities = () =>
  useQuery<Availability[]>({
    queryKey: ["availabilities"],
    queryFn: () => apiClient<Availability[]>(`/tutor/availabilities`),
  });

// 26. Get availabilities by tutor ID
export const useTutorAvailabilitiesById = (tutorId?: string) =>
  useQuery<Availability[]>({
    queryKey: ["availabilities", tutorId],
    queryFn: () =>
      apiClient<Availability[]>(`/tutor/${tutorId}/availabilities`),
    enabled: !!tutorId,
  });

// 27. Create availability (POST)
export const useCreateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation<Availability, unknown, Omit<Availability, "id">>({
    mutationFn: (data) =>
      apiClient<Availability>(`/tutor/availabilities`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["availabilities"] }),
  });
};

// 28. Update availability (PATCH)
export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Availability,
    unknown,
    { id: string; data: Partial<Availability> }
  >({
    mutationFn: ({ id, data }) =>
      apiClient<Availability>(`/tutor/availabilities/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["availabilities"] });
      queryClient.invalidateQueries({ queryKey: ["availabilities", id] });
    },
  });
};

// 29. Delete availability (DELETE)
export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/tutor/availabilities/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["availabilities"] }),
  });
};

// ================== TUTOR SUBJECTS ==================

// 30. Get tutor subjects by tutor ID
export const useTutorSubjects = () => {
  return useQuery<TutorSubject[]>({
    queryKey: ["tutor-subjects"],
    queryFn: () => apiClient<TutorSubject[]>(`/tutors/subjects`),
  });
};

// 31. Add a tutor subject
export const useAddTutorSubject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TutorSubject,
    unknown,
    { subjectId: string; grades: string[] }
  >({
    mutationFn: (data) =>
      apiClient<TutorSubject>(`/tutors/subjects`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tutor-subjects"] }),
  });
};

// 32. Update a tutor subject
export const useUpdateTutorSubject = (tutorId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    TutorSubject,
    unknown,
    { tutorSubjectId: string; data: { subjectId: string; grades: string[] } }
  >({
    mutationFn: ({ tutorSubjectId, data }) =>
      apiClient<TutorSubject>(`/tutor-subjects/${tutorSubjectId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tutor-subjects", tutorId] }),
  });
};

// 33. Delete a tutor subject
export const useDeleteTutorSubject = (tutorId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (tutorSubjectId) =>
      apiClient<void>(`/tutor-subjects/${tutorSubjectId}`, {
        method: "DELETE",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["tutor-subjects", tutorId] }),
  });
};

// 30. Get all subjects by tutor ID
export const useAllSubjects = () => {
  return useQuery<Subject[]>({
    queryKey: ["AllSubjects"],
    queryFn: () => apiClient<Subject[]>(`/subject`),
  });
};
