"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  useVerificationDocs,
  useCreateVerificationDoc,
  useUpdateVerificationDoc,
  useDeleteVerificationDoc,
} from "@/hooks/useTutors";
import { IconPlus, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import Example from "@/components/rectangleimage";

export default function Verification() {
  const { data: docs, isLoading } = useVerificationDocs();
  const create = useCreateVerificationDoc();
  const update = useUpdateVerificationDoc();
  const remove = useDeleteVerificationDoc();

  const [showAdd, setShowAdd] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [edits, setEdits] = useState<{ file?: File | null }>({});

  useEffect(() => {
    if (!docs) return;
    // docs is a single object (not an array) - seed edit fields so inputs are controlled
    setEdits({ file: null });
  }, [docs]);

  // prefer explicit optional chaining instead of casting to `any`
  const idCloudinaryId = docs?.id_photo_cloudinary_id ?? null;

  const hasDoc = Boolean(idCloudinaryId);

  function handleCreate() {
    if (!newFile) return alert("Please attach an ID photo");
    // include national_id and country_name to satisfy the mutation's typed payload
    create.mutate(
      {
        idPhoto: newFile,
      },
      {
        onSuccess: () => {
          setShowAdd(false);
          setNewFile(null);
        },
      }
    );
  }

  // function startEdit() {
  //   setIsEditing(true);
  // }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleUpdate() {
    const input: Partial<import("@/types/api").TutorVerification> & {
      idPhoto?: File | null;
    } = {};
    if (edits.file) input.idPhoto = edits.file;
    // only send file when provided
    update.mutate(input, {
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <Label className="mb-1.5">ID Photo (image)</Label>
                <Example onFileSelected={setNewFile} />
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
          {hasDoc ? (
            <div className="rounded-md border p-3 flex items-start justify-between">
              <div>
                {docs?.id_photo_cloudinary_id && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${docs?.id_photo_cloudinary_id}`}
                    alt="ID"
                    height={96}
                    width={128}
                    className="mt-2 rounded object-cover border"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                {!isEditing ? (
                  <>
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
                        <Label className="mb-1.5">Replace ID Photo</Label>
                        <Example
                          onFileSelected={(f) =>
                            setEdits((p) => ({ ...p, file: f }))
                          }
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
            <div className="text-sm text-gray-500"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
