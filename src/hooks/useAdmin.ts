import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { TutorProfile, User } from "@/types/index";
import {
  SimpleAdminList,
  ApiResponse,
  BannedUserRecord,
  BasicProfile,
} from "@/types/api";
import { toast } from "sonner";

// ================== tutors ==================
// 1. Get all tutors
export interface AllTutorsQuery {
  location?: string;
  name?: string;
  page?: number;
  limit?: number;
}

export const useAllTutors = (opts: AllTutorsQuery = {}) => {
  const { location, name, page = 1, limit = 10 } = opts;
  // Build query string
  const params = new URLSearchParams();
  if (location) params.append("location", location);
  if (name) params.append("name", name);
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  const qs = params.toString();
  return useQuery<TutorProfile[]>({
    queryKey: ["allTutors", { location, name, page, limit }],
    queryFn: () => apiClient<TutorProfile[]>(`/tutor${qs ? `?${qs}` : ""}`),
  });
};
export const useAllTutorsAdmin = (opts: AllTutorsQuery = {}) => {
  const { location, name, page = 1, limit = 10 } = opts;
  // Build query string
  const params = new URLSearchParams();
  if (location) params.append("location", location);
  if (name) params.append("name", name);
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  const qs = params.toString();
  return useQuery<TutorProfile[]>({
    queryKey: ["allTutors", { location, name, page, limit }],
    queryFn: () =>
      apiClient<TutorProfile[]>(`/tutor/for-admin${qs ? `?${qs}` : ""}`),
  });
};

export const useAllTutorsWithMeta = (opts: AllTutorsQuery = {}) => {
  const { location, name, page = 1, limit = 10 } = opts;

  // Build query string
  const params = new URLSearchParams();
  if (location) params.append("location", location);
  if (name) params.append("name", name);
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  const qs = params.toString();
  return useQuery<{
    items: TutorProfile[];
    meta?: { total: number; totalPages: number };
  }>({
    // use a separate key so this hook's cached shape doesn't collide with useAllTutors
    queryKey: ["allTutorsWithMeta", { location, name, page, limit }],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutor${qs ? `?${qs}` : ""}`
      );
      const json: ApiResponse<TutorProfile[]> = await response.json();

      if (!response.ok) {
        throw new Error(json.message || `API Error: ${response.status}`);
      }

      return { items: json.data, meta: json.meta };
    },
  });
};

// ================== admin ==================
// 1. Get admin list
export const useAdminList = () =>
  useQuery<SimpleAdminList[]>({
    queryKey: ["adminList"],
    queryFn: () => apiClient<SimpleAdminList[]>(`/admin/list`),
  });
export const useFamillyList = () =>
  useQuery<BasicProfile[]>({
    queryKey: ["familyList"],
    queryFn: () => apiClient<BasicProfile[]>(`/family`),
  });

// list bannded user
export const useBannedUserList = () =>
  useQuery<BannedUserRecord[]>({
    queryKey: ["bannedUserList"],
    queryFn: () => apiClient<BannedUserRecord[]>(`/user/banned`),
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
      apiClient<void>(`/user/unban/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("User unbanned");
      qc.invalidateQueries({ queryKey: ["adminList"] });
    },
    onError: () => toast.error("Failed to unban user"),
  });
};
