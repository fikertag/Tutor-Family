export default function StatsSection() {
  return (
    <section className="pb-12 md:pb-40 " id="aboutus">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">About Us</h2>
          <p>
            TutorBridge connects learners with vetted tutors across subjects,
            enabling flexible scheduling and measurable progress for students of
            all ages.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="text-5xl font-bold">200+</div>
            <p>Verified tutors</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">2,000+</div>
            <p>Active students</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">95%</div>
            <p>Average satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
