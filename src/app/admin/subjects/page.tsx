"use client";

import React, { useState } from "react";
import {
  useAllSubjects,
  useAddSubject,
  useDeleteSubject,
} from "@/hooks/useTutors";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  const { data: subjects, isLoading, isError, refetch } = useAllSubjects();
  const add = useAddSubject();
  const del = useDeleteSubject();
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await add.mutateAsync({ name: name.trim() });
      setName("");
      refetch();
    } catch (e) {
      // hook shows toast on error
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subject?")) return;
    setDeletingId(id);
    try {
      await del.mutateAsync(id);
      refetch();
    } catch (e) {
      // hook will surface errors
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <SiteHeader
        title="Unverified items"
        description="Review and verify pending items"
      />

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Subjects</h1>

        <div className="mb-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New subject name"
            className="border px-3 py-1 rounded w-64"
          />
          <button
            onClick={handleCreate}
            disabled={creating}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>

        {isLoading ? (
          <div>Loading subjects…</div>
        ) : isError ? (
          <div className="text-red-600">Failed to load subjects</div>
        ) : (
          <ul className="space-y-2">
            {subjects?.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between border rounded p-2"
              >
                <span>{s.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deletingId === s.id}
                    className="px-2 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                  >
                    {deletingId === s.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
