import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-background text-foreground pt-5 pb-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 text-left md:text-left">
          <div className="mb-4 md:mb-0 flex flex-col items-start">
            <Link href="/" className="mb-4">
              <span className="text-xl font-bold">Tutor Bridge</span>
            </Link>
            <p className="text-muted-foreground">
              Connecting families with tutors.
            </p>
          </div>
          <div className="mb-4 md:mb-0 flex flex-col items-start">
            <h3 className="font-semibold text-lg md:mb-4">For Families</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/findtutors"
                  className="text-muted-foreground hover:text-primary"
                >
                  Find a Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0 flex flex-col items-start">
            <h3 className="font-semibold text-lg md:mb-4">For Tutors</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-muted-foreground hover:text-primary"
                >
                  Become a Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0 flex flex-col items-start">
            <h3 className="font-semibold text-lg md:mb-4">Company</h3>
            <ul className="">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border md:mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 TutorBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
