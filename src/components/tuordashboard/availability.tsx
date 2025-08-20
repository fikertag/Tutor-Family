"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useTutorAvailabilities,
  useCreateAvailability,
  useUpdateAvailability,
  useDeleteAvailability,
} from "@/hooks/useTutors";
import type { Availability as AvailabilityType } from "@/types/api";
import { IconDeviceFloppy, IconPlus, IconTrash } from "@tabler/icons-react";

export default function Availability() {
  const { data: availabilities, isLoading } = useTutorAvailabilities();
  const createAv = useCreateAvailability();
  const updateAv = useUpdateAvailability();
  const deleteAv = useDeleteAvailability();
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<
    Record<string, Partial<AvailabilityType>>
  >({});
  const [showAdd, setShowAdd] = useState(false);
  const [newDraft, setNewDraft] = useState<Omit<AvailabilityType, "id">>({
    weekday: "",
    time: "",
  });

  // Seed drafts for items in edit mode when data loads
  useEffect(() => {
    if (!availabilities) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const av of availabilities) {
        if (editingIds.has(av.id) && !next[av.id]) next[av.id] = { ...av };
      }
      return next;
    });
  }, [availabilities, editingIds]);

  function startEdit(av: AvailabilityType) {
    setEditingIds((prev) => {
      const s = new Set(prev);
      s.add(av.id);
      return s;
    });
    setDrafts((p) => ({ ...p, [av.id]: { ...av } }));
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

  function handleChange(
    id: string,
    field: keyof AvailabilityType,
    value: string
  ) {
    setDrafts((p) => ({ ...p, [id]: { ...p[id], [field]: value } }));
  }

  function handleSave(id: string) {
    const data = drafts[id];
    if (!data) return;
    updateAv.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Availability updated");
          cancelEdit(id);
        },
        onError: () => toast.error("Failed to update availability"),
      }
    );
  }

  function openAddForm() {
    setShowAdd(true);
    setNewDraft({ weekday: "", time: "" });
  }

  function handleCreate() {
    createAv.mutate(newDraft, {
      onSuccess: () => {
        setShowAdd(false);
        setNewDraft({ weekday: "", time: "" });
        toast.success("Availability added");
      },
      onError: () => toast.error("Failed to add availability"),
    });
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Availability</CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={openAddForm}>
            <IconPlus size={16} /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        <div className="space-y-3">
          {showAdd && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 rounded-md border p-3">
              <div>
                <Label>Weekday</Label>
                <Input
                  value={newDraft.weekday}
                  onChange={(e) =>
                    setNewDraft((p) => ({ ...p, weekday: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  value={newDraft.time}
                  onChange={(e) =>
                    setNewDraft((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-end gap-2">
                <Button
                  size="sm"
                  onClick={handleCreate}
                  disabled={createAv.isPending}
                >
                  <IconDeviceFloppy size={16} /> Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAdd(false)}
                  disabled={createAv.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {(availabilities || []).map((av) => {
            const isEditing = editingIds.has(av.id);
            if (!isEditing) {
              return (
                <div
                  key={av.id}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    {av.weekday} • {av.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(av)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => deleteAv.mutate(av.id)}
                    >
                      <IconTrash size={16} /> Delete
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={av.id}
                className="grid grid-cols-1 gap-3 md:grid-cols-3 rounded-md border p-3"
              >
                <div>
                  <Label>Weekday</Label>
                  <Input
                    value={(drafts[av.id]?.weekday as string) ?? ""}
                    onChange={(e) =>
                      handleChange(av.id, "weekday", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    value={(drafts[av.id]?.time as string) ?? ""}
                    onChange={(e) =>
                      handleChange(av.id, "time", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button size="sm" onClick={() => handleSave(av.id)}>
                    <IconDeviceFloppy size={16} /> Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelEdit(av.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            );
          })}

          {!isLoading && (availabilities || []).length === 0 && (
            <div className="text-sm text-gray-500">No availability set</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
