"use client";

import React from "react";
import { useApplication, useUnapplyApplication } from "@/hooks/useApplication";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { Application } from "@/types/api";

export default function Page() {
  const { data: apps, isLoading } = useApplication();
  const unapply = useUnapplyApplication();

  function handleUnapply(id: string) {
    if (!confirm("Unapply from this job?")) return;
    unapply.mutate(id);
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">My Applications</h2>
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
          <div className="space-y-3">
            {(apps || []).map((a: Application) => (
              <div
                key={a.application_id}
                className="rounded-md border p-3 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{a.status}</div>
                  <div className="text-sm text-gray-600">
                    {a.status || a.application_id}
                  </div>
                </div>
                <div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleUnapply(a.application_id)}
                  >
                    <IconTrash /> Unapply
                  </Button>
                </div>
              </div>
            ))}
            {(!apps || apps.length === 0) && (
              <div className="text-sm text-gray-500">No applications yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
