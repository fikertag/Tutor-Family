"use client";

import React, { useState } from "react";
import {
  useNotifications,
  useFilterNotificationsByReadStatus,
  useGetUnreadCount,
  useDeleteNotification,
  useReadNotification,
} from "@/hooks/useNotification";
import type { Notification } from "@/types/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { IconTrash, IconMail } from "@tabler/icons-react";

export default function Page() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const { data: unreadCount } = useGetUnreadCount();

  const allQ = useNotifications();
  const filteredQ = useFilterNotificationsByReadStatus(filter === "read");

  const notifications: Notification[] | undefined =
    filter === "all" ? allQ.data : filteredQ.data;

  const deleteNotification = useDeleteNotification();

  const markRead = useReadNotification();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <IconMail /> Notifications
          <Badge>0</Badge>
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? undefined : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? undefined : "ghost"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          <Button
            variant={filter === "read" ? undefined : "ghost"}
            size="sm"
            onClick={() => setFilter("read")}
          >
            Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {(allQ.isLoading || (filter !== "all" && filteredQ.isLoading)) && (
            <div className="text-sm text-gray-500">Loading…</div>
          )}

          <div className="space-y-3">
            {notifications && notifications.length > 0 ? (
              notifications.map((n: Notification) => (
                <div key={n.notification_id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">
                          {n.notification_title ?? "Notification"}
                        </div>
                        {!n.isRead && <Badge variant="secondary">New</Badge>}
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        {n.notification_description}
                      </div>
                      {n.createdAt && (
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(n.createdAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markRead.mutate(n.notification_id)}
                      >
                        Mark read
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteNotification.mutate(n.notification_id)
                        }
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No notifications</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
