"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path as needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <nav className="bg-background shadow-sm py-3 fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
        {/* Left: Logo */}
        <div className="flex items-center md:justify-start">
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-primary"
          >
            Tutor Bridge
          </Link>
        </div>

        {/* Center: Menu (desktop only) */}
        <div className="hidden md:flex flex-grow justify-center text-sm min-w-0">
          <div className="flex items-center space-x-6 w-full justify-center">
            <Link
              href="/findtutors"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Find Tutors
            </Link>
            <Link
              href="/ads"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Ads
            </Link>
            <Link
              href="/jobs"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Jobs
            </Link>
            <Link
              href="/support"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Right: Auth buttons (desktop), Hamburger (mobile) */}
        <div className="flex items-center md:justify-end md:w-auto">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center justify-end flex-1">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-12 left-0 w-full bg-background shadow-md z-40 flex flex-col items-center space-y-6 pt-6 pb-4"
        >
          <Link
            href="/findtutors"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            Find Tutors
          </Link>
          <Link
            href="/ads"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            Ads
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            Jobs
          </Link>
          <Link
            href="/support"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            Support
          </Link>
          <div className="flex flex-col gap-2 w-full px-4">
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
