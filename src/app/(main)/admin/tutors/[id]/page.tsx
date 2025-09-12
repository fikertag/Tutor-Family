"use client";
import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useFullTutorProfileAdmin } from "@/hooks/useTutors";
import {
  useVerifyVerificationDoc,
  useVerifyEducation,
  useVerifyTranscript,
  useVerifyQualification,
  useRejectEducation,
  useRejectVerificationDoc,
  useRejectQualification,
  useRejectTranscript,
} from "@/hooks/useVerification";
import { useBanUser, useUnbanUser } from "@/hooks/useAdmin";
import { useCreateNotification } from "@/hooks/useNotification";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
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
import Image from "next/image";

const ConfirmAction = ({
  title,
  description,
  confirmLabel = "Continue",
  children,
  onConfirm,
}: {
  title: string;
  description?: string;
  confirmLabel?: string;
  children: React.ReactNode;
  onConfirm: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function AdminTutorDetailPage() {
  const params = useParams();
  const tutorId = params?.id as string | undefined;
  const { data, isLoading, isError } = useFullTutorProfileAdmin(tutorId);

  // Admin actions
  const banUser = useBanUser();
  const unbanUser = useUnbanUser();

  // Verification hooks
  const verifyDoc = useVerifyVerificationDoc();
  const verifyTranscript = useVerifyTranscript();
  const verifyQualification = useVerifyQualification();
  const verifyEducation = useVerifyEducation();
  const rejectTranscript = useRejectTranscript();
  const rejectQualification = useRejectQualification();
  const rejectEducation = useRejectEducation();
  const rejectDoc = useRejectVerificationDoc();

  if (isLoading) {
    return (
      <>
        <SiteHeader title="Profile" description="View and edit your profile" />
        <div className="container mx-auto py-8 space-y-6 px-5">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <SiteHeader title="Profile" description="View and edit your profile" />
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold text-destructive">
            Error Loading Profile
          </h2>
          <p> Unable to load tutor profile</p>
        </div>
      </>
    );
  }

  const tutor = data;
  const user = tutor.user;

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  return (
    <>
      <SiteHeader title="Profile" description="View and edit your profile" />
      <div className="container mx-auto py-8 space-y-6 px-5">
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
                <p className="text-muted-foreground mt-2">
                  {tutor.snapshot_bio}
                </p>

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
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <ConfirmAction
                  title="Ban user"
                  description="Banned users cannot access their account. This action can be reversed by unbanning."
                  confirmLabel="Ban user"
                  onConfirm={() =>
                    banUser.mutate({ userId: user.id, reason: "Admin action" })
                  }
                >
                  <Button variant="destructive" disabled={banUser.isPending}>
                    Ban
                  </Button>
                </ConfirmAction>

                <ConfirmAction
                  title="Unban user"
                  description="Restore access for this user."
                  confirmLabel="Unban"
                  onConfirm={() => unbanUser.mutate(user.id)}
                >
                  <Button variant="outline" disabled={unbanUser.isPending}>
                    Unban
                  </Button>
                </ConfirmAction>
                {/* Message form */}
                <div>
                  <MessageButton userId={user.id} />
                </div>
              </div>
            </div>
          </CardContent>

          <CardHeader>
            <CardTitle>Tutor Details</CardTitle>
            <CardDescription>Key information about the tutor</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
                    <p className="text-sm text-muted-foreground">
                      Not specified
                    </p>
                  )}
                </div>
              </div>
            </div>

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

        {/* Transcripts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Transcripts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tutor.transcripts?.map((t) => (
                <li key={t.id} className="flex items-center gap-3">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT +
                      "/" +
                      t.transcript_doc_cloudinary_id
                    }
                    height={80}
                    width={128}
                    alt={`transcript-${t.id}`}
                    className="object-cover rounded border"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Transcript {t.id}</div>
                  </div>
                  <div className="flex gap-2">
                    <ConfirmAction
                      title="Verify transcript"
                      description="Mark this transcript as verified."
                      confirmLabel="Verify"
                      onConfirm={() =>
                        verifyTranscript.mutate({
                          transcriptId: t.id,
                        })
                      }
                    >
                      <Button size="sm">Verify</Button>
                    </ConfirmAction>

                    <ConfirmAction
                      title="Reject transcript"
                      description="Reject this transcript."
                      confirmLabel="Reject"
                      onConfirm={() =>
                        rejectTranscript.mutate({
                          transcriptId: t.id,
                          reason: "rejected",
                        })
                      }
                    >
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </ConfirmAction>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Qualifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tutor.qualifications?.map((q) => {
                const isVerified = (
                  q as unknown as { is_verified?: boolean | string }
                ).is_verified;
                return (
                  <li key={q.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {q.certificate_name ?? `Qualification ${q.id}`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {q.issuing_organization ?? "--"}
                      </div>
                    </div>
                    {isVerified ? <Badge>Verified</Badge> : null}
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify qualification"
                        description="Mark this qualification as verified."
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyQualification.mutate({
                            qualificationId: q.id,
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>

                      <ConfirmAction
                        title="Reject qualification"
                        description="Reject this qualification."
                        confirmLabel="Reject"
                        onConfirm={() =>
                          rejectQualification.mutate({
                            qualificationId: q.id,
                            reason: "rejected",
                          })
                        }
                      >
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </ConfirmAction>
                    </div>
                  </li>
                );
              })}
            </ul>
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
                  <h3 className="font-semibold">
                    {education.institution_name}
                  </h3>
                  <p className="text-sm">
                    {education.degree_title || education.degree} in{" "}
                    {education.field_of_study}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={education.is_verified ? "default" : "secondary"}
                    >
                      {education.is_verified ? "Verified" : "Unverified"}
                    </Badge>
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify education"
                        description="Mark this education record as verified."
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyEducation.mutate({
                            educationId: education.id,
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>

                      <ConfirmAction
                        title="Unverify education"
                        description="Mark this education record as unverified."
                        confirmLabel="Unverify"
                        onConfirm={() =>
                          rejectEducation.mutate({
                            educationId: education.id,
                            reason: "admin action",
                          })
                        }
                      >
                        <Button size="sm" variant="destructive">
                          Unverify
                        </Button>
                      </ConfirmAction>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">
                No education history listed
              </p>
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

        {/* Verification Docs */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {tutor.verificationDocument ? (
              <ul className="space-y-2">
                {
                  <li
                    key={tutor.verificationDocument?.id}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT +
                        "/" +
                        tutor.verificationDocument?.id_photo_cloudinary_id
                      }
                      alt="doc"
                      height={80}
                      width={128}
                      className="object-cover rounded border"
                    />
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify document"
                        description="Mark this document as verified for the tutor."
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyDoc.mutate({
                            userId: user.id,
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>

                      <ConfirmAction
                        title="Reject document"
                        description="Reject this verification document. This action can be reversed by updating status."
                        confirmLabel="Reject"
                        onConfirm={() =>
                          rejectDoc.mutate({
                            userId: user.id,
                            reason: "admin action",
                          })
                        }
                      >
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </ConfirmAction>
                    </div>
                  </li>
                }
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No verification documents uploaded
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function MessageButton({ userId }: { userId: string }) {
  const create = useCreateNotification();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("INFO");
  const [desc, setDesc] = useState("");

  const handleSend = () => {
    if (!title.trim() || !desc.trim()) return;
    create.mutate({
      userId,
      notification_title: title,
      notification_type: type,
      notification_description: desc,
    });
    setTitle("");
    setDesc("");
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="ghost" onClick={() => setOpen((s) => !s)}>
          {open ? "Cancel" : "Message"}
        </Button>
        {open && (
          <div className="p-3 border rounded-md bg-background">
            <input
              className="w-full mb-2 px-2 py-1 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="w-full mb-2 px-2 py-1 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="INFO">Info</option>
              <option value="WARNING">Warning</option>
              <option value="ALERT">Alert</option>
            </select>
            <textarea
              className="w-full mb-2 px-2 py-1 border rounded"
              placeholder="Message"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSend}
                disabled={create.isPending}
              >
                {create.isPending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
