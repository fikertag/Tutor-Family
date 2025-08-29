import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Application } from "@/types/api";
// import { toast } from "sonner";

// ================== Application ==================

// 1. Get all Application
export const useApplication = () =>
  useQuery<Application[]>({
    queryKey: ["Applications"],
    queryFn: () => apiClient<Application[]>(`/job-application/me`),
  });

// 2. Get Application by ID
export const useApplicationById = (id?: string) =>
  useQuery<Application>({
    queryKey: ["Application", id],
    queryFn: () => apiClient<Application>(`/application/${id}`),
    enabled: !!id,
  });

// 3. unapply a application
export const useUnapplyApplication = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/application/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Applications"] }),
  });
};
