"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useVerificationDocs,
  useCreateVerificationDoc,
  useUpdateVerificationDoc,
  useDeleteVerificationDoc,
} from "@/hooks/useTutors";
import { IconPlus, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

export default function Verification() {
  const { data: docs, isLoading } = useVerificationDocs();
  const create = useCreateVerificationDoc();
  const update = useUpdateVerificationDoc();
  const remove = useDeleteVerificationDoc();

  const [showAdd, setShowAdd] = useState(false);
  const [newNational, setNewNational] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [edits, setEdits] = useState<{
    national_id?: string;
    country_name?: string;
    file?: File | null;
  }>({});

  useEffect(() => {
    if (!docs) return;
    // docs is a single object (not an array)
    setEdits({
      national_id: (docs as any).national_id,
      country_name: (docs as any).country_name,
      file: null,
    });
  }, [docs]);

  function handleCreate() {
    if (!newFile) return alert("Please attach an ID photo");
    create.mutate(
      { idPhoto: newFile, national_id: newNational, country_name: newCountry },
      {
        onSuccess: () => {
          setShowAdd(false);
          setNewCountry("");
          setNewNational("");
          setNewFile(null);
        },
      }
    );
  }

  function startEdit() {
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleUpdate() {
    const dataOnly: any = { ...(edits || {}) };
    update.mutate(dataOnly, {
      onSuccess: () => setIsEditing(false),
    });
  }

  function handleDelete() {
    if (!confirm("Delete this verification document?")) return;
    remove.mutate();
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Verification documents</CardTitle>
        <div>
          {showAdd ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdd(true)}
            >
              <IconPlus size={14} /> Add
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}

        {showAdd && (
          <div className="rounded-md border p-3 mb-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <Label>National ID</Label>
                <Input
                  value={newNational}
                  onChange={(e) => setNewNational(e.target.value)}
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                />
              </div>
              <div>
                <Label>ID Photo (image)</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
                  className="mt-1 text-sm"
                />
                {newFile && (
                  <div className="text-sm text-gray-600 mt-1">
                    {newFile.name}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <Button
                size="sm"
                onClick={handleCreate}
                disabled={create.isPending}
              >
                <IconDeviceFloppy size={14} /> Save
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {docs ? (
            <div className="rounded-md border p-3 flex items-start justify-between">
              <div>
                <div className="font-medium">
                  {(docs as any).national_id || "–"}
                </div>
                <div className="text-sm text-gray-600">
                  {(docs as any).country_name || "–"}
                </div>
                {((docs as any).idPhoto_cloudinary_id ||
                  (docs as any).id_photo_cloudinary_id) && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${(docs as any).idPhoto_cloudinary_id || (docs as any).id_photo_cloudinary_id}`}
                    alt="ID"
                    className="mt-2 h-24 w-32 rounded object-cover border"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                {!isEditing ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={startEdit}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      <IconTrash />
                    </Button>
                  </>
                ) : (
                  <div className="w-full">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div>
                        <Label>National ID</Label>
                        <Input
                          value={edits.national_id ?? ""}
                          onChange={(e) =>
                            setEdits((p) => ({
                              ...p,
                              national_id: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Input
                          value={edits.country_name ?? ""}
                          onChange={(e) =>
                            setEdits((p) => ({
                              ...p,
                              country_name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Replace ID Photo</Label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setEdits((p) => ({
                              ...p,
                              file: e.target.files?.[0] ?? null,
                            }))
                          }
                          className="mt-1 text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={update.isPending}
                      >
                        <IconDeviceFloppy size={14} /> Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No verification documents
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
