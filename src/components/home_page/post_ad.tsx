"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const genders = ["Male", "Female", "All"];

export default function PostAd() {
  const [form, setForm] = useState({
    job_title: "",
    job_description: "",
    job_weekdays: [] as string[],
    location: "",
    gender: "",
    grade: "",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeekdayChange = (day: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      job_weekdays: checked
        ? [...prev.job_weekdays, day]
        : prev.job_weekdays.filter((d) => d !== day),
    }));
  };

  return (
    <div className="py-8 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post a Tutoring Job</h2>

      <form className="max-w-xl mx-auto bg-card p-8 rounded-xl shadow space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="job_title" className="mb-2 block">
              Job Title
            </Label>
            <Input
              id="job_title"
              name="job_title"
              value={form.job_title}
              onChange={handleChange}
              placeholder="e.g. Math Tutor for Grade 8"
              required
            />
          </div>
          <div>
            <Label htmlFor="job_description" className="mb-2 block">
              Job Description
            </Label>
            <Textarea
              id="job_description"
              name="job_description"
              value={form.job_description}
              onChange={handleChange}
              placeholder="Describe the tutoring needs, expectations, etc."
              required
              rows={4}
            />
          </div>
          <div>
            <Label className="mb-2 block">Weekdays Needed</Label>
            <div className="flex flex-wrap gap-3">
              {weekdays.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    id={day}
                    checked={form.job_weekdays.includes(day)}
                    onCheckedChange={(checked) =>
                      handleWeekdayChange(day, Boolean(checked))
                    }
                  />
                  <Label htmlFor={day} className="ml-1">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="mb-2 block">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City or Area"
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Gender Preference</Label>
            <Select
              value={form.gender}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, gender: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grade" className="mb-2 block">
              Grade
            </Label>
            <Input
              id="grade"
              name="grade"
              type="number"
              value={form.grade}
              onChange={handleChange}
              placeholder="e.g. 8"
              required
            />
          </div>
          <div>
            <Label htmlFor="salary" className="mb-2 block">
              Salary (per month)
            </Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. 5000"
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Post Job
          </Button>
        </div>
      </form>
    </div>
  );
}
