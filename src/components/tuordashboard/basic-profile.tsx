"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTutorBasicProfile, useUpdateBasicProfile } from "@/hooks/useTutors";
import type { BasicProfile, BasicProfileUpdateInput } from "@/types/api";
import Example from "../imageUpload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function BasicProfile() {
  const { data: basic, isLoading } = useTutorBasicProfile();
  const updateBasic = useUpdateBasicProfile();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState<Partial<BasicProfile>>({
    first_name: "",
    last_name: "",
    gender: "OTHER",
    phone: "",
    profile_picture_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function buildImageUrl(path?: string | null) {
    if (!path) return null;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${path}`;
  }

  useEffect(() => {
    if (basic && editing) {
      setForm({
        first_name: basic.first_name,
        last_name: basic.last_name,
        gender: basic.gender ?? "OTHER",
        phone: basic.phone ?? "",
        profile_picture_url: basic.profile_picture_url ?? "",
      });
      // show current profile picture in the edit form just like view mode
      setPreview(
        buildImageUrl(
          basic.profile_picture_url ?? basic.profile_picture_url ?? null
        )
      );
    }
  }, [basic, editing]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  function handleSave() {
    const { first_name, last_name, gender, phone } = form;
    const payload: BasicProfileUpdateInput = {
      first_name,
      last_name,
      gender,
      phone,
    };

    if (file) payload.profilePicture = file;

    updateBasic.mutate(payload, {
      onSuccess: () => {
        setEditing(false);
        if (file) setFile(null);
      },
    });
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Basic Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex-1 gap-3">
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Basic Profile</CardTitle>
        <div className="flex items-center gap-2">
          {editing && (
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          )}
          {!editing && (
            <Button size="sm" onClick={() => setEditing((v) => !v)}>
              Edit
            </Button>
          )}
          {editing && (
            <Button
              size="sm"
              onClick={handleSave}
              disabled={updateBasic.isPending}
            >
              {updateBasic.isPending ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              {basic?.profile_picture_url ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${basic.profile_picture_url}`}
                  alt="Profile"
                  height={64}
                  width={64}
                  className="mt-1 rounded-full object-cover bg-gray-100"
                />
              ) : (
                <div className="mt-1 h-16 w-16 rounded-full bg-gray-100" />
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-2 divide-y">
              <div className="flex gap-2 items-center">
                <Label>First name:</Label>
                <div className="mt-1 text-sm">{basic?.first_name ?? "—"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Last name:</Label>
                <div className="mt-1 text-sm">{basic?.last_name ?? "—"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Email</Label>
                <div className="mt-1 text-sm">{basic?.email ?? "—"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Gender:</Label>
                <div className="mt-1 text-sm">{basic?.gender ?? "—"}</div>
              </div>
              <div className="flex gap-2 items-center">
                <Label>Phone:</Label>
                <div className="mt-1 text-sm">{basic?.phone ?? "—"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="md:col-span-2 flex items-center gap-3">
              {/* show selected preview or existing profile picture when editing */}
              {(preview || basic?.profile_picture_url) && (
                <Image
                  src={
                    preview
                      ? preview
                      : `${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${basic?.profile_picture_url}`
                  }
                  alt="Profile preview"
                  width={50}
                  height={50}
                  className="h-16 w-16 rounded-full object-cover bg-gray-100"
                />
              )}
              <Example onFileSelected={(f) => setFile(f)} />
            </div>
            <div>
              <Label className="mb-1.5">First name</Label>
              <Input
                value={form.first_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, first_name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label className="mb-1.5">Last name</Label>
              <Input
                value={form.last_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, last_name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label className="mb-1.5">Gender</Label>
              <Select
                value={form.gender}
                onValueChange={(v: string) =>
                  setForm((p) => ({
                    ...p,
                    gender: v as BasicProfile["gender"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genders</SelectLabel>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5">Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
