"use client";
import { SiteHeader } from "@/components/site-header";
import { useAllReviews } from "@/hooks/useReviews";

export default function page() {
  const { data, isLoading, isError } = useAllReviews();

  return (
    <>
      <SiteHeader title="All Reviews" description="Manage all reviews" />
      <div className="p-4">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading reviews</div>}
        {data && (
          <ul>
            {data.map((review) => (
              <li key={review.review_id}>
                {review.comment} - {review.rating} - {review.hired_tutor_id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
