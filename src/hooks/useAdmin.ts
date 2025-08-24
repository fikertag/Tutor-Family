import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { TutorProfile, User } from "@/types/index";
import { SimpleAdminList } from "@/types/api";
import { toast } from "sonner";

// ================== tutors ==================
// 1. Get all tutors
export const useAllTutors = () =>
  useQuery<TutorProfile[]>({
    queryKey: ["allTutors"],
    queryFn: () => apiClient<TutorProfile[]>(`/tutor`),
  });

// ================== admin ==================
// 1. Get admin list
export const useAdminList = () =>
  useQuery<SimpleAdminList[]>({
    queryKey: ["adminList"],
    queryFn: () => apiClient<SimpleAdminList[]>(`/admin/list`),
  });

// 2. Get admin/user by id
export const useGetAdminById = (id?: string) =>
  useQuery<User>({
    queryKey: ["admin", id],
    queryFn: () => apiClient<User>(`/admin/${id}`),
    enabled: !!id,
  });

// 3. Promote user to admin (POST /admin/promote)
export const usePromoteUser = () => {
  const qc = useQueryClient();
  return useMutation<User, unknown, { targetUserId: string }>({
    mutationFn: (body) =>
      apiClient<User>(`/admin/promote`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("User promoted");
      qc.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: () => toast.error("Failed to promote user"),
  });
};

// 4. Ban a user (POST /user/ban)
export const useBanUser = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, { userId: string; reason: string }>({
    mutationFn: (body) =>
      apiClient<void>(`/user/ban`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("User banned");
      qc.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: () => toast.error("Failed to ban user"),
  });
};

// 5. Unban a user (DELETE /api/v1/user/unban/{id})
export const useUnbanUser = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/api/v1/user/unban/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("User unbanned");
      qc.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: () => toast.error("Failed to unban user"),
  });
};
