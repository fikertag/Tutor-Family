"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotifications, useReadNotification } from "@/hooks/useNotification";
import type { Notification } from "@/types/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  const [selected, setSelected] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  const allQ = useNotifications();
  const notifications: Notification[] | undefined = allQ.data;
  const markRead = useReadNotification();

  const handleOpen = async (n: Notification) => {
    setSelected(n);
    setOpen(true);
    try {
      await markRead.mutateAsync(n.notification_id);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <SiteHeader title="Notifications" description="" />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selected?.notification_title}</DialogTitle>
              <DialogDescription>
                {selected?.notification_description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="shadow-none border-0">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {allQ.isLoading && (
              <div className="text-sm text-gray-500">Loading…</div>
            )}

            <div className="space-y-3">
              {notifications && notifications.length > 0 ? (
                notifications.map((n: Notification) => (
                  <div
                    key={n.notification_id}
                    className={
                      "rounded-md border p-3 cursor-pointer truncate " +
                      (!n.isRead
                        ? "bg-yellow-50 dark:bg-yellow-900/30"
                        : "bg-white")
                    }
                    onClick={() => handleOpen(n)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-medium truncate text-primary">
                          {n.notification_title ?? "Notification"}
                        </div>
                      </div>
                      {!n.isRead && (
                        <div className="ml-2 text-sm text-yellow-700">●</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500"></div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
