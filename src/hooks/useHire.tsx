import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { Hire, Review } from "@/types/api";

// 1. Pick a job (POST /hired-tutor/:advertisement_id/pick)
export const usePickTutor = () => {
  const qc = useQueryClient();
  return useMutation<Hire, unknown, string>({
    mutationFn: (id) =>
      apiClient<Hire>(`/hired-tutor/${id}/pick`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("tutor picked");
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to pick tutor"),
  });
};

// 2. Post a review for a hired tutor
export const usePostReview = (tutorId: string) => {
  const qc = useQueryClient();
  return useMutation<Review, unknown, { rating: number; comment: string }>({
    mutationFn: (payload) =>
      apiClient<Review>(`/hired-tutor/${tutorId}/review`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Review submitted");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Failed to submit review"),
  });
};

// 3. Get picked tutors (admin)
export const usePickedTutors = () =>
  useQuery<Hire[]>({
    queryKey: ["pickedTutors"],
    queryFn: () => apiClient<Hire[]>(`/hired-tutor/admin/picked`),
  });

// 4. Hire a tutor (no body)
export const useHireTutor = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { userId: string; tutorId: string }>({
    mutationFn: ({ userId, tutorId }: { userId: string; tutorId: string }) =>
      apiClient<void>(`/hired-tutor/${userId}/${tutorId}/hire`, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Tutor hired");
      qc.invalidateQueries({ queryKey: ["hired"] });
    },
    onError: () => toast.error("Failed to hire tutor"),
  });
};

// 5. Reject a hire
export const useRejectHire = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    unknown,
    { userId: string; tutorId: string; reject_reason: string }
  >({
    mutationFn: ({
      userId,
      tutorId,
      reject_reason,
    }: {
      userId: string;
      tutorId: string;
      reject_reason: string;
    }) =>
      apiClient<void>(`/hired-tutor/${userId}/${tutorId}/reject`, {
        method: "POST",
        body: JSON.stringify({ reject_reason }),
      }),
    onSuccess: () => {
      toast.success("Hire rejected");
      qc.invalidateQueries({ queryKey: ["hired"] });
    },
    onError: () => toast.error("Failed to reject hire"),
  });
};

// 6. Admin: get all hired
export const useAdminHiredList = () =>
  useQuery<
    Array<{
      id: string;
      family_user_id: string;
      tutor_user_id: string;
      hired_at: string;
      hired_status: string;
    }>
  >({
    queryKey: ["adminHired"],
    queryFn: () => apiClient(`/hired-tutor/admin/hired`),
  });

export const useMyPickedTutors = () =>
  useQuery<Hire[]>({
    queryKey: ["myPickedTutors"],
    queryFn: () => apiClient<Hire[]>(`/hired-tutor/my/picked`),
  });
