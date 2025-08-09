"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/user_store";
import { Tutor } from "@/types";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TutorProfile() {
  const params = useParams();
  const tutorId = params?.tutor_Id;
  const { userData } = useUserStore();
  const { data, isLoading, isError, error } = useQuery<Tutor>({
    queryKey: ["orders"],
    queryFn: async () => {
      const token = userData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tutor/${tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json() as Promise<Tutor>;
    },
    enabled: !!tutorId && !!userData?.token,
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8 mt-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center md:w-1/3">
            <Skeleton className="w-40 h-40 rounded-2xl mb-4" />
            <Skeleton className="w-32 h-6 mb-2" />
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-20 h-4 mb-2" />
            <Skeleton className="w-28 h-10 mb-2" />
          </div>
          <div className="flex-1 bg-muted rounded-xl p-6 shadow">
            <Skeleton className="w-40 h-6 mb-4" />
            <Skeleton className="w-full h-24 mb-4" />
            <Skeleton className="w-full h-10 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
            <Skeleton className="w-full h-10 mb-2" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-10 text-center">
        <div className="text-red-500 text-lg font-semibold mb-4">
          Error loading tutor profile
        </div>
        <div className="text-muted-foreground">
          {error?.message || "Something went wrong. Please try again later."}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-8 mt-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={
              `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${data?.user?.profile_picture_cloudinary_id}` ||
              "/default-profile.jpg"
            }
            alt={data?.user?.name}
            className="w-40 h-40 rounded-2xl object-cover mb-4 shadow-lg border"
          />
          <h2 className="text-2xl font-bold mb-1 text-center">
            {data?.user?.name}
          </h2>
          <div className="text-sm text-muted-foreground mb-2 text-center">
            {data?.location}
          </div>
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{data?.avg_review}</span>
            <span className="text-xs text-muted-foreground">
              ({data?.review_num} reviews)
            </span>
          </div>
          <div className="mb-2 text-sm text-muted-foreground">
            Gender: {data?.user?.gender}
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition">
            Hire Tutor
          </button>
        </div>
        {/* Details Section */}
        <div className="flex-1 bg-muted rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-2">
            About {data?.user?.name}
          </h3>
          <p className="text-base text-card-foreground mb-4">
            {data?.snapshot_bio || "No bio available."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-1">Languages</h4>
              <p className="text-sm text-muted-foreground">
                {data?.languages?.join(", ") || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Experience</h4>
              <p className="text-sm text-muted-foreground">
                {data?.years_of_experience} years
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Hourly Rate</h4>
              <p className="text-sm text-muted-foreground">
                ${data?.hourly_rate}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Qualifications</h4>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                {data?.qualifications?.length ? (
                  data.qualifications.map((q) => (
                    <li key={q.id}>
                      {q.certificate_name} ({q.issuing_organization})
                    </li>
                  ))
                ) : (
                  <li>No qualifications listed.</li>
                )}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-1">Education</h4>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                {data?.educations?.length ? (
                  data.educations.map((e) => (
                    <li key={e.id}>
                      {e.degree} in {e.field_of_study} - {e.institution_name} (
                      {new Date(e.start_date).getFullYear()} -{" "}
                      {new Date(e.end_date).getFullYear()})
                    </li>
                  ))
                ) : (
                  <li>No education listed.</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Experience</h4>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                {data?.experiences?.length ? (
                  data.experiences.map((ex) => (
                    <li key={ex.id}>
                      {ex.title} at {ex.company} (
                      {new Date(ex.start_date).getFullYear()} -{" "}
                      {new Date(ex.end_date).getFullYear()})
                    </li>
                  ))
                ) : (
                  <li>No experience listed.</li>
                )}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-1">Availability</h4>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                {data?.availabilities?.length ? (
                  data.availabilities.map((a) => (
                    <li key={a.id}>
                      {a.weekday}: {a.time}
                    </li>
                  ))
                ) : (
                  <li>No availability listed.</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Verification</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {data?.verificationDocument?.verification_status === "True" ? (
                  <>
                    <ShieldCheck className="text-green-500 w-5 h-5" />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <ShieldX className="text-red-500 w-5 h-5" />
                    <span>Not verified</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <a
              href={data?.cover_letter_local_path}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              View Cover Letter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
