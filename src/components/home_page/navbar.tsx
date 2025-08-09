"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav className="bg-white shadow-md py-3 px-3 fixed top-0 w-full z-50">
      <div className="container mx-auto lg:px-10 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
        {/* Left: Logo */}
        <div className="flex items-center md:justify-start">
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center justify-end flex-1 mr-3">
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
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-primary"
          >
            {/* <BookA className="mr-1" /> */}
            TBridge
          </Link>
        </div>

        {/* Center: Menu (desktop only) */}
        <div className="hidden md:flex flex-grow justify-center text-sm min-w-0 mr-3 md:mr-0">
          <div className="flex items-center space-x-6 w-full justify-center font capitalize">
            <Link
              href="/findtutors"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Find Tutors
            </Link>
            <Link
              href="/auth/signup"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Apply to Tutor
            </Link>{" "}
            <Link
              href="#FAQ"
              className="text-foreground hover:text-primary whitespace-nowrap"
            >
              Faq
            </Link>
          </div>
        </div>

        {/* Right: Auth buttons (desktop), Hamburger (mobile) */}
        <div className="flex items-center md:justify-end md:w-auto">
          {/* Desktop Auth Buttons */}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-12 left-0 w-full bg-background shadow-md z-40 flex flex-col items-center space-y-6 pt-6 pb-4"
        >
          {" "}
          <Link
            href="/findtutors"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            FIND TUTOR
          </Link>
          <Link
            href="/auth/signup"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            APPLY TO TUTOR
          </Link>
          <Link
            href="#FAQ"
            onClick={() => setMenuOpen(false)}
            className="text-foreground text-lg w-full text-center hover:text-primary"
          >
            FAQ
          </Link>
          <div className="flex flex-col gap-4 w-full px-4">buttons</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
