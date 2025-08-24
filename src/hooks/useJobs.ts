import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { Application } from "@/types/api";

// 1. Create a job application (POST /job-application)
export const useCreateJobApplication = () => {
  const qc = useQueryClient();
  return useMutation<Application, unknown, { advertisement_id: string }>({
    mutationFn: (payload) =>
      apiClient<Application>(`/job-application`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Application submitted");
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to submit application"),
  });
};

// 2. Get a single job application by ID (GET /job-application/{id})
export const useGetJobApplication = (id?: string) =>
  useQuery<Application>({
    queryKey: ["application", id],
    queryFn: () => apiClient<Application>(`/job-application/${id}`),
    enabled: !!id,
  });

// 3. Delete a job application (DELETE /job-application/{id})
export const useDeleteJobApplication = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/job-application/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Application deleted");
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: () => toast.error("Failed to delete application"),
  });
};

// 4. Get all my job applications (GET /job-application)
export const useMyJobApplications = () =>
  useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: () => apiClient<Application[]>(`/job-application`),
  });
