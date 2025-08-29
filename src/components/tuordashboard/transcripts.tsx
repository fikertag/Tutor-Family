"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useTutorTranscripts,
  useCreateTranscript,
  useDeleteTranscript,
} from "@/hooks/useTutors";
import { IconTrash } from "@tabler/icons-react";
import Example from "@/components/rectangleimage";
import Image from "next/image";

export default function Transcripts() {
  const { data: transcripts, isLoading } = useTutorTranscripts();
  const createTr = useCreateTranscript();
  const deleteTr = useDeleteTranscript();
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  function handleUpload() {
    if (!file) return toast.error("Pick a file first");
    const fd = new FormData();
    fd.append("transcriptDoc", file);
    createTr.mutate(fd, {
      onSuccess: () => {
        setFile(null);
        setEditing(false);
      },
    });
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Transcripts</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setEditing((v) => !v)}>
            {editing ? "Close" : "Add"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editing && (
          <ul className="space-y-2">
            {(transcripts || []).map((tr) => (
              <li
                key={tr.id}
                className="flex items-center justify-between rounded-md border p-2 text-sm"
              >
                <Image
                  height={130}
                  width={130}
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_SHORT}/${tr.transcript_doc_cloudinary_id}`}
                  alt="Transcript"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                  onClick={() => deleteTr.mutate(tr.id)}
                >
                  <IconTrash size={16} /> Delete
                </Button>
              </li>
            ))}
            {!isLoading && (transcripts || []).length === 0 && (
              <div className="text-sm text-gray-500">
                No transcripts uploaded
              </div>
            )}
          </ul>
        )}
        {editing && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Example onFileSelected={setFile} />
              <Button onClick={handleUpload}>Save</Button>
            </div>
            {file && <div className="text-sm text-gray-600">{file.name}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
