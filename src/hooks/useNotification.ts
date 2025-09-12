import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Notification } from "@/types/api";
import { toast } from "sonner";

// ================== NOTIFICATIONS ==================

// 1. Get all notifications
export const useNotifications = () =>
  useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => apiClient<Notification[]>(`/notification`),
  });

// 2. Get notification by ID
export const useNotificationById = (id?: string) =>
  useQuery<Notification>({
    queryKey: ["notification", id],
    queryFn: () => apiClient<Notification>(`/notification/${id}`),
    enabled: !!id,
  });

// 4. read notification
export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<Notification, unknown, string>({
    mutationFn: (id: string) =>
      apiClient<Notification>(`/notification/${id}/read`, {
        method: "PATCH",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// 5. Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) =>
      apiClient<void>(`/notification/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

// 6. Filter notifications by read status
export const useFilterNotificationsByReadStatus = (isRead: boolean) =>
  useQuery<Notification[]>({
    queryKey: ["notifications", { isRead }],
    queryFn: () =>
      apiClient<Notification[]>(`/notification/filter?isRead=${isRead}`),
  });

// 7. get unread count
export const useGetUnreadCount = () =>
  useQuery<number>({
    queryKey: ["notifications", "unreadCount"],
    queryFn: () => apiClient<number>(`/notification/unread/count`),
  });

// 8. Create a notification (POST /notification)
export interface CreateNotificationInput {
  userId: string;
  notification_title: string;
  notification_type: string; // e.g. INFO, WARNING, etc.
  notification_description: string;
}

export const useCreateNotification = () => {
  const qc = useQueryClient();
  return useMutation<void, unknown, CreateNotificationInput>({
    mutationFn: (body) =>
      apiClient<void>(`/notification`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Notification sent");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => toast.error("Failed to send notification"),
  });
};
