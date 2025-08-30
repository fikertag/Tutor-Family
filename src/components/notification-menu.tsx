"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import {
  useNotifications,
  useReadNotification,
  useGetUnreadCount,
} from "@/hooks/useNotification";
import { da } from "zod/v4/locales";

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
  const { data, isLoading } = useNotifications();
  const readMutation = useReadNotification();
  const { data: unreadCount } = useGetUnreadCount();

  const notifications: any[] = Array.isArray(data)
    ? data
    : data && (data as any).notifications
      ? (data as any).notifications
      : [];

  console.log("notifications", data, "-> normalized", notifications);

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
          {unreadCount
            ? unreadCount > 0 && (
                <div
                  aria-hidden="true"
                  className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
                />
              )
            : null}
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

        {isLoading ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center justify-center px-4 py-6 text-sm text-muted-foreground"
          >
            <svg
              className="mr-2 h-4 w-4 animate-spin text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Loading...
          </div>
        ) : (
          <div>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.notification_id}
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
                >
                  <div className="relative flex items-center gap-3">
                    <Link
                      href={`/notifications/${notification.notification_id}`}
                      className="flex-1 text-left text-foreground/90 truncate after:absolute after:inset-0"
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
                    </Link>
                    {!notification.isRead && (
                      <div className="flex-shrink-0">
                        <span className="sr-only">Unread</span>
                        <Dot />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No notifications.
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
