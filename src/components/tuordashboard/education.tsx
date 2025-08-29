"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useTutorEducations,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from "@/hooks/useTutors";
import type { Education as EducationType } from "@/types/api";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Education() {
  const { data: educations, isLoading } = useTutorEducations();
  const createEd = useCreateEducation();
  const updateEd = useUpdateEducation();
  const deleteEd = useDeleteEducation();
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, Partial<EducationType>>>(
    {}
  );
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState<Omit<EducationType, "id">>({
    institution_name: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    is_verified: false,
  });
  const formatDateDisplay = (d?: string | null) => {
    if (!d) return "—";
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return d.slice(0, 10);
      return dt.toLocaleDateString();
    } catch (e) {
      return d.slice(0, 10);
      console.log(e);
    }
  };

  // Seed drafts for any items that enter edit mode when data (re)loads
  useEffect(() => {
    if (!educations) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const ed of educations) {
        if (editingIds.has(ed.id) && !next[ed.id]) next[ed.id] = { ...ed };
      }
      return next;
    });
  }, [educations, editingIds]);

  function startEdit(ed: EducationType) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.add(ed.id);
      return s;
    });
    setDrafts((p) => ({ ...p, [ed.id]: { ...ed } }));
  }

  function cancelEdit(id: string) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
    setDrafts((p) => {
      const { ...rest } = p;
      return rest;
    });
  }

  function handleChange(
    id: string,
    field: keyof EducationType,
    value: string | boolean
  ) {
    setDrafts((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  function handleSave(id: string) {
    const data = drafts[id];
    if (!data) return;
    updateEd.mutate(
      { id, data },
      {
        onSuccess: () => {
          cancelEdit(id);
        },
      }
    );
  }

  function openAddForm() {
    setShowAdd(true);
    setNewDraft({
      institution_name: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      end_date: "",
      is_verified: false,
    });
  }

  function handleAddChange(
    field: keyof Omit<EducationType, "id">,
    value: string | boolean
  ) {
    setNewDraft((p) => ({ ...p, [field]: value }) as Omit<EducationType, "id">);
  }

  function handleCreate() {
    createEd.mutate(newDraft, {
      onSuccess: () => {
        setShowAdd(false);
        setNewDraft({
          institution_name: "",
          degree: "",
          field_of_study: "",
          start_date: "",
          end_date: "",
          is_verified: false,
        });
      },
    });
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Education</CardTitle>
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
              <div className="mb-2 text-sm font-medium">Add education</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label className="mb-1.5">Institution</Label>
                  <Input
                    value={newDraft.institution_name}
                    onChange={(e) =>
                      handleAddChange("institution_name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="mb-1.5">Title</Label>
                  <Input
                    value={newDraft.degree}
                    onChange={(e) => handleAddChange("degree", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-1.5">Field of study</Label>
                  <Input
                    value={newDraft.field_of_study}
                    onChange={(e) =>
                      handleAddChange("field_of_study", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="mb-1.5">Start date</Label>
                  <Input
                    type="date"
                    value={newDraft.start_date}
                    onChange={(e) =>
                      handleAddChange("start_date", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="mb-1.5">End date</Label>
                  <Input
                    type="date"
                    value={newDraft.end_date}
                    onChange={(e) =>
                      handleAddChange("end_date", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={createEd.isPending}
                >
                  <IconDeviceFloppy size={16} /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdd(false)}
                  disabled={createEd.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {(educations || []).map((ed) => {
            const isEditing = editingIds.has(ed.id);
            if (!isEditing) {
              return (
                <div key={ed.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        {ed.degree} • {ed.institution_name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {ed.field_of_study} • {formatDateDisplay(ed.start_date)}{" "}
                        → {formatDateDisplay(ed.end_date)}
                      </div>
                      <div className="mt-1 text-xs">
                        Verified: {ed.is_verified ? "Yes" : "No"}
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(ed)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={ed.id} className="rounded-md border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={(drafts[ed.id]?.institution_name as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ed.id, "institution_name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={(drafts[ed.id]?.degree as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ed.id, "degree", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Field of study</Label>
                    <Input
                      value={(drafts[ed.id]?.field_of_study as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ed.id, "field_of_study", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Start date</Label>
                    <Input
                      type="date"
                      value={(drafts[ed.id]?.start_date as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ed.id, "start_date", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>End date</Label>
                    <Input
                      type="date"
                      value={(drafts[ed.id]?.end_date as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ed.id, "end_date", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" onClick={() => handleSave(ed.id)}>
                    <IconDeviceFloppy size={16} /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelEdit(ed.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => deleteEd.mutate(ed.id)}
                  >
                    <IconTrash size={16} /> Delete
                  </Button>
                </div>
              </div>
            );
          })}

          {!isLoading && (educations || []).length === 0 && (
            <div className="text-sm text-gray-500">No education yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
