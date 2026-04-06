// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '@/lib/db/mongoose';

// You'll need to create a QuizResult model
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  // For now, use dummy data
  // Replace with real DB queries later
  
  return NextResponse.json({
    totalQuizzes: 12,
    averageScore: 78,
    topicsStudied: 5,
    currentStreak: 3,
    improvement: 15, // percentage
    recentScores: [60, 65, 70, 75, 80, 85],
    topicBreakdown: {
      "Binary Search": 85,
      "Arrays": 70,
      "Strings": 90
    }
  });
}