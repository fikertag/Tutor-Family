import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold">Tutor Bridge</span>
            </Link>
            <p className="text-muted-foreground">
              Connecting families with exceptional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">For Families</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/find-tutor"
                  className="text-muted-foreground hover:text-primary"
                >
                  Find a Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">For Tutors</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/become-tutor"
                  className="text-muted-foreground hover:text-primary"
                >
                  Become a Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 TutorBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
