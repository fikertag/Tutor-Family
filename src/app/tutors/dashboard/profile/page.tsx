"use client";

import React from "react";
import BasicProfile from "@/components/tuordashboard/basic-profile";
import TutorProfile from "@/components/tuordashboard/tutor-profile";
import Qualifications from "@/components/tuordashboard/qualifications";
import Experiences from "@/components/tuordashboard/experiences";
import Education from "@/components/tuordashboard/education";
import Availability from "@/components/tuordashboard/availability";
import Transcripts from "@/components/tuordashboard/transcripts";
import Subjects from "@/components/tuordashboard/subjects";
import { SiteHeader } from "@/components/site-header";

export default function ProfilePage() {
  return (
    <>
      <SiteHeader title="Profile" description="View and edit your profile" />
      <div className="space-y-6 p-4">
        <BasicProfile />
        <TutorProfile />
        <Qualifications />
        <Experiences />
        <Education />
        <Availability />
        <Transcripts />
        <Subjects />
      </div>
    </>
  );
}
