"use client";

import { useAllAdvertisements } from "@/hooks/useAdvertisements";
import { useCreateJobApplication, useMyJobApplications } from "@/hooks/useJobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: ads } = useAllAdvertisements();
  const { data: myApplications } = useMyJobApplications();
  const apply = useCreateJobApplication();

  const appliedSet = new Set<string>();
  if (myApplications && Array.isArray(myApplications)) {
    myApplications.forEach((a) => {
      if ((a as any).advertisement_id)
        appliedSet.add((a as any).advertisement_id);
    });
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Available Jobs</h1>
      {ads && ads.length > 0 ? (
        <div className="grid grid-cols-1  gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg p-4 shadow-sm bg-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{ad.job_title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ad.job_description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      ad.is_verified === "ACCEPTED"
                        ? "default"
                        : ad.is_verified === "REJECTED"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {(ad.is_verified ?? ad.status === "ACCEPTED")
                      ? "verified"
                      : "UNKNOWN"}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3 flex-wrap">
                {" "}
                <div className="text-sm">Location: {ad.location}</div>{" "}
                {ad.languages && ad.languages.length > 0 ? (
                  <div className="text-sm">
                    Languages: {ad.languages.join(", ")}
                  </div>
                ) : null}
                {ad.job_weeks ? (
                  <div className="text-sm">Weeks: {ad.job_weeks}</div>
                ) : null}
                {ad.gender ? (
                  <div className="text-sm">Preferred gender: {ad.gender}</div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Posted: {ad.created_at ?? "unknown"}
                </div>
                <div className="flex items-center gap-2">
                  {appliedSet.has(ad.id ?? "") ? (
                    <Button size="sm" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => apply.mutate({ advertisement_id: ad.id! })}
                      disabled={apply.isPending}
                    >
                      {apply.isPending ? "Applying..." : "Apply"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-6">No job listings found.</p>
      )}
    </div>
  );
}
