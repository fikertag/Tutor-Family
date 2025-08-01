export default function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How TutorBridge Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                1
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Tell us about your child&apos;s learning needs and preferences.
            </p>
          </div>
          <div className="text-center p-6">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                2
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Browse Qualified Tutors
            </h3>
            <p className="text-muted-foreground">
              Filter by subject, availability, teaching style, and more.
            </p>
          </div>
          <div className="text-center p-6">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                3
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Start Learning</h3>
            <p className="text-muted-foreground">
              Connect with your chosen tutor and begin sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
