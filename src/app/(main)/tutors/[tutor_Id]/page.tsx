"use client";
import { useParams } from "next/navigation";
import { useFullTutorProfileFamily } from "@/hooks/useTutors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  BookOpen,
  GraduationCap,
  Briefcase,
  Star,
  Languages,
  DollarSign,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePickTutor, useMyPickedTutors } from "@/hooks/useHire";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function TutorProfilePage() {
  const params = useParams();
  const tutorId = params?.tutor_Id as string | undefined;
  const { data, isLoading, isError, error } =
    useFullTutorProfileFamily(tutorId);
  const [picking, setPicking] = useState(false);
  const pickTutor = usePickTutor();
  const { data: myPickedTutors } = useMyPickedTutors();
  const { data: sessionData } = authClient.useSession();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6 px-5">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold text-destructive">
          Error Loading Profile
        </h2>
        <p>{error?.message || "Unable to load tutor profile"}</p>
      </div>
    );
  }

  const tutor = data;
  const user = tutor.user;

  // Calculate initials for avatar fallback
  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className="container mx-auto py-8 space-y-6 px-5">
      {/* First Row: Avatar and Basic Info */}
      <Card>
        <CardContent className="">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={
                  process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT +
                  "/" +
                  user.profile_picture_url
                }
              />
              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-muted-foreground mt-2">{tutor.snapshot_bio}</p>

              <div className="flex items-center justify-center md:justify-start mt-4 gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">
                    {tutor.avg_review?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({tutor.review_num} reviews)
                  </span>
                </div>
                <div className="ml-4">
                  {sessionData?.user.role === "USER" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={Boolean(
                            myPickedTutors?.some(
                              (h) => h.pickedTutorUserId === tutor.user.id
                            )
                          )}
                        >
                          {myPickedTutors?.some(
                            (h) => h.pickedTutorUserId === tutor.user.id
                          )
                            ? "Picked"
                            : "Pick tutor"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Pick this tutor?</AlertDialogTitle>
                          <AlertDialogDescription>
                            By picking this tutor you may receive a phone call
                            from our team to confirm details. Do you want to
                            proceed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              // guard against re-picking if the tutor is already picked
                              const alreadyPicked = Boolean(
                                myPickedTutors?.some(
                                  (h) => h.pickedTutorUserId === tutor.user.id
                                )
                              );
                              if (alreadyPicked) return;
                              setPicking(true);
                              pickTutor.mutate(tutor.user.id);
                            }}
                          >
                            {picking ? "Picking..." : "OK"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Second Row: Key Details */}

        <CardHeader>
          <CardTitle>Tutor Details</CardTitle>
          <CardDescription>Key information about the tutor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <MapPin className="w-5 h-5 " />
            </div>
            <div className="flex-1 flex items-center gap-2 ">
              <h3 className="font-medium">Location: </h3>
              <p className="text-sm text-muted-foreground">
                {tutor.location || "Not specified"}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/30">
              <Languages className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <h3 className="font-medium">Languages: </h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {tutor.languages && tutor.languages.length > 0 ? (
                  tutor.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Not specified</p>
                )}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/30">
              <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 flex gap-2 items-center">
              <h3 className="font-medium">Experience: </h3>
              <p className="text-sm text-muted-foreground">
                {tutor.years_of_experience || "0"} years
              </p>
            </div>
          </div>

          {/* Subjects */}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <h3 className="font-medium">Subjects:</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {tutor.tutorSubjects && tutor.tutorSubjects.length > 0 ? (
                  tutor.tutorSubjects.map((subject) => (
                    <Badge key={subject.tutor_subject_id} variant="outline">
                      {subject.subject_name}
                      {subject.grade && subject.grade.length > 0 && (
                        <span className="ml-1">
                          ({subject.grade.join(", ")})
                        </span>
                      )}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No subjects listed
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Monthly Rate */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-100 rounded-full dark:bg-emerald-900/30">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <h3 className="font-medium">Monthly Rate:</h3>
              <p className="text-sm text-muted-foreground">
                {tutor.monthly_rate || "0"}/month
              </p>
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-pink-100 rounded-full dark:bg-pink-900/30">
              <User className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <h3 className="font-medium">Gender:</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {user.gender?.toLowerCase() || "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Education Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </CardTitle>
          <CardDescription>Academic background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tutor.educations && tutor.educations.length > 0 ? (
            tutor.educations.map((education) => (
              <div
                key={education.id}
                className="border-l-4 border-primary pl-4 py-1"
              >
                <h3 className="font-semibold">{education.institution_name}</h3>
                <p className="text-sm">
                  {education.degree_title || education.degree} in{" "}
                  {education.field_of_study}
                </p>
                <div className="mt-1">
                  <Badge
                    variant={education.is_verified ? "default" : "secondary"}
                  >
                    {education.is_verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No education history listed</p>
          )}
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Work Experience
          </CardTitle>
          <CardDescription>Professional experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tutor.experiences && tutor.experiences.length > 0 ? (
            tutor.experiences.map((experience) => (
              <div
                key={experience.id}
                className="border-l-4 border-primary pl-4 py-1"
              >
                <h3 className="font-semibold">{experience.title}</h3>
                <p className="text-sm">{experience.company}</p>
                {experience.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {experience.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No work experience listed</p>
          )}
        </CardContent>
      </Card>

      {/* Availability Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Availability
          </CardTitle>
          <CardDescription>Weekly schedule</CardDescription>
        </CardHeader>
        <CardContent>
          {tutor.availabilities && tutor.availabilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutor.availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className="flex items-center p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium capitalize">
                      {availability.weekday.toLowerCase()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {availability.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No availability set</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
