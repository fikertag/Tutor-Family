"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTutorBasicProfile, useUpdateBasicProfile } from "@/hooks/useTutors";
import type { BasicProfile, BasicProfileUpdateInput } from "@/types/api";

export default function BasicProfile() {
  const { data: basic } = useTutorBasicProfile();

  const updateBasic = useUpdateBasicProfile();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BasicProfile>({
    first_name: "",
    last_name: "",
    gender: "OTHER",
    phone: "",
    profilePicture: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (basic && editing) {
      setForm({
        first_name: basic.first_name,
        last_name: basic.last_name,
        gender: basic.gender,
        phone: basic.phone ?? "",
        profilePicture: basic.profilePicture ?? "",
      });
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
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!editing ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <Label className="text-xs text-gray-600">Profile picture</Label>
              {basic?.profile_picture_url ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${basic.profile_picture_url}`}
                  alt="Profile"
                  className="mt-1 h-16 w-16 rounded-full object-cover bg-gray-100"
                />
              ) : (
                <div className="mt-1 h-16 w-16 rounded-full bg-gray-100" />
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <Label>First name</Label>
                <div className="mt-1 text-sm">{basic?.first_name ?? "—"}</div>
              </div>
              <div>
                <Label>Last name</Label>
                <div className="mt-1 text-sm">{basic?.last_name ?? "—"}</div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="mt-1 text-sm">{basic?.email ?? "—"}</div>
              </div>
              <div>
                <Label>Gender</Label>
                <div className="mt-1 text-sm">{basic?.gender ?? "—"}</div>
              </div>
              <div>
                <Label>Phone</Label>
                <div className="mt-1 text-sm">{basic?.phone ?? "—"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="md:col-span-2 flex items-center gap-3">
              <img
                src={preview ?? basic?.profilePicture ?? ""}
                alt="Profile preview"
                className="h-16 w-16 rounded-full object-cover bg-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.visibility = "hidden";
                }}
              />
              <div>
                <Label className="text-xs text-gray-600">Profile picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>
            <div>
              <Label>First name</Label>
              <Input
                value={form.first_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, first_name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Last name</Label>
              <Input
                value={form.last_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, last_name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Gender</Label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={form.gender}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    gender: e.target.value as BasicProfile["gender"],
                  }))
                }
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <Label>Phone</Label>
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
