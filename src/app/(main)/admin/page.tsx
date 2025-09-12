import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Admin " description="What do you want to do?" />
      <div className="p-4">
        <div className="flex justify-center  flex-wrap gap-4 w-full">
          <Card className="flex-1 flex flex-col justify-between ">
            <CardHeader>
              <CardTitle className="font-medium">See tutors</CardTitle>
              <CardDescription>View and manage all tutors</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Assumes an admin tutors list exists at /admin/tutors */}
              <Button asChild>
                <Link href="/admin/tutors">Go to tutors</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="font-medium">Add a subject</CardTitle>
              <CardDescription>Create a new subject for tutors</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Assumes a subject creation route at /admin/subjects/new */}
              <Button asChild>
                <Link href="/admin/subjects">Add subject</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>See selected tutors</CardTitle>
              <CardDescription>View selected tutors</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Assumes an admin hired/selected route at /admin/hired */}
              <Button asChild>
                <Link href="/admin/requests">View selected tutors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
