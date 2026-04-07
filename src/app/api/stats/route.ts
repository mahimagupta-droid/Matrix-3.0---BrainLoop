// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '../../../lib/dbConnections/dbConnection';
import QuizResult from '../../../lib/models/quizResults';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const allQuizzes = await QuizResult.find({ userId }).sort({ timestamp: -1 });

    if (allQuizzes.length === 0) {
      return NextResponse.json({
        totalQuizzes: 0,
        averageScore: 0,
        topicsStudied: 0,
        currentStreak: 0,
        improvement: 0,
        recentScores: [],
        topicBreakdown: {},
      });
    }

    // Basic stats
    const totalQuizzes = allQuizzes.length;
    const averageScore = Math.round(
      allQuizzes.reduce((sum, q) => sum + q.score, 0) / totalQuizzes
    );

    const uniqueTopics = new Set(allQuizzes.map((q) => q.topic));
    const topicsStudied = uniqueTopics.size;

    // Current streak (consecutive days with at least one quiz)
    const currentStreak = calculateStreak(allQuizzes);

    // Improvement: compare avg of last 5 vs first 5
    const recent5 = allQuizzes.slice(0, Math.min(5, totalQuizzes));
    const oldest5 = allQuizzes.slice(-Math.min(5, totalQuizzes));
    const recentAvg = recent5.reduce((s, q) => s + q.score, 0) / recent5.length;
    const oldestAvg = oldest5.reduce((s, q) => s + q.score, 0) / oldest5.length;
    const improvement = Math.round(recentAvg - oldestAvg);

    // Recent scores (last 10)
    const recentScores = allQuizzes.slice(0, 10).map((q) => q.score).reverse();

    // Topic breakdown: average score per topic
    const topicMap: Record<string, { total: number; count: number }> = {};
    allQuizzes.forEach((q) => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, count: 0 };
      topicMap[q.topic].total += q.score;
      topicMap[q.topic].count++;
    });
    const topicBreakdown: Record<string, number> = {};
    for (const [topic, data] of Object.entries(topicMap)) {
      topicBreakdown[topic] = Math.round(data.total / data.count);
    }

    return NextResponse.json({
      totalQuizzes,
      averageScore,
      topicsStudied,
      currentStreak,
      improvement,
      recentScores,
      topicBreakdown,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function calculateStreak(quizzes: { timestamp: Date }[]): number {
  if (quizzes.length === 0) return 0;

  const days = new Set(
    quizzes.map((q) => {
      const d = new Date(q.timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const check = new Date(today);
    check.setDate(check.getDate() - i);
    const key = `${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`;
    if (days.has(key)) {
      streak++;
    } else if (i > 0) {
      break; // allow today to not have a quiz yet
    }
  }

  return streak;
}