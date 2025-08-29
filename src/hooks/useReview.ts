import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Review } from "@/types/api";

// ================== Review ==================

// 1. Get all Reviews
export const useReviews = () =>
  useQuery<Review[]>({
    queryKey: ["Reviews"],
    queryFn: () => apiClient<Review[]>(`/review/tutor/me`),
  });
