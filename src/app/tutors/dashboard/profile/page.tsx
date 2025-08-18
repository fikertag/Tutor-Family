"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  IconPencil,
  IconX,
  IconDeviceFloppy,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  useTutorProfile,
  useUpdateProfile,
  useUpdateBasicProfile,
  useTutorQualifications,
  useCreateQualification,
  useUpdateQualification,
  useDeleteQualification,
  useTutorExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useTutorEducations,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
  useTutorAvailabilities,
  useCreateAvailability,
  useUpdateAvailability,
  useDeleteAvailability,
  useTutorTranscripts,
  useCreateTranscript,
  useDeleteTranscript,
  useTutorSubjects,
  useAddTutorSubject,
  useUpdateTutorSubject,
  useDeleteTutorSubject,
  useTutorQualificationsById,
} from "@/hooks/useTutors";
import { apiClient } from "@/lib/apiClient";
import type {
  TutorProfile as TutorProfileType,
  BasicProfile,
  Qualification,
  Experience,
  Education,
  Availability,
  Transcript,
  TutorSubject,
} from "@/types/api";

function Card({
  title,
  editing,
  onEdit,
  children,
  actions,
}: {
  title: string;
  editing: boolean;
  onEdit: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          {actions}
          <button
            aria-label={editing ? "Close edit" : "Edit"}
            onClick={onEdit}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-gray-600 hover:bg-gray-50"
          >
            {editing ? <IconX size={18} /> : <IconPencil size={18} />}
          </button>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      <div className="col-span-1 text-sm font-medium text-gray-600">
        {label}
      </div>
      <div className="col-span-2 text-sm text-gray-900">{children}</div>
    </div>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
      value={value ?? ""}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

export default function ProfilePage() {
  // Queries
  const {
    data: tutorProfile,
    isLoading: profileLoading,
    isError: profileError,
  } = useTutorProfile();
  const { data: basicData } = useQuery<BasicProfile>({
    queryKey: ["basicProfile"],
    queryFn: () => apiClient<BasicProfile>(`/user/me`),
  });
  const tutorId = tutorProfile?.tutor_id;

  const { data: qualifications, isLoading: qLoading } =
    useTutorQualifications();
  const { data: qualificationsById, isLoading: qByIdLoading } =
    useTutorQualificationsById("12");
  const { data: experiences, isLoading: eLoading } = useTutorExperiences();
  const { data: educations, isLoading: edLoading } = useTutorEducations();
  const { data: availabilities, isLoading: aLoading } =
    useTutorAvailabilities();
  const { data: transcripts, isLoading: tLoading } = useTutorTranscripts();
  const { data: subjects, isLoading: sLoading } = useTutorSubjects(tutorId);

  useEffect(() => {
    console.log(qByIdLoading, qualificationsById);
  }, [qByIdLoading, qualificationsById, tutorId]);

  // Mutations
  const updateBasic = useUpdateBasicProfile();
  const updateTutor = useUpdateProfile();

  const createQualification = useCreateQualification();
  const updateQualification = useUpdateQualification();
  const deleteQualification = useDeleteQualification();

  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const createAvailability = useCreateAvailability();
  const updateAvailability = useUpdateAvailability();
  const deleteAvailability = useDeleteAvailability();

  const createTranscript = useCreateTranscript();
  const deleteTranscript = useDeleteTranscript();

  const addSubject = useAddTutorSubject(tutorId ?? "");
  const updateSubject = useUpdateTutorSubject(tutorId ?? "");
  const deleteSubject = useDeleteTutorSubject(tutorId ?? "");

  // Edit toggles
  const [editBasic, setEditBasic] = useState(false);
  const [editTutor, setEditTutor] = useState(false);
  const [editQual, setEditQual] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [editEdu, setEditEdu] = useState(false);
  const [editAvail, setEditAvail] = useState(false);
  const [editTrans, setEditTrans] = useState(false);
  const [editSubjects, setEditSubjects] = useState(false);

  // Forms
  const [basicForm, setBasicForm] = useState<BasicProfile>({
    first_name: "",
    last_name: "",
    gender: "OTHER",
    phone: "",
    profile_picture: "",
  });

  // Seed basic form from fetched data when editing toggled on
  useEffect(() => {
    if (basicData && editBasic) {
      setBasicForm({
        first_name: basicData.first_name,
        last_name: basicData.last_name,
        gender: basicData.gender,
        phone: basicData.phone ?? "",
        profile_picture: basicData.profile_picture ?? "",
      });
    }
  }, [basicData, editBasic]);

  const [tutorForm, setTutorForm] = useState<Partial<TutorProfileType>>({
    years_of_experience: undefined,
    monthly_rate: undefined,
    location: "",
    snapshot_bio: "",
    coverLetter: "",
  });

  // Seed tutor form from fetched data
  useEffect(() => {
    if (tutorProfile && editTutor) {
      setTutorForm({
        years_of_experience: tutorProfile.years_of_experience,
        monthly_rate: tutorProfile.monthly_rate,
        location: tutorProfile.location,
        snapshot_bio: tutorProfile.snapshot_bio,
        coverLetter: tutorProfile.coverLetter,
      });
    }
  }, [tutorProfile, editTutor]);

  // QUALIFICATIONS inline edit state
  const [qualDrafts, setQualDrafts] = useState<
    Record<string, Partial<Qualification>>
  >({});
  useEffect(() => {
    if (qualifications && editQual) {
      const map: Record<string, Partial<Qualification>> = {};
      qualifications.forEach((q: Qualification) => {
        map[q.id] = { ...q };
      });
      setQualDrafts(map);
    }
  }, [qualifications, editQual]);

  const handleQualChange = (
    id: string,
    field: keyof Qualification,
    value: string
  ) => {
    setQualDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // EXPERIENCES inline edit state
  const [expDrafts, setExpDrafts] = useState<
    Record<string, Partial<Experience>>
  >({});
  useEffect(() => {
    if (experiences && editExp) {
      const map: Record<string, Partial<Experience>> = {};
      experiences.forEach((ex: Experience) => {
        map[ex.id] = { ...ex };
      });
      setExpDrafts(map);
    }
  }, [experiences, editExp]);

  const handleExpChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setExpDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // EDUCATIONS add/edit
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    institution_name: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    is_verified: false,
  });

  // AVAILABILITY add/edit
  const [newAvailability, setNewAvailability] = useState<
    Omit<Availability, "id">
  >({
    weekday: "",
    time: "",
  });

  // TRANSCRIPTS add (file upload)
  const [newTranscriptFile, setNewTranscriptFile] = useState<File | null>(null);

  // SUBJECTS add/edit
  const [newSubject, setNewSubject] = useState<{
    subjectId: string;
    gradesCsv: string;
  }>({ subjectId: "", gradesCsv: "" });

  const handleSaveBasic = () => {
    updateBasic.mutate(basicForm, {
      onSuccess: () => {
        window.alert("Basic profile updated");
        setEditBasic(false);
      },
      onError: () => window.alert("Failed to update basic profile"),
    });
  };

  const handleSaveTutor = () => {
    updateTutor.mutate(tutorForm, {
      onSuccess: () => {
        window.alert("Tutor profile updated");
        setEditTutor(false);
      },
      onError: () => window.alert("Failed to update tutor profile"),
    });
  };

  const handleSaveQualification = (id: string) => {
    const data = qualDrafts[id];
    if (!data) return;
    updateQualification.mutate(
      { id, data },
      {
        onSuccess: () => window.alert("Qualification updated"),
        onError: () => window.alert("Failed to update qualification"),
      }
    );
  };

  const handleAddQualification = () => {
    const empty: Omit<Qualification, "id"> = {
      certificate_name: "",
      issuing_organization: "",
      issue_date: "",
      expiry_date: "",
      credential_id: "",
    };
    createQualification.mutate(empty, {
      onSuccess: () => window.alert("Qualification created (fill it in)"),
      onError: () => window.alert("Failed to create qualification"),
    });
  };

  const handleSaveExperience = (id: string) => {
    const data = expDrafts[id];
    if (!data) return;
    updateExperience.mutate(
      { id, data },
      {
        onSuccess: () => window.alert("Experience updated"),
        onError: () => window.alert("Failed to update experience"),
      }
    );
  };

  const handleAddExperience = () => {
    const empty: Omit<Experience, "id"> = {
      company: "",
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      is_current: false,
    };
    createExperience.mutate(empty, {
      onSuccess: () => window.alert("Experience created (fill it in)"),
      onError: () => window.alert("Failed to create experience"),
    });
  };

  const handleAddEducation = () => {
    createEducation.mutate(newEducation, {
      onSuccess: () => {
        window.alert("Education added");
        setNewEducation({
          institution_name: "",
          degree: "",
          field_of_study: "",
          start_date: "",
          end_date: "",
          is_verified: false,
        });
      },
      onError: () => window.alert("Failed to add education"),
    });
  };

  const handleAddAvailability = () => {
    createAvailability.mutate(newAvailability, {
      onSuccess: () => {
        window.alert("Availability added");
        setNewAvailability({ weekday: "", time: "" });
      },
      onError: () => window.alert("Failed to add availability"),
    });
  };

  const handleAddTranscript = () => {
    if (!newTranscriptFile) return window.alert("Pick a file first");
    const fd = new FormData();
    fd.append("file", newTranscriptFile);
    createTranscript.mutate(fd, {
      onSuccess: () => {
        window.alert("Transcript uploaded");
        setNewTranscriptFile(null);
      },
      onError: () => window.alert("Failed to upload transcript"),
    });
  };

  const handleAddSubject = () => {
    if (!tutorId) return window.alert("Tutor ID missing");
    const grades = newSubject.gradesCsv
      .split(",")
      .map((g: string) => g.trim())
      .filter((g: string) => !!g);
    addSubject.mutate(
      { subjectId: newSubject.subjectId, grades },
      {
        onSuccess: () => {
          window.alert("Subject added");
          setNewSubject({ subjectId: "", gradesCsv: "" });
        },
        onError: () => window.alert("Failed to add subject"),
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">
          View and edit your tutor details
        </p>
      </div>

      {/* Basic Profile */}
      <Card
        title="Basic Profile"
        editing={editBasic}
        onEdit={() => setEditBasic((v) => !v)}
        actions={
          editBasic ? (
            <button
              onClick={handleSaveBasic}
              className="inline-flex h-8 items-center gap-1 rounded-md bg-gray-900 px-3 text-xs font-medium text-white hover:bg-black"
            >
              <IconDeviceFloppy size={16} /> Save
            </button>
          ) : null
        }
      >
        {editBasic ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-600">
                First name
              </label>
              <Input
                value={basicForm.first_name}
                onChange={(e) =>
                  setBasicForm((p) => ({ ...p, first_name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">
                Last name
              </label>
              <Input
                value={basicForm.last_name}
                onChange={(e) =>
                  setBasicForm((p) => ({ ...p, last_name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">Gender</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={basicForm.gender}
                onChange={(e) =>
                  setBasicForm((p) => ({
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
              <label className="mb-1 block text-xs text-gray-600">Phone</label>
              <Input
                value={basicForm.phone}
                onChange={(e) =>
                  setBasicForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs text-gray-600">
                Profile picture URL
              </label>
              <Input
                value={basicForm.profile_picture}
                onChange={(e) =>
                  setBasicForm((p) => ({
                    ...p,
                    profile_picture: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        ) : (
          <div className="divide-y">
            <Field label="First name">{basicData?.first_name || "—"}</Field>
            <Field label="Last name">{basicData?.last_name || "—"}</Field>
            <Field label="Gender">{basicData?.gender || "—"}</Field>
            <Field label="Phone">{basicData?.phone || "—"}</Field>
            <Field label="Profile picture">
              {basicData?.profile_picture || "—"}
            </Field>
          </div>
        )}
      </Card>

      {/* Tutor Profile */}
      <Card
        title="Tutor Profile"
        editing={editTutor}
        onEdit={() => setEditTutor((v) => !v)}
        actions={
          editTutor ? (
            <button
              onClick={handleSaveTutor}
              className="inline-flex h-8 items-center gap-1 rounded-md bg-gray-900 px-3 text-xs font-medium text-white hover:bg-black"
            >
              <IconDeviceFloppy size={16} /> Save
            </button>
          ) : null
        }
      >
        {profileLoading && (
          <div className="text-sm text-gray-500">Loading…</div>
        )}
        {profileError && (
          <div className="text-sm text-red-600">Failed to load profile</div>
        )}
        {!profileLoading && !editTutor && (
          <div className="divide-y">
            <Field label="Years of experience">
              {tutorProfile?.years_of_experience ?? "—"}
            </Field>
            <Field label="Monthly rate">
              {tutorProfile?.monthly_rate ?? "—"}
            </Field>
            <Field label="Location">{tutorProfile?.location || "—"}</Field>
            <Field label="Snapshot bio">
              {tutorProfile?.snapshot_bio || "—"}
            </Field>
            <Field label="Cover letter">
              {tutorProfile?.coverLetter || "—"}
            </Field>
          </div>
        )}
        {editTutor && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-600">
                Years of experience
              </label>
              <Input
                type="number"
                value={tutorForm.years_of_experience}
                onChange={(e) =>
                  setTutorForm((p) => ({
                    ...p,
                    years_of_experience: Number(e.target.value || 0),
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600">
                Monthly rate
              </label>
              <Input
                type="number"
                value={tutorForm.monthly_rate}
                onChange={(e) =>
                  setTutorForm((p) => ({
                    ...p,
                    monthly_rate: Number(e.target.value || 0),
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs text-gray-600">
                Location
              </label>
              <Input
                value={tutorForm.location}
                onChange={(e) =>
                  setTutorForm((p) => ({ ...p, location: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs text-gray-600">
                Snapshot bio
              </label>
              <Textarea
                value={tutorForm.snapshot_bio}
                onChange={(e) =>
                  setTutorForm((p) => ({ ...p, snapshot_bio: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs text-gray-600">
                Cover letter
              </label>
              <Textarea
                value={tutorForm.coverLetter}
                onChange={(e) =>
                  setTutorForm((p) => ({ ...p, coverLetter: e.target.value }))
                }
              />
            </div>
          </div>
        )}
      </Card>

      {/* Qualifications */}
      <Card
        title="Qualifications"
        editing={editQual}
        onEdit={() => setEditQual((v) => !v)}
        actions={
          editQual ? (
            <button
              onClick={handleAddQualification}
              className="inline-flex h-8 items-center gap-1 rounded-md border px-3 text-xs font-medium hover:bg-gray-50"
            >
              <IconPlus size={16} /> Add
            </button>
          ) : null
        }
      >
        {qLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editQual && (
          <ul className="space-y-3">
            {(qualifications || []).map((q: Qualification) => (
              <li key={q.id} className="rounded-md border p-3">
                <div className="text-sm font-medium">
                  {q.certificate_name || "(Untitled)"}
                </div>
                <div className="text-xs text-gray-600">
                  {q.issuing_organization || "—"} • {q.issue_date || "—"}
                </div>
              </li>
            ))}
            {!qLoading && (qualifications || []).length === 0 && (
              <div className="text-sm text-gray-500">No qualifications yet</div>
            )}
          </ul>
        )}
        {editQual && (
          <div className="space-y-4">
            {(qualifications || []).map((q: Qualification) => (
              <div key={q.id} className="rounded-md border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Certificate name
                    </label>
                    <Input
                      value={qualDrafts[q.id]?.certificate_name as string}
                      onChange={(e) =>
                        handleQualChange(
                          q.id,
                          "certificate_name",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Organization
                    </label>
                    <Input
                      value={qualDrafts[q.id]?.issuing_organization as string}
                      onChange={(e) =>
                        handleQualChange(
                          q.id,
                          "issuing_organization",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Issue date
                    </label>
                    <Input
                      type="date"
                      value={qualDrafts[q.id]?.issue_date as string}
                      onChange={(e) =>
                        handleQualChange(q.id, "issue_date", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Expiry date
                    </label>
                    <Input
                      type="date"
                      value={qualDrafts[q.id]?.expiry_date as string}
                      onChange={(e) =>
                        handleQualChange(q.id, "expiry_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-gray-600">
                      Credential ID
                    </label>
                    <Input
                      value={qualDrafts[q.id]?.credential_id as string}
                      onChange={(e) =>
                        handleQualChange(q.id, "credential_id", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleSaveQualification(q.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                  >
                    <IconDeviceFloppy size={16} /> Save
                  </button>
                  <button
                    onClick={() => deleteQualification.mutate(q.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {!qLoading && (qualifications || []).length === 0 && (
              <div className="text-sm text-gray-500">No qualifications yet</div>
            )}
          </div>
        )}
      </Card>

      {/* Experiences */}
      <Card
        title="Experiences"
        editing={editExp}
        onEdit={() => setEditExp((v) => !v)}
        actions={
          editExp ? (
            <button
              onClick={handleAddExperience}
              className="inline-flex h-8 items-center gap-1 rounded-md border px-3 text-xs font-medium hover:bg-gray-50"
            >
              <IconPlus size={16} /> Add
            </button>
          ) : null
        }
      >
        {eLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editExp && (
          <ul className="space-y-3">
            {(experiences || []).map((ex: Experience) => (
              <li key={ex.id} className="rounded-md border p-3">
                <div className="text-sm font-medium">
                  {ex.title || "(Untitled)"}
                </div>
                <div className="text-xs text-gray-600">
                  {ex.company || "—"} • {ex.start_date || "—"} →{" "}
                  {ex.is_current ? "Present" : ex.end_date || "—"}
                </div>
                {ex.description && (
                  <div className="mt-1 text-sm text-gray-700">
                    {ex.description}
                  </div>
                )}
              </li>
            ))}
            {!eLoading && (experiences || []).length === 0 && (
              <div className="text-sm text-gray-500">No experiences yet</div>
            )}
          </ul>
        )}
        {editExp && (
          <div className="space-y-4">
            {(experiences || []).map((ex: Experience) => (
              <div key={ex.id} className="rounded-md border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Title
                    </label>
                    <Input
                      value={expDrafts[ex.id]?.title as string}
                      onChange={(e) =>
                        handleExpChange(ex.id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Company
                    </label>
                    <Input
                      value={expDrafts[ex.id]?.company as string}
                      onChange={(e) =>
                        handleExpChange(ex.id, "company", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Start date
                    </label>
                    <Input
                      type="date"
                      value={expDrafts[ex.id]?.start_date as string}
                      onChange={(e) =>
                        handleExpChange(ex.id, "start_date", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      End date
                    </label>
                    <Input
                      type="date"
                      value={expDrafts[ex.id]?.end_date as string}
                      onChange={(e) =>
                        handleExpChange(ex.id, "end_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs text-gray-600">
                      Description
                    </label>
                    <Textarea
                      value={expDrafts[ex.id]?.description as string}
                      onChange={(e) =>
                        handleExpChange(ex.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id={`current-${ex.id}`}
                      type="checkbox"
                      checked={Boolean(expDrafts[ex.id]?.is_current)}
                      onChange={(e) =>
                        handleExpChange(ex.id, "is_current", e.target.checked)
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
                  <button
                    onClick={() => handleSaveExperience(ex.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                  >
                    <IconDeviceFloppy size={16} /> Save
                  </button>
                  <button
                    onClick={() => deleteExperience.mutate(ex.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {!eLoading && (experiences || []).length === 0 && (
              <div className="text-sm text-gray-500">No experiences yet</div>
            )}
          </div>
        )}
      </Card>

      {/* Education */}
      <Card
        title="Education"
        editing={editEdu}
        onEdit={() => setEditEdu((v) => !v)}
        actions={undefined}
      >
        {edLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editEdu && (
          <ul className="space-y-3">
            {(educations || []).map((ed: Education) => (
              <li key={ed.id} className="rounded-md border p-3">
                <div className="text-sm font-medium">
                  {ed.degree} • {ed.institution_name}
                </div>
                <div className="text-xs text-gray-600">
                  {ed.field_of_study} • {ed.start_date} → {ed.end_date}
                </div>
                <div className="mt-1 text-xs">
                  Verified: {ed.is_verified ? "Yes" : "No"}
                </div>
              </li>
            ))}
            {!edLoading && (educations || []).length === 0 && (
              <div className="text-sm text-gray-500">No education yet</div>
            )}
          </ul>
        )}
        {editEdu && (
          <div className="space-y-4">
            <div className="rounded-md border p-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Institution
                  </label>
                  <Input
                    value={newEducation.institution_name}
                    onChange={(e) =>
                      setNewEducation((p) => ({
                        ...p,
                        institution_name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Degree
                  </label>
                  <Input
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation((p) => ({ ...p, degree: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Field of study
                  </label>
                  <Input
                    value={newEducation.field_of_study}
                    onChange={(e) =>
                      setNewEducation((p) => ({
                        ...p,
                        field_of_study: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Start date
                  </label>
                  <Input
                    type="date"
                    value={newEducation.start_date}
                    onChange={(e) =>
                      setNewEducation((p) => ({
                        ...p,
                        start_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    End date
                  </label>
                  <Input
                    type="date"
                    value={newEducation.end_date}
                    onChange={(e) =>
                      setNewEducation((p) => ({
                        ...p,
                        end_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="ed-verified"
                    type="checkbox"
                    checked={newEducation.is_verified}
                    onChange={(e) =>
                      setNewEducation((p) => ({
                        ...p,
                        is_verified: e.target.checked,
                      }))
                    }
                  />
                  <label
                    htmlFor="ed-verified"
                    className="text-sm text-gray-700"
                  >
                    Verified
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleAddEducation}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
                >
                  <IconPlus size={16} /> Add education
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {(educations || []).map((ed: Education) => (
                <div
                  key={ed.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="text-sm">
                    {ed.degree} • {ed.institution_name}
                  </div>
                  <button
                    onClick={() => deleteEducation.mutate(ed.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Availability */}
      <Card
        title="Availability"
        editing={editAvail}
        onEdit={() => setEditAvail((v) => !v)}
        actions={undefined}
      >
        {aLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editAvail && (
          <ul className="space-y-2">
            {(availabilities || []).map((av: Availability) => (
              <li key={av.id} className="rounded-md border p-2 text-sm">
                {av.weekday} • {av.time}
              </li>
            ))}
            {!aLoading && (availabilities || []).length === 0 && (
              <div className="text-sm text-gray-500">No availability set</div>
            )}
          </ul>
        )}
        {editAvail && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-600">
                  Weekday
                </label>
                <Input
                  value={newAvailability.weekday}
                  onChange={(e) =>
                    setNewAvailability((p) => ({
                      ...p,
                      weekday: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-600">Time</label>
                <Input
                  value={newAvailability.time}
                  onChange={(e) =>
                    setNewAvailability((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddAvailability}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-black"
                >
                  <IconPlus size={16} /> Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {(availabilities || []).map((av: Availability) => (
                <div
                  key={av.id}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    {av.weekday} • {av.time}
                  </div>
                  <button
                    onClick={() => deleteAvailability.mutate(av.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Transcripts */}
      <Card
        title="Transcripts"
        editing={editTrans}
        onEdit={() => setEditTrans((v) => !v)}
        actions={undefined}
      >
        {tLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editTrans && (
          <ul className="space-y-2">
            {(transcripts || []).map((tr: Transcript) => (
              <li
                key={tr.id}
                className="flex items-center justify-between rounded-md border p-2 text-sm"
              >
                <a
                  href={tr.transcriptDoc}
                  target="_blank"
                  className="text-gray-900 underline"
                  rel="noreferrer"
                >
                  View transcript
                </a>
              </li>
            ))}
            {!tLoading && (transcripts || []).length === 0 && (
              <div className="text-sm text-gray-500">
                No transcripts uploaded
              </div>
            )}
          </ul>
        )}
        {editTrans && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="file"
                onChange={(e) =>
                  setNewTranscriptFile(e.target.files?.[0] ?? null)
                }
                className="text-sm"
              />
              <button
                onClick={handleAddTranscript}
                className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-black"
              >
                <IconPlus size={16} /> Upload
              </button>
            </div>
            <div className="space-y-2">
              {(transcripts || []).map((tr: Transcript) => (
                <div
                  key={tr.id}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <a
                    href={tr.transcriptDoc}
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                  >
                    {tr.transcriptDoc}
                  </a>
                  <button
                    onClick={() => deleteTranscript.mutate(tr.id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Subjects */}
      <Card
        title="Subjects"
        editing={editSubjects}
        onEdit={() => setEditSubjects((v) => !v)}
        actions={undefined}
      >
        {sLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {!editSubjects && (
          <ul className="space-y-2">
            {(subjects || []).map((ts: TutorSubject) => (
              <li
                key={ts.tutor_subject_id}
                className="rounded-md border p-2 text-sm"
              >
                {ts.subject?.name || "(Unknown)"} • Grades:{" "}
                {(ts.grade || []).join(", ")}
              </li>
            ))}
            {!sLoading && (subjects || []).length === 0 && (
              <div className="text-sm text-gray-500">No subjects yet</div>
            )}
          </ul>
        )}
        {editSubjects && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-600">
                  Subject ID
                </label>
                <Input
                  value={newSubject.subjectId}
                  onChange={(e) =>
                    setNewSubject((p) => ({ ...p, subjectId: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-600">
                  Grades (comma separated)
                </label>
                <Input
                  value={newSubject.gradesCsv}
                  onChange={(e) =>
                    setNewSubject((p) => ({ ...p, gradesCsv: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddSubject}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-black"
                >
                  <IconPlus size={16} /> Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {(subjects || []).map((ts: TutorSubject) => (
                <div
                  key={ts.tutor_subject_id}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    {ts.subject?.name || ts.subject_id} • Grades:{" "}
                    {(ts.grade || []).join(", ")}
                  </div>
                  <button
                    onClick={() => deleteSubject.mutate(ts.tutor_subject_id)}
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <IconTrash size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
