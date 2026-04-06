"use client";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "../../../public/project-logo.png";
import Image from "next/image";
export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="sticky top-0 z-50 text-textColor pl-2 pr-8 flex items-center justify-between h-29 border border-border bg-background">
      <div className="flex items-center">
        <div>
          <Image
            src={Logo}
            alt="projectLogo"
            className="w-52 h-auto object-contain"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link className="relative text-md font-lato transition-all duration-300 
              hover:text-[var(--primary)] transition-all duration-300" href="/">
          Home
        </Link>
        <Link className="relative text-md font-lato transition-all duration-300 
              hover:text-[var(--primary)] transition-all duration-300" href="/transactions">
          Quiz
        </Link>
        <Link className="relative text-md font-lato transition-all duration-300 
              hover:text-[var(--primary)] transition-all duration-300" href="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <SignOutButton>
              <button>
                Log Out
              </button>
            </SignOutButton>
            <UserButton />
          </>
        ) : (
          <SignInButton>
            <button>
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div >
  );
} 