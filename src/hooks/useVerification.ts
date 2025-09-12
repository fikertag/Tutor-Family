import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import {
  PendingVerificationDoc,
  UnverifiedTranscript,
  UnverifiedAdvertisement,
  UnverifiedQualification,
  UnverifiedEducation,
} from "@/types/api";

// Queries
export const usePendingVerificationDocs = () =>
  useQuery<PendingVerificationDoc[]>({
    queryKey: ["verification", "docs"],
    queryFn: () =>
      apiClient<PendingVerificationDoc[]>(`/verify/verification-docs`),
  });

export const useUnverifiedTranscripts = () =>
  useQuery<UnverifiedTranscript[]>({
    queryKey: ["verification", "transcripts"],
    queryFn: () => apiClient<UnverifiedTranscript[]>(`/verify/transcripts`),
  });

export const useUnverifiedAdvertisements = () =>
  useQuery<UnverifiedAdvertisement[]>({
    queryKey: ["verification", "advertisements"],
    queryFn: () =>
      apiClient<UnverifiedAdvertisement[]>(`/verify/advertisements`),
  });

export const useUnverifiedQualifications = () =>
  useQuery<UnverifiedQualification[]>({
    queryKey: ["verification", "qualifications"],
    queryFn: () =>
      apiClient<UnverifiedQualification[]>(`/verify/qualifications`),
  });

export const useUnverifiedEducations = () =>
  useQuery<UnverifiedEducation[]>({
    queryKey: ["verification", "educations"],
    queryFn: () => apiClient<UnverifiedEducation[]>(`/verify/educations`),
  });

// Mutations (update status)
export const useVerifyVerificationDoc = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { userId: string }>({
    mutationFn: ({ userId }) =>
      apiClient<void>(`/verify/verification-docs/${userId}/status`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Verification doc status updated");
      qc.invalidateQueries({ queryKey: ["verification", "docs"] });
    },
    onError: () => toast.error("Failed to update verification doc status"),
  });
};

export const useVerifyTranscript = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { transcriptId: string }>({
    mutationFn: ({ transcriptId }) =>
      apiClient<void>(`/verify/transcripts/${transcriptId}/status`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Transcript status updated");
      qc.invalidateQueries({ queryKey: ["verification", "transcripts"] });
    },
    onError: () => toast.error("Failed to update transcript status"),
  });
};

export const useVerifyAdvertisement = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { adId: string }>({
    mutationFn: ({ adId }) =>
      apiClient<void>(`/verify/advertisements/${adId}/status`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Advertisement status updated");
      qc.invalidateQueries({ queryKey: ["verification", "advertisements"] });
    },
    onError: () => toast.error("Failed to update advertisement status"),
  });
};

export const useVerifyQualification = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { qualificationId: string }>({
    mutationFn: ({ qualificationId }) =>
      apiClient<void>(`/verify/qualifications/${qualificationId}/status`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Qualification status updated");
      qc.invalidateQueries({ queryKey: ["verification", "qualifications"] });
    },
    onError: () => toast.error("Failed to update qualification status"),
  });
};

export const useVerifyEducation = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { educationId: string }>({
    mutationFn: ({ educationId }) =>
      apiClient<void>(`/verify/educations/${educationId}/status`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Education verification updated");
      qc.invalidateQueries({ queryKey: ["verification", "educations"] });
    },
    onError: () => toast.error("Failed to update education verification"),
  });
};
export const useRejectVerificationDoc = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { userId: string; reason: string }>({
    mutationFn: ({ userId, reason }) =>
      apiClient<void>(`/verify/verification-docs/${userId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      toast.success("Verification doc status updated");
      qc.invalidateQueries({ queryKey: ["verification", "docs"] });
    },
    onError: () => toast.error("Failed to update verification doc status"),
  });
};

export const useRejectTranscript = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { transcriptId: string; reason: string }>({
    mutationFn: ({ transcriptId, reason }) =>
      apiClient<void>(`/verify/transcripts/${transcriptId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      toast.success("Transcript status updated");
      qc.invalidateQueries({ queryKey: ["verification", "transcripts"] });
    },
    onError: () => toast.error("Failed to update transcript status"),
  });
};

export const useRejectAdvertisement = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { adId: string; reason: string }>({
    mutationFn: ({ adId, reason }) =>
      apiClient<void>(`/verify/advertisements/${adId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      toast.success("Advertisement status updated");
      qc.invalidateQueries({ queryKey: ["verification", "advertisements"] });
    },
    onError: () => toast.error("Failed to update advertisement status"),
  });
};

export const useRejectQualification = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    unknown,
    { qualificationId: string; reason: string }
  >({
    mutationFn: ({ qualificationId, reason }) =>
      apiClient<void>(`/verify/qualifications/${qualificationId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      toast.success("Qualification status updated");
      qc.invalidateQueries({ queryKey: ["verification", "qualifications"] });
    },
    onError: () => toast.error("Failed to update qualification status"),
  });
};

export const useRejectEducation = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { educationId: string; reason: string }>({
    mutationFn: ({ educationId, reason }) =>
      apiClient<void>(`/verify/educations/${educationId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    onSuccess: () => {
      toast.success("Education verification updated");
      qc.invalidateQueries({ queryKey: ["verification", "educations"] });
    },
    onError: () => toast.error("Failed to update education verification"),
  });
};
