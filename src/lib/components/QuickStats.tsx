/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/components/QuickStats.tsx
"use client";
import { useEffect, useState } from "react";

export default function QuickStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Total Quizzes"
        value={stats.totalQuizzes}
        icon="📝"
        color="blue"
      />
      <StatCard 
        title="Average Score"
        value={`${stats.averageScore}%`}
        icon="🎯"
        color="green"
      />
      <StatCard 
        title="Current Streak"
        value={`${stats.currentStreak} days`}
        icon="🔥"
        color="orange"
      />
      <StatCard 
        title="Improvement"
        value={`+${stats.improvement}%`}
        icon="📈"
        color="purple"
      />
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-(--card) rounded-xl border border-(--border) p-6">
      <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center text-2xl mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-(--card-textColor) mb-1">{title}</p>
      <p className="text-2xl font-bold text-(--primary)">{value}</p>
    </div>
  );
}