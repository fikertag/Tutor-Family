"use client";
import { useAllApplications } from "@/hooks/useAdvertisements";
export default function Page() {
  const { data: applications, isLoading, isError } = useAllApplications();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading applications</div>;

  return (
    <div>
      <h1>Requests</h1>
      <ul>
        {applications?.map((app) => (
          <li key={app.application_id}>{app.advertisement.job_title}</li>
        ))}
      </ul>
    </div>
  );
}
