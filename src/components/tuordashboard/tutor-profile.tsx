"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTutorProfile, useUpdateProfile } from "@/hooks/useTutors";
import type { TutorProfile as TutorProfileType } from "@/types/api";

export default function TutorProfile() {
  const { data: tutor, isLoading, isError } = useTutorProfile();
  const update = useUpdateProfile();
  const [file, setFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<TutorProfileType>>({
    years_of_experience: undefined,
    monthly_rate: undefined,
    location: "",
    bio: "",
    languages: "",
    // coverLetter: "",
  });

  useEffect(() => {
    if (tutor && editing) {
      setForm({
        years_of_experience: tutor.years_of_experience,
        monthly_rate: tutor.monthly_rate,
        location: tutor.location,
        bio: tutor.bio,
        languages: tutor.languages,
        // coverLetter: tutor.coverLetter,
      });
    }
  }, [tutor, editing]);

  function handleSave() {
    // Build a payload that matches the API: most fields come from `form` (which
    // stores the server's string IDs for files), but when the user uploads a
    // new file we must send an actual File under `coverLetter`.
    type UpdatePayload = Partial<
      Omit<TutorProfileType, "id" | "coverLetter">
    > & {
      coverLetter?: File | null;
    };

    // Exclude any existing coverLetter (string id) from `form` when building
    // the payload so we don't assign a string into the File-typed field.
    const { coverLetter: _coverLetter, ...rest } =
      form as Partial<TutorProfileType>;

    const payload: UpdatePayload = { ...rest };
    if (file) payload.coverLetter = file;

    update.mutate(payload, {
      onSuccess: () => {
        setEditing(false);
        if (file) setFile(null);
      },
    });
  }

  // function handleSave() {
  //   const payload: any = { ...form };
  //   if (file) payload.coverLetter = file;

  //   update.mutate(payload, {
  //     onSuccess: () => {
  //       setEditing(false);
  //       if (file) setFile(null);
  //     },
  //   });
  // }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Tutor Profile</CardTitle>
        <div className="flex items-center gap-2">
          {editing && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          )}
          {!editing && (
            <Button size="sm" onClick={() => setEditing((v) => !v)}>
              Edit
            </Button>
          )}
          {editing && (
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {isError && (
          <div className="text-sm text-red-600">Failed to load profile</div>
        )}
        {!editing && !isLoading && (
          <div className="divide-y">
            <div className="py-2 text-sm">
              Years of experience:{" "}
              {tutor?.years_of_experience ? tutor.years_of_experience : "-"}
            </div>
            <div className="py-2 text-sm">
              Monthly rate: {tutor?.monthly_rate ?? "—"}
            </div>
            <div className="py-2 text-sm">
              Location: {tutor?.location ?? "—"}
            </div>
            <div className="py-2 text-sm">Bio: {tutor?.bio ?? "—"}</div>

            <div className="py-2 text-sm">
              Languages: {tutor?.languages ?? "—"}
            </div>
            {/* <div className="py-2 text-sm">
              Cover letter:{" "}
              {tutor?.coverLetter ? (
                <a
                  href={
                    process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT +
                    "/" +
                    tutor.coverLetter
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  View cover letter
                </a>
              ) : (
                "—"
              )}
            </div> */}
          </div>
        )}
        {editing && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <Label className="mb-1.5">Years of experience</Label>
              <Input
                type="number"
                value={form.years_of_experience ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    years_of_experience: Number(e.target.value || 0),
                  }))
                }
              />
            </div>
            <div>
              <Label className="mb-1.5">Monthly rate</Label>
              <Input
                type="number"
                value={form.monthly_rate ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    monthly_rate: Number(e.target.value || 0),
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1.5">Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1.5">Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bio: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-1.5">Languages</Label>
              <Input
                value={form.languages}
                onChange={(e) =>
                  setForm((p) => ({ ...p, languages: e.target.value }))
                }
              />
            </div>
            {/* <div className="md:col-span-2">
              <Label>Cover letter (PDF)</Label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 text-sm"
              />
              {file && (
                <div className="text-sm text-gray-600 mt-1">{file.name}</div>
              )}
            </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
