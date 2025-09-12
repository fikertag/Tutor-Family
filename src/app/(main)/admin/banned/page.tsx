"use client";
import { SiteHeader } from "@/components/site-header";
import { useBannedUserList, useUnbanUser } from "@/hooks/useAdmin";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BannedUsersPage() {
  const { data: bannedUsers, isLoading, isError } = useBannedUserList();
  const unbanUser = useUnbanUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading banned users</div>;

  return (
    <>
      <SiteHeader title="Banned Users" description="Manage banned accounts" />
      <div className="p-4">
        <div className="flex gap-4">
          {bannedUsers?.map((user) => (
            <Card key={user.id} className="flex flex-col">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Badge variant="destructive">Banned</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">
                  <strong>Reason:</strong> {user.reason || "Not specified"}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Banned at {user.banned_at}
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => unbanUser.mutate(user.user_id)}
                    >
                      Unban
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
