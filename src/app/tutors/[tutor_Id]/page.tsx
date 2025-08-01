"use client";
import { useParams } from "next/navigation";
import { tutors } from "@/app/tutors";

export default function TutorProfile() {
  const params = useParams();
  const tutorId = params?.tutor_Id;
  const tutor = tutors.find((t) => t.id === tutorId);

  if (!tutor) {
    return <div className="text-center py-20 text-lg">Tutor not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto  p-8 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-32 h-32 rounded-full object-cover mb-4 shadow"
        />
        <h2 className="text-2xl font-bold mb-1">{tutor.name}</h2>
        <div className="text-sm text-muted-foreground mb-2">
          {tutor.subject}
        </div>
        <div className="text-sm text-muted-foreground mb-2">
          {tutor.location}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold">{tutor.rating}</span>
        </div>
        <p className="text-base text-card-foreground mb-4 text-center max-w-md">
          {tutor.description}
        </p>
        <div className="bg-muted rounded-lg p-4 w-full text-left">
          <h3 className="font-semibold mb-2">About {tutor.name}</h3>
          <p className="text-sm text-muted-foreground">{tutor.bio}</p>
        </div>
      </div>
    </div>
  );
}
