"use client";

import React from "react";
import Link from "next/link";
import {
  usePendingVerificationDocs,
  useUnverifiedTranscripts,
  useUnverifiedAdvertisements,
  useUnverifiedQualifications,
  useUnverifiedEducations,
  useVerifyVerificationDoc,
  useVerifyTranscript,
  useVerifyAdvertisement,
  useVerifyQualification,
  useVerifyEducation,
} from "@/hooks/useVerification";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { SiteHeader } from "@/components/site-header";

function ConfirmAction({
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
}) {
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
}

export default function UnverifiedItemsPage() {
  const docsQuery = usePendingVerificationDocs();
  const transcriptsQuery = useUnverifiedTranscripts();
  const adsQuery = useUnverifiedAdvertisements();
  const qualsQuery = useUnverifiedQualifications();
  const edQuery = useUnverifiedEducations();

  const verifyDoc = useVerifyVerificationDoc();
  const verifyTranscript = useVerifyTranscript();
  const verifyAd = useVerifyAdvertisement();
  const verifyQual = useVerifyQualification();
  const verifyEdu = useVerifyEducation();

  return (
    <>
      <SiteHeader
        title="Unverified items"
        description="Review and verify pending items"
      />
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Verification Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {docsQuery.data && docsQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {docsQuery.data.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${d.id_photo_cloudinary_id}`}
                        alt="id"
                        className="h-20 w-32 object-cover rounded border"
                      />
                      <div>
                        <div className="text-sm">
                          Tutor:{" "}
                          <Link
                            className="underline"
                            href={`/admin/tutors/${d.tutor_id}`}
                          >
                            {d.tutor_id}
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Status: {d.verification_status}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify document"
                        description="Mark this verification document as approved"
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyDoc.mutate({
                            userId: d.user_id,
                            status: "verified",
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>
                      <ConfirmAction
                        title="Reject document"
                        description="Reject this document"
                        confirmLabel="Reject"
                        onConfirm={() =>
                          verifyDoc.mutate({
                            userId: d.user_id,
                            status: "rejected",
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
            ) : (
              <div className="text-sm text-muted-foreground">
                No verification documents
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcripts</CardTitle>
          </CardHeader>
          <CardContent>
            {transcriptsQuery.data && transcriptsQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {transcriptsQuery.data.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${t.transcript_doc_cloudinary_id}`}
                        alt="transcript"
                        className="h-20 w-32 object-cover rounded border"
                      />
                      <div>
                        <div className="text-sm">
                          Tutor:{" "}
                          <Link
                            className="underline"
                            href={`/admin/tutors/${t.tutor_id}`}
                          >
                            {t.tutor_id}
                          </Link>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Verified: {String(t.is_verified)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify transcript"
                        description="Mark this transcript as verified"
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyTranscript.mutate({
                            transcriptId: t.id,
                            status: "verified",
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>
                      <ConfirmAction
                        title="Reject transcript"
                        description="Reject this transcript"
                        confirmLabel="Reject"
                        onConfirm={() =>
                          verifyTranscript.mutate({
                            transcriptId: t.id,
                            status: "rejected",
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
            ) : (
              <div className="text-sm text-muted-foreground">
                No transcripts
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advertisements</CardTitle>
          </CardHeader>
          <CardContent>
            {adsQuery.data && adsQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {adsQuery.data.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm">{a.job_title}</div>
                      <div className="text-xs text-muted-foreground">
                        Posted by:{" "}
                        <Link
                          className="underline"
                          href={`/admin/tutors/${a.user_id}`}
                        >
                          {a.user_id}
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify advertisement"
                        description="Mark this advertisement as verified"
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyAd.mutate({ adId: a.id, status: "verified" })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>
                      <ConfirmAction
                        title="Reject advertisement"
                        description="Reject this ad"
                        confirmLabel="Reject"
                        onConfirm={() =>
                          verifyAd.mutate({ adId: a.id, status: "rejected" })
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
            ) : (
              <div className="text-sm text-muted-foreground">
                No advertisements
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            {qualsQuery.data && qualsQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {qualsQuery.data.map((q) => (
                  <li
                    key={q.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm">{q.certificate_name}</div>
                      <div className="text-xs text-muted-foreground">
                        Tutor:{" "}
                        <Link
                          className="underline"
                          href={`/admin/tutors/${q.tutorId}`}
                        >
                          {q.tutorId}
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ConfirmAction
                        title="Verify qualification"
                        description="Mark this qualification as verified"
                        confirmLabel="Verify"
                        onConfirm={() =>
                          verifyQual.mutate({
                            qualificationId: q.id,
                            status: "verified",
                          })
                        }
                      >
                        <Button size="sm">Verify</Button>
                      </ConfirmAction>
                      <ConfirmAction
                        title="Reject qualification"
                        description="Reject this qualification"
                        confirmLabel="Reject"
                        onConfirm={() =>
                          verifyQual.mutate({
                            qualificationId: q.id,
                            status: "rejected",
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
            ) : (
              <div className="text-sm text-muted-foreground">
                No qualifications
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Educations</CardTitle>
          </CardHeader>
          <CardContent>
            {edQuery.data && edQuery.data.length > 0 ? (
              <ul className="space-y-3">
                {edQuery.data.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm">{e.institution_name}</div>
                      <div className="text-xs text-muted-foreground">
                        Tutor:{" "}
                        <Link
                          className="underline"
                          href={`/admin/tutors/${e.tutorId}`}
                        >
                          {e.tutorId}
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant={e.is_verified ? "default" : "secondary"}>
                        {e.is_verified ? "Verified" : "Unverified"}
                      </Badge>
                      <ConfirmAction
                        title={
                          e.is_verified
                            ? "Unverify education"
                            : "Verify education"
                        }
                        description="Toggle education verification"
                        confirmLabel={e.is_verified ? "Unverify" : "Verify"}
                        onConfirm={() =>
                          verifyEdu.mutate({
                            educationId: e.id,
                            is_verified: !e.is_verified,
                          })
                        }
                      >
                        <Button size="sm">
                          {e.is_verified ? "Unverify" : "Verify"}
                        </Button>
                      </ConfirmAction>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">No educations</div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
