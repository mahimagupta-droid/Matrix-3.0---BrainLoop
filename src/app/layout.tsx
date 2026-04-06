import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/lib/components/navbar";
import Footer from "@/lib/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainLoop",
  description: "An adaptive feedback platform for students, powered by AI",
  icons: {
    icon: "/project-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    // className="bg-black text-gray-100"
    >
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
        >
          <div className="sticky top-0 z-50 border-(--border)">
            <Navbar />
          </div>
          {children}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
