import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { Review } from "@/types/api";

// Create a review for a hired tutor (POST /hired-tutor/{tutorId}/review)
export const useCreateReview = () => {
  const qc = useQueryClient();
  return useMutation<
    Review,
    unknown,
    { tutorId: string; body: { rating: number; comment: string } }
  >({
    mutationFn: ({ tutorId, body }) =>
      apiClient<Review>(`/hired-tutor/${tutorId}/review`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Review submitted");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Failed to submit review"),
  });
};

// Update a review (PUT /hired-tutor/{hiredTutorId}/review)
export const useUpdateReview = () => {
  const qc = useQueryClient();
  return useMutation<
    Review,
    unknown,
    { hiredTutorId: string; body: { rating?: number; comment?: string } }
  >({
    mutationFn: ({ hiredTutorId, body }) =>
      apiClient<Review>(`/hired-tutor/${hiredTutorId}/review`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Review updated");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Failed to update review"),
  });
};

// Delete a review (DELETE /hired-tutor/{hiredTutorId}/review)
export const useDeleteReview = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (hiredTutorId) =>
      apiClient<void>(`/hired-tutor/${hiredTutorId}/review`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("Review deleted");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Failed to delete review"),
  });
};

// 1. Get all Reviews
export const useReviews = () =>
  useQuery<Review[]>({
    queryKey: ["Reviews"],
    queryFn: () => apiClient<Review[]>(`/review/tutor/me`),
  });

export const useAllReviews = () =>
  useQuery<Review[]>({
    queryKey: ["AllReviews"],
    queryFn: () => apiClient<Review[]>(`/review/filter?ratings=1,2,3,4,5`),
  });
