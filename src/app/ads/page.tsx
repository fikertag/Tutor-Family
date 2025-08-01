import { ads } from "@/app/tutors";
export default function AdsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Family Posted Ads
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {ads.map((ad) => (
          <div
            key={ad.advertisement_id}
            className="rounded-2xl border border-border bg-card text-card-foreground flex flex-col overflow-hidden shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-2">{ad.job_title}</h2>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {ad.job_description}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {ad.job_weekdays.map((day) => (
                <span
                  key={day}
                  className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-muted-foreground">
                Location: {ad.location}
              </span>
              <span className="text-xs text-muted-foreground">
                Grade: {ad.grade}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-muted-foreground">
                Salary: {ad.salary} ETB
              </span>
              <span className="text-xs text-muted-foreground">
                Posted: {ad.created_at}
              </span>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold shadow">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
