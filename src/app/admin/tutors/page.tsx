"use client";
import React from "react";
import { useAllTutors } from "@/hooks/useAdmin";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
export default function TutorsPage() {
  const { data: tutors = [], isLoading } = useAllTutors();

  if (isLoading) return <div>Loading tutors…</div>;

  return (
    <>
      <SiteHeader title="Profile" description="View and edit your profile" />
      <div className="space-y-4 p-4">
        <h1 className="text-2xl font-semibold"> Tutors</h1>

        {tutors.length === 0 ? (
          <div className="text-sm text-muted-foreground">No tutors found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutors.map((tutor) => (
              <Link
                key={tutor.id}
                href={`/admin/tutors/${tutor.id}`}
                className="block hover:shadow-lg transition-shadow"
              >
                <Card>
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
                            : "no name"}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
