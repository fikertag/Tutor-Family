"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useTutorQualifications,
  useCreateQualification,
  useUpdateQualification,
  useDeleteQualification,
} from "@/hooks/useTutors";
import type { Qualification } from "@/types/api";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Qualifications() {
  const { data: qualifications, isLoading } = useTutorQualifications();
  const createQ = useCreateQualification();
  const updateQ = useUpdateQualification();
  const deleteQ = useDeleteQualification();
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, Partial<Qualification>>>(
    {}
  );
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState<Omit<Qualification, "id">>({
    certificate_name: "",
    issuing_organization: "",
    issue_date: "",
    credential_id: "",
  });

  // Seed drafts for items that are currently being edited when data arrives
  useEffect(() => {
    if (!qualifications) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const q of qualifications) {
        if (editingIds.has(q.id) && !next[q.id]) next[q.id] = { ...q };
      }
      return next;
    });
  }, [qualifications, editingIds]);

  function handleChange(id: string, field: keyof Qualification, value: string) {
    setDrafts((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  function handleSave(id: string) {
    const data = drafts[id];
    if (!data) return;
    updateQ.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Qualification updated");
          cancelEdit(id);
        },
        onError: () => toast.error("Failed to update qualification"),
      }
    );
  }

  function openAddForm() {
    setShowAdd(true);
    setNewDraft({
      certificate_name: "",
      issuing_organization: "",
      issue_date: "",
      credential_id: "",
    });
  }

  function handleAddChange(
    field: keyof Omit<Qualification, "id">,
    value: string
  ) {
    setNewDraft((p) => ({ ...p, [field]: value }) as Omit<Qualification, "id">);
  }

  function handleCreate() {
    createQ.mutate(newDraft, {
      onSuccess: () => {
        setShowAdd(false);
        setNewDraft({
          certificate_name: "",
          issuing_organization: "",
          issue_date: "",
          credential_id: "",
        });
        toast.success("Qualification created");
      },
      onError: () => toast.error("Failed to create qualification"),
    });
  }

  function startEdit(q: Qualification) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.add(q.id);
      return s;
    });
    setDrafts((p) => ({ ...p, [q.id]: { ...q } }));
  }

  function cancelEdit(id: string) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
    setDrafts((p) => {
      const { [id]: _omit, ...rest } = p;
      return rest;
    });
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Qualifications</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={openAddForm}>
            <IconPlus size={16} /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        <div className="space-y-4">
          {showAdd && (
            <div className="rounded-md border p-3">
              <div className="mb-2 text-sm font-medium">Add qualification</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label>Certificate name</Label>
                  <Input
                    value={newDraft.certificate_name}
                    onChange={(e) =>
                      handleAddChange("certificate_name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Organization</Label>
                  <Input
                    value={newDraft.issuing_organization}
                    onChange={(e) =>
                      handleAddChange("issuing_organization", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Issue date</Label>
                  <Input
                    type="date"
                    value={newDraft.issue_date}
                    onChange={(e) =>
                      handleAddChange("issue_date", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Credential ID</Label>
                  <Input
                    value={newDraft.credential_id}
                    onChange={(e) =>
                      handleAddChange("credential_id", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={createQ.isPending}
                >
                  <IconDeviceFloppy size={16} /> Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAdd(false)}
                  disabled={createQ.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {(qualifications || []).map((q) => {
            const isEditing = editingIds.has(q.id);
            if (!isEditing) {
              return (
                <div key={q.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        {q.certificate_name || "(Untitled)"}
                      </div>
                      <div className="text-xs text-gray-600">
                        {q.issuing_organization || "—"} • {q.issue_date || "—"}
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(q)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={q.id} className="rounded-md border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <Label>Certificate name</Label>
                    <Input
                      value={(drafts[q.id]?.certificate_name as string) ?? ""}
                      onChange={(e) =>
                        handleChange(q.id, "certificate_name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Organization</Label>
                    <Input
                      value={
                        (drafts[q.id]?.issuing_organization as string) ?? ""
                      }
                      onChange={(e) =>
                        handleChange(
                          q.id,
                          "issuing_organization",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Issue date</Label>
                    <Input
                      type="date"
                      value={(drafts[q.id]?.issue_date as string) ?? ""}
                      onChange={(e) =>
                        handleChange(q.id, "issue_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Credential ID</Label>
                    <Input
                      value={(drafts[q.id]?.credential_id as string) ?? ""}
                      onChange={(e) =>
                        handleChange(q.id, "credential_id", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" onClick={() => handleSave(q.id)}>
                    <IconDeviceFloppy size={16} /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelEdit(q.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => deleteQ.mutate(q.id)}
                  >
                    <IconTrash size={16} /> Delete
                  </Button>
                </div>
              </div>
            );
          })}

          {!isLoading && (qualifications || []).length === 0 && (
            <div className="text-sm text-gray-500">No qualifications yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
