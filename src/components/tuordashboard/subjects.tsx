"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  useTutorProfile,
  useTutorSubjects,
  useAddTutorSubject,
  useDeleteTutorSubject,
  useAllSubjects,
} from "@/hooks/useTutors";

export default function Subjects() {
  const { data: tutor } = useTutorProfile();
  const { data: allSubjects } = useAllSubjects();
  const tutorId = tutor ? tutor.tutor_id : undefined;
  const { data: subjects, isLoading } = useTutorSubjects();
  const add = useAddTutorSubject();
  const del = useDeleteTutorSubject(tutorId ?? "");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<{ subjectId: string; gradesCsv: string }>({
    subjectId: "",
    gradesCsv: "",
  });

  function handleAdd() {
    const grades = form.gradesCsv
      .split(",")
      .map((g) => g.trim())
      .filter((g) => !!g);
    add.mutate(
      { subjectId: form.subjectId, grades },
      {
        onSuccess: () => setForm({ subjectId: "", gradesCsv: "" }),
      }
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Subjects</CardTitle>
        <div className="flex items-center gap-2">
          {editing && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          )}
          <Button size="sm" onClick={() => setEditing((v) => !v)}>
            {editing ? "Close" : "add"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editing && (
          <ul className="space-y-2">
            {(subjects || []).map((ts) => (
              <li
                key={ts.tutor_subject_id}
                className="rounded-md border p-2 text-sm"
              >
                {ts.subject?.name || "(Unknown)"} • Grades:{" "}
                {(ts.grade || []).join(", ")}
              </li>
            ))}
            {!isLoading && (subjects || []).length === 0 && (
              <div className="text-sm text-gray-500">No subjects yet</div>
            )}
          </ul>
        )}
        {editing && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <Label className="mb-1.5">Subject</Label>
                <Select
                  value={form.subjectId}
                  onValueChange={(val) =>
                    setForm((p) => ({ ...p, subjectId: val }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {(allSubjects || []).map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5">Grades (comma separated)</Label>
                <Input
                  value={form.gradesCsv}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, gradesCsv: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAdd}>Add</Button>
              </div>
            </div>
            <div className="space-y-2">
              {(subjects || []).map((ts) => (
                <div
                  key={ts.tutor_subject_id}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    {ts.subject?.name || ts.subject_id} • Grades:{" "}
                    {(ts.grade || []).join(", ")}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => del.mutate(ts.tutor_subject_id || "")}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
