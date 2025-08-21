"use client";

import React from "react";
import { useReviews } from "@/hooks/useReview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
  const { data: reviews, isLoading } = useReviews();
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
          <div className="space-y-3">
            {(reviews || []).map((r: any) => (
              <div key={r.id} className="rounded-md border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">
                      {r.reviewer_name || r.from}
                    </div>
                    <div className="text-sm text-gray-600">{r.comment}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Rating: {r.rating} —{" "}
                      {new Date(
                        r.created_at ||
                          r.createdAt ||
                          r.createdAtUtc ||
                          Date.now()
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {(!reviews || reviews.length === 0) && (
              <div className="text-sm text-gray-500">No reviews yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
