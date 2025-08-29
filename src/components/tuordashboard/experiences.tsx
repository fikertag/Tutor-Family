"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useTutorExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "@/hooks/useTutors";
import type { Experience } from "@/types/api";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Experiences() {
  const { data: experiences, isLoading } = useTutorExperiences();
  const createExp = useCreateExperience();
  const updateExp = useUpdateExperience();
  const deleteExp = useDeleteExperience();

  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, Partial<Experience>>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState<Omit<Experience, "id">>({
    company: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
  });

  // Seed drafts for currently edited items if they arrive/refetch
  useEffect(() => {
    if (!experiences) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const ex of experiences) {
        if (editingIds.has(ex.id) && !next[ex.id]) {
          // normalize date strings for date inputs (YYYY-MM-DD)
          const toInputDate = (d?: string | null) => {
            if (!d) return "";
            try {
              const dt = new Date(d);
              if (isNaN(dt.getTime())) return d.slice(0, 10);
              return dt.toISOString().slice(0, 10);
            } catch {
              return d.slice(0, 10);
            }
          };

          next[ex.id] = {
            ...ex,
            start_date: toInputDate(ex.start_date as string | undefined),
            end_date: toInputDate(ex.end_date as string | undefined),
          } as Partial<Experience>;
        }
      }
      return next;
    });
  }, [experiences, editingIds]);

  // helper to present a readable date for display
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

  function startEdit(ex: Experience) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.add(ex.id);
      return s;
    });
    setDrafts((p) => ({ ...p, [ex.id]: { ...ex } }));
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
    field: keyof Experience,
    value: string | boolean
  ) {
    setDrafts((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  function handleSave(id: string) {
    const data = drafts[id];
    if (!data) return;
    updateExp.mutate(
      { id, data },
      {
        onSuccess: () => {
          cancelEdit(id);
        },
      }
    );
  }

  function handleAdd() {
    setShowAdd(true);
    setNewDraft({
      company: "",
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      is_current: false,
    });
  }

  function handleAddChange(
    field: keyof Omit<Experience, "id">,
    value: string | boolean
  ) {
    setNewDraft((p) => ({ ...p, [field]: value }) as Omit<Experience, "id">);
  }

  function handleCreate() {
    createExp.mutate(newDraft, {
      onSuccess: () => {
        setShowAdd(false);
        setNewDraft({
          company: "",
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          is_current: false,
        });
      },
    });
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Experiences</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleAdd}>
            <IconPlus size={16} /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        <div className="space-y-4">
          {showAdd && (
            <div className="rounded-md border p-3">
              <div className="mb-2 font-medium text-sm">Add new experience</div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <Label className="mb-1.5">Title</Label>
                  <Input
                    value={newDraft.title}
                    onChange={(e) => handleAddChange("title", e.target.value)}
                    placeholder="Degree, diploma, grade 12"
                  />
                </div>
                <div>
                  <Label className="mb-1.5">Insttition</Label>
                  <Input
                    value={newDraft.company}
                    onChange={(e) => handleAddChange("company", e.target.value)}
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
                <div className="md:col-span-2">
                  <Label className="mb-1.5">Description</Label>
                  <Textarea
                    value={newDraft.description}
                    onChange={(e) =>
                      handleAddChange("description", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id={`current-new`}
                    type="checkbox"
                    checked={Boolean(newDraft.is_current)}
                    onChange={(e) =>
                      handleAddChange("is_current", e.target.checked)
                    }
                  />
                  <label
                    htmlFor={`current-new`}
                    className="text-sm text-gray-700"
                  >
                    Current role
                  </label>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={createExp.isPending}
                >
                  <IconDeviceFloppy size={16} /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdd(false)}
                  disabled={createExp.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {(experiences || []).map((ex) => {
            const isEditing = editingIds.has(ex.id);
            if (!isEditing) {
              return (
                <div key={ex.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">
                        {ex.title || "(Untitled)"}
                      </div>
                      <div className="text-xs text-gray-600">
                        {ex.company || "—"} • {formatDateDisplay(ex.start_date)}{" "}
                        →{" "}
                        {ex.is_current
                          ? "Present"
                          : formatDateDisplay(ex.end_date)}
                      </div>
                      {ex.description && (
                        <div className="mt-1 text-sm text-gray-700">
                          {ex.description}
                        </div>
                      )}
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEdit(ex)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={ex.id} className="rounded-md border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <Label className="mb-1.5">Title</Label>
                    <Input
                      value={(drafts[ex.id]?.title as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ex.id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5">Institution</Label>
                    <Input
                      value={(drafts[ex.id]?.company as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ex.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5">Start date</Label>
                    <Input
                      type="date"
                      value={(drafts[ex.id]?.start_date as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ex.id, "start_date", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5">End date</Label>
                    <Input
                      type="date"
                      value={(drafts[ex.id]?.end_date as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ex.id, "end_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-1.5">Description</Label>
                    <Textarea
                      value={(drafts[ex.id]?.description as string) ?? ""}
                      onChange={(e) =>
                        handleChange(ex.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id={`current-${ex.id}`}
                      type="checkbox"
                      checked={Boolean(drafts[ex.id]?.is_current)}
                      onChange={(e) =>
                        handleChange(ex.id, "is_current", e.target.checked)
                      }
                    />
                    <label
                      htmlFor={`current-${ex.id}`}
                      className="text-sm text-gray-700"
                    >
                      Current role
                    </label>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" onClick={() => handleSave(ex.id)}>
                    <IconDeviceFloppy size={16} /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelEdit(ex.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => deleteExp.mutate(ex.id)}
                  >
                    <IconTrash size={16} /> Delete
                  </Button>
                </div>
              </div>
            );
          })}

          {!isLoading && (experiences || []).length === 0 && (
            <div className="text-sm text-gray-500">No experiences yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
