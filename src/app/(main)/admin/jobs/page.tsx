"use client";
import { SiteHeader } from "@/components/site-header";
import { useAllAdvertisements } from "@/hooks/useAdvertisements";
import { useVerifyAdvertisement } from "@/hooks/useVerification";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { data: ads, isLoading, isError } = useAllAdvertisements();
  const verify = useVerifyAdvertisement();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading ads</div>;
  }

  return (
    <>
      <SiteHeader title="Jobs" description="Manage job listings" />
      <div className="p-4">
        {ads && ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <Card key={ad.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {ad.job_title}
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        ad.status === "PENDING"
                          ? "secondary"
                          : ad.status === "APPROVED"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {ad.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between mt-2">
                  <div className="text-sm text-muted-foreground">
                    Posted {ad.created_at}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => verify.mutate({ adId: ad.id || "" })}
                    >
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            No job listings available
          </div>
        )}
      </div>
    </>
  );
}
