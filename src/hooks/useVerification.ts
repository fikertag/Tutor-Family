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
  return useMutation<void, unknown, { userId: string; status: string }>({
    mutationFn: ({ userId, status }) =>
      apiClient<void>(`/verify/verification-docs/${userId}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
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
  return useMutation<void, unknown, { transcriptId: string; status: string }>({
    mutationFn: ({ transcriptId, status }) =>
      apiClient<void>(`/verify/transcripts/${transcriptId}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
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
  return useMutation<void, unknown, { adId: string; status: string }>({
    mutationFn: ({ adId, status }) =>
      apiClient<void>(`/verify/advertisements/${adId}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
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
  return useMutation<
    void,
    unknown,
    { qualificationId: string; status: string }
  >({
    mutationFn: ({ qualificationId, status }) =>
      apiClient<void>(`/verify/qualifications/${qualificationId}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
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
  return useMutation<
    void,
    unknown,
    { educationId: string; is_verified: boolean }
  >({
    mutationFn: ({ educationId, is_verified }) =>
      apiClient<void>(`/verify/educations/${educationId}/status`, {
        method: "POST",
        body: JSON.stringify({ is_verified }),
      }),
    onSuccess: () => {
      toast.success("Education verification updated");
      qc.invalidateQueries({ queryKey: ["verification", "educations"] });
    },
    onError: () => toast.error("Failed to update education verification"),
  });
};
