"use client";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "../../../public/project-logo.png";
import Image from "next/image";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 text-textColor border border-border bg-background">
      <div className="flex items-center justify-between h-30 px-4 md:px-8 gap-20">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="projectLogo"
              className="w-20 md:w-36 h-auto object-contain gap-x-0 dark:invert"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link className="relative text-md font-lato transition-all duration-300 hover:text-(--primary)" href="/">
            Home
          </Link>
          <Link className="relative text-md font-lato transition-all duration-300 hover:text-(--primary)" href="/quiz">
            Quiz
          </Link>
          <Link className="relative text-md font-lato transition-all duration-300 hover:text-(--primary)" href="/dashboard">
            Dashboard
          </Link>
          <Link href="/weak-areas" className="hover:text-(--primary)">
            Weak Areas
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <SignOutButton>
                <button className="text-sm font-medium hover:opacity-80 transition cursor-pointer bg-(--primary) text-white px-4 py-2 rounded-md">
                  Log Out
                </button>
              </SignOutButton>
              <UserButton />
            </>
          ) : (
            <SignInButton>
              <button className="bg-(--primary) text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-foreground focus:outline-hidden cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 px-4 border-t border-(--border) bg-background">
          <Link onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 text-md font-lato hover:text-(--primary)" href="/">
            Home
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 text-md font-lato hover:text-(--primary)" href="/transactions">
            Quiz
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2 text-md font-lato hover:text-(--primary)" href="/dashboard">
            Dashboard
          </Link>

          <div className="w-full h-px bg-(--border) my-2"></div>

          <div className="flex w-full justify-center gap-4 items-center flex-col">
            <ThemeToggle />
            {isSignedIn ? (
              <div className="flex flex-col items-center gap-4">
                <UserButton />
                <SignOutButton>
                  <button className="text-sm font-medium hover:opacity-80 transition cursor-pointer">
                    Log Out
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <SignInButton>
                <button className="bg-(--primary) text-white px-6 py-2 rounded-md font-medium w-full max-w-xs hover:opacity-90 transition cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 