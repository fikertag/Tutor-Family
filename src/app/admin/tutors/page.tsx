"use client";
import React, { use, useEffect } from "react";
import { useAllTutors } from "@/hooks/useAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAdminList } from "@/hooks/useAdmin";

export default function TutorsPage() {
  const { data: tutors = [], isLoading } = useAllTutors();
  const { data: admins = [] } = useAdminList();

  if (isLoading) return <div>Loading tutors…</div>;

  // useEffect(() => {
  //   console.log("Admins:", admins);
  // }, [admins]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold"> Admins</h1>

      {tutors.length === 0 ? (
        <div className="text-sm text-muted-foreground">No tutors found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutors.map((tutor) => (
            <Card key={tutor.id}>
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {tutor.id?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {tutor.first_name || tutor.last_name
                        ? `${tutor.first_name ?? ""} ${tutor.last_name ?? ""}`.trim()
                        : tutor.id}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {tutor.location ?? "—"}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{tutor.avg_review ?? 0}★</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">
                  {tutor.snapshot_bio ?? "No bio provided."}
                </p>
                <div className="text-xs text-muted-foreground">
                  Reviews: {tutor.review_num ?? 0}
                </div>
                {tutor.languages && tutor.languages.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Languages: {tutor.languages.join(", ")}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
