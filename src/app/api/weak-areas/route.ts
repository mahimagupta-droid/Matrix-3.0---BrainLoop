/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/weak-areas/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from '../../../lib/dbConnections/dbConnection';
import QuizResult from '../../../lib/models/quizResults';

export async function GET() {
  try {
    // Temporarily skip auth for testing
    // const { userId } = await auth();
    const userId = "test-user";
    
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    await dbConnect();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentQuizzes = await QuizResult.find({
      userId,
      timestamp: { $gte: thirtyDaysAgo }
    }).sort({ timestamp: -1 });
    if (recentQuizzes.length === 0) {
      return NextResponse.json({
        hasData: false,
        message: 'No quiz history found. Take some quizzes first!'
      });
    }

    const allWrongAnswers: any[] = [];
    const topicPerformance: { [key: string]: { correct: number, total: number } } = {};

    recentQuizzes.forEach(quiz => {
      quiz.questionResults.forEach((qr: any) => {
        const topic = qr.topic;
        
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { correct: 0, total: 0 };
        }
        
        topicPerformance[topic].total++;
        
        if (qr.isCorrect) {
          topicPerformance[topic].correct++;
        } else {
          allWrongAnswers.push(qr);
        }
      });
    });

    const weakTopics = Object.entries(topicPerformance)
      .map(([topic, perf]) => ({
        topic,
        accuracy: Math.round((perf.correct / perf.total) * 100),
        questionsAttempted: perf.total,
        questionsWrong: perf.total - perf.correct
      }))
      .filter(t => t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy);
    const weakConcepts: { [key: string]: number } = {};
    
    allWrongAnswers.forEach(answer => {
      const diagnostic = answer.diagnosticValue.toLowerCase();
      const keywords = [
        'time complexity', 'space complexity', 'algorithm',
        'data structure', 'recursion', 'iteration', 'sorting',
        'searching', 'dynamic programming', 'greedy', 'divide and conquer',
        'big o', 'logarithmic', 'linear', 'quadratic', 'exponential',
        'array', 'string', 'linked list', 'tree', 'graph', 'hash table'
      ];
      keywords.forEach(keyword => {
        if (diagnostic.includes(keyword)) {
          weakConcepts[keyword] = (weakConcepts[keyword] || 0) + 1;
        }
      });
    });
    const topWeakConcepts = Object.entries(weakConcepts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([concept, count]) => ({
        concept,
        occurrences: count
      }));
    const recommendations = generateRecommendations(weakTopics, topWeakConcepts);
    return NextResponse.json({
      hasData: true,
      summary: {
        totalQuizzes: recentQuizzes.length,
        totalQuestions: recentQuizzes.reduce((sum, q) => sum + q.totalQuestions, 0),
        averageScore: Math.round(
          recentQuizzes.reduce((sum, q) => sum + q.score, 0) / recentQuizzes.length
        )
      },
      weakTopics,
      topWeakConcepts,
      recommendations,
      recentQuizzes: recentQuizzes.slice(0, 5).map(q => ({
        topic: q.topic,
        score: q.score,
        date: q.timestamp
      }))
    });
  } catch (error) {
    console.error('Error analyzing weak areas:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze weak areas',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function generateRecommendations(
  weakTopics: any[],
  weakConcepts: any[]
): string[] {
  const recommendations: string[] = [];
  if (weakTopics.length > 0) {
    const weakestTopic = weakTopics[0];
    recommendations.push(
      `Focus on "${weakestTopic.topic}" - you're at ${weakestTopic.accuracy}% accuracy`
    );
  }
  if (weakConcepts.length > 0) {
    const topConcept = weakConcepts[0];
    recommendations.push(
      `Practice "${topConcept.concept}" concepts - appeared in ${topConcept.occurrences} wrong answers`
    );
  }
  if (weakTopics.length > 2) {
    recommendations.push(
      `You have ${weakTopics.length} topics below 70% - consider focused practice sessions`
    );
  }
  if (recommendations.length === 0) {
    recommendations.push("Great job! Keep practicing to maintain your performance");
  }
  return recommendations;
}