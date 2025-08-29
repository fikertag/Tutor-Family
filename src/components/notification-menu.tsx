"use client";

// import { useMemo } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useNotifications, useReadNotification } from "@/hooks/useNotification";
import { Notification } from "@/types/api";

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function NotificationMenu() {
  const { data } = useNotifications();
  const readMutation = useReadNotification();

  // Ensure we always have an array to map over. The API sometimes returns
  // a wrapper object like { data: [...] } instead of a direct array.
  // const notifications: Notification[] = useMemo(() => {
  //   if (!data) return [];
  //   if (Array.isArray(data)) return data as Notification[];
  //   if (Array.isArray((data as any).data))
  //     return (data as any).data as Notification[];
  //   return [];
  // }, [data]);

  // const unreadCount = notifications.filter((n) => !n.isRead).length;

  // normalize data to an array in case the API returns a wrapper object
  // const notifications = data ;
  // : data && Array.isArray((data as Notification).data)
  //   ? (data as any).data
  //   : [];

  // const unreadCount = notifications.filter(
  //   (n: Notification) => !n.isRead
  // ).length;

  // useEffect(() => {
  //   // debug
  //   // console.debug("Notifications updated:", notifications);
  // }, [notifications]);

  const handleNotificationClick = (id: string) => {
    // mark as read via mutation
    readMutation.mutate(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground relative size-8 rounded-full shadow-none"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {/* {unreadCount > 0 && (
            <div
              aria-hidden="true"
              className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
            />
          )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>
        {data?.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No notifications.
          </div>
        ) : (
          data?.map((notification: Notification) => (
            <div
              key={notification.notification_id}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
            >
              <div className="relative flex items-center gap-3">
                <button
                  className="flex-1 text-left text-foreground/90 truncate after:absolute after:inset-0"
                  onClick={() =>
                    handleNotificationClick(notification.notification_id)
                  }
                >
                  {/* One-line preview: title — description */}
                  <span className="font-medium">
                    {notification.notification_title}
                  </span>
                  {notification.notification_description ? (
                    <span className="text-muted-foreground">
                      {" "}
                      — {notification.notification_description}
                    </span>
                  ) : null}
                </button>
                {!notification.isRead && (
                  <div className="flex-shrink-0">
                    <span className="sr-only">Unread</span>
                    <Dot />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
