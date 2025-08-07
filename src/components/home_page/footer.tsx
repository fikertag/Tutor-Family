import Link from "next/link";
import { Send, Facebook, Linkedin, Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
export default function Footer() {
  return (
    <footer className="bg-accent text-background py-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-2 place-items-center">
          <div className="flex flex-col text-background items-center justify-center">
            <Link href="/" className="flex items-center text-center mb-4 ">
              <span className="text-3xl font-semibold">Tutor Bridge</span>
            </Link>
          </div>
          <div>
            <Link
              href="/find-tutor"
              className="text-muted-foreground hover:text-primary text-center underline underline-offset-2"
            >
              Find a Tutor
            </Link>
          </div>
          <div>
            <Link
              href="/become-tutor"
              className="text-muted-foreground hover:text-primary underline underline-offset-2"
            >
              Become a Tutor
            </Link>
          </div>
          <div>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary underline underline-offset-2"
            >
              About Us
            </Link>
          </div>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-primary "
          >
            0222260664
          </Link>
          <div>
            <Button variant={"link"}>
              <Send />{" "}
            </Button>
            <Button variant={"link"}>
              <Facebook />{" "}
            </Button>
            <Button variant={"link"}>
              <Linkedin />{" "}
            </Button>
            <Button variant={"link"}>
              <Youtube />{" "}
            </Button>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-3 text-center text-muted-foreground">
          <p>© 2025 TutorBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
