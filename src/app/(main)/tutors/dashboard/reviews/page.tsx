"use client";

import React from "react";
import { useReviews } from "@/hooks/useReview";
import { Review } from "@/types/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  const { data: reviews, isLoading } = useReviews();
  return (
    <>
      <SiteHeader title="Reviews" description="" />
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
            <div className="space-y-3">
              {(reviews || []).map((r: Review) => (
                <div key={r.review_id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">
                        {r.tutor_id || r.tutor_id}
                      </div>
                      <div className="text-sm text-gray-600">{r.comment}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Rating: {r.rating} —{" "}
                        {new Date(
                          r.createdAt ||
                            r.createdAt ||
                            r.createdAt ||
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
    </>
  );
}
