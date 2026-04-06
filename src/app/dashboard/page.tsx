// app/dashboard/page.tsx
import QuickStats from "@/lib/components/QuickStats";

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-(--muted)">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-(--primary)">
          Your Progress Dashboard
        </h1>
        
        <QuickStats />
        
        <div className="mt-8 text-center">
          <p className="text-(--card-textColor) mb-4">
            Keep practicing to improve your scores!
          </p>
          <a href="/quiz" className="bg-(--primary) text-white px-6 py-3 rounded-lg inline-block hover:opacity-90">
            Start New Quiz
          </a>
        </div>
      </div>
    </div>
  );
}