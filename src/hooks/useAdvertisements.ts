import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import {
  Advertisement,
  Application,
  Ads,
  NewAdvertisement,
  AllApplications,
} from "@/types/api";

// Get all advertisements
export const useAllAdvertisements = () =>
  useQuery<NewAdvertisement[]>({
    queryKey: ["advertisements"],
    queryFn: () => apiClient<NewAdvertisement[]>(`/advertisement`),
  });

// Create advertisement
export const useCreateAdvertisement = () => {
  const qc = useQueryClient();
  return useMutation<Advertisement, unknown, Ads>({
    mutationFn: (payload) =>
      apiClient<Advertisement>(`/advertisement`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("Advertisement created");
      qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => toast.error("Could not create advertisement"),
  });
};

// Update advertisement
export const useUpdateAdvertisement = () => {
  const qc = useQueryClient();
  return useMutation<
    Advertisement,
    unknown,
    {
      id: string;
      body: Partial<{
        job_title: string;
        job_description: string;
        job_weeks: number;
        location: string;
        gender: string[];
        languages: string[];
      }>;
    }
  >({
    mutationFn: ({ id, body }) =>
      apiClient<Advertisement>(`/advertisement/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Advertisement updated");
      qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => toast.error("Could not update advertisement"),
  });
};

// Delete advertisement
export const useDeleteAdvertisement = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/advertisement/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Advertisement deleted");
      qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => toast.error("Could not delete advertisement"),
  });
};

// Get applications for an advertisement
export const useAdvertisementApplications = (adId: string) =>
  useQuery<Application[]>({
    queryKey: ["advertisement", adId, "applications"],
    queryFn: () =>
      apiClient<Application[]>(`/advertisement/${adId}/applications`),
    enabled: !!adId,
  });

// Pick an application for an advertisement
export const usePickApplication = () => {
  const qc = useQueryClient();
  return useMutation<
    void,
    unknown,
    { advertisementId: string; applicationId: string }
  >({
    mutationFn: ({ advertisementId, applicationId }) =>
      apiClient<void>(
        `/advertisement/${advertisementId}/applications/${applicationId}/pick`,
        { method: "POST" }
      ),
    onSuccess: () => {
      toast.success("Applicant picked");
      qc.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: () => toast.error("Could not pick applicant"),
  });
};

// Get applications for an advertisement
export const useAllApplications = () =>
  useQuery<AllApplications[]>({
    queryKey: ["Allapplications"],
    queryFn: () =>
      apiClient<AllApplications[]>(`/advertisement/my/applications`),
  });
