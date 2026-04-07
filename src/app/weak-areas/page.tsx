"use client";
import { useRouter } from "next/navigation";
import WeakAreasAnalysis from "@/lib/components/WeakAreasAnalysis";

export default function WeakAreasPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-6 py-12 bg-(--muted)">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push("/quiz")}
            className="text-sm text-(--card-textColor) hover:text-(--primary) mb-4 inline-block"
          >
            ← Back to Quiz
          </button>
          <h1 className="text-3xl font-bold text-(--primary)">Weak Areas</h1>
          <p className="text-(--card-textColor) mt-1">
            Based on your recent quiz performance
          </p>
        </div>
        <WeakAreasAnalysis />
      </div>
    </div>
  );
}
