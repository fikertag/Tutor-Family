"use client";
import { SiteHeader } from "@/components/site-header";
import { usePickedTutors } from "@/hooks/useHire";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useHireTutor } from "@/hooks/useHire";
import { Button } from "@/components/ui/button";

export default function page() {
  const { data, isLoading, isError } = usePickedTutors();
  const hire = useHireTutor();
  return (
    <>
      <SiteHeader title="Tutor Requests" description="Manage tutor requests" />
      <div className="p-4">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading tutor requests</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((tutor, idx) => (
            <Card key={tutor.pickedTutorUserId + idx} className="flex flex-col">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {/* If you have a profile picture URL, use it here */}
                    <AvatarFallback>
                      {tutor.pickedTutorUserId?.slice(0, 2) ?? "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base break-all">
                      Tutor ID: {tutor.pickedTutorUserId}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground break-all">
                      Picked by: {tutor.pickedBy}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {" "}
                <Badge
                  variant={
                    tutor.hired === "ACCEPTED"
                      ? "default"
                      : tutor.hired === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {tutor.hired}
                </Badge>
                <div className="text-sm">
                  <strong>Picked:</strong> {tutor.picked ? "Yes" : "No"}
                </div>
                {tutor.reject_reason && (
                  <div className="text-sm text-destructive">
                    <strong>Reject Reason:</strong> {tutor.reject_reason}
                  </div>
                )}
                <Button
                  onClick={() =>
                    hire.mutate({
                      tutorId: tutor.pickedTutorUserId,
                      userId: tutor.pickedBy,
                    })
                  }
                >
                  Hire
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
