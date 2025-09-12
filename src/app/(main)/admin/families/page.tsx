"use client";
import { SiteHeader } from "@/components/site-header";
import { useFamillyList } from "@/hooks/useAdmin";
export default function page() {
  const { data: families = [], isLoading } = useFamillyList();

  if (isLoading)
    return (
      <>
        <SiteHeader title="families" description="list of families" />
        <div className="p-4">Loading...</div>
      </>
    );

  return (
    <>
      <SiteHeader title="families" description="list of families" />
      <div className="p-4">
        {families.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No families found.
          </div>
        ) : (
          families.map((family) => (
            <div key={family.id} className="mb-4 p-4 border rounded">
              <h2>{family.email || "N/A"}</h2>
              <h2>{family.first_name || "N/A"} </h2>
              <h2>{family.last_name || "N/A"}</h2>
              <h2>{family.profile_picture_url || "N/A"}</h2>
              <h2>{family.phone || "N/A"}</h2>
            </div>
          ))
        )}
      </div>
    </>
  );
}
