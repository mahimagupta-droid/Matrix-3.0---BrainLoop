/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/quiz/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { dbConnect } from "../../../../lib/dbConnections/dbConnection";
import QuizResult from "../../../../lib/models/quizResults";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      topic,
      difficulty,
      questions,
      selectedAnswers,
      timeTaken
    } = body;

    const questionResults = questions.map((q: any, index: number) => {
      const selectedAnswer = selectedAnswers[q.id];
      const isCorrect = selectedAnswer === q.correctAnswer;
      
      return {
        questionId: q.id,
        question: q.question,
        selectedAnswer: selectedAnswer || 'Not answered',
        correctAnswer: q.correctAnswer,
        isCorrect,
        topic: q.topic,
        difficulty: q.difficulty,
        diagnosticValue: q.diagnosticValue
      };
    });

    const correctAnswers = questionResults.filter((r: any) => r.isCorrect).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const wrongAnswers = questionResults.filter((r: any) => !r.isCorrect);
    const weakTopics = [...new Set(wrongAnswers.map((r: any) => r.topic))];
    await dbConnect();
    const quizResult = await QuizResult.create({
      userId,
      topic,
      difficulty,
      totalQuestions: questions.length,
      correctAnswers,
      score,
      questionResults,
      weakTopics,
      quizMetadata: {
        generatedAt: new Date().toISOString(),
        timeTaken
      }
    });
    const weakAreas = analyzeWeakAreas(wrongAnswers);
    return NextResponse.json({
      success: true,
      result: {
        score,
        correctAnswers,
        totalQuestions: questions.length,
        weakTopics,
        weakAreas,
        quizResultId: quizResult._id
      }
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save quiz result',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function analyzeWeakAreas(wrongAnswers: any[]) {
  const weakAreas: { [key: string]: number } = {};
  
  wrongAnswers.forEach(answer => {
    const concepts = extractConcepts(answer.diagnosticValue);
    concepts.forEach(concept => {
      weakAreas[concept] = (weakAreas[concept] || 0) + 1;
    });
  });

  return Object.entries(weakAreas)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5) // Top 5 weak areas
    .map(([concept, count]) => ({
      concept,
      questionsAffected: count
    }));
}

function extractConcepts(diagnosticValue: string): string[] {
  const concepts: string[] = [];
  const patterns = [
    /understanding (?:of )?([^,\.]+)/gi,
    /confusion about ([^,\.]+)/gi,
    /missing ([^,\.]+)/gi,
    /lack of knowledge about ([^,\.]+)/gi,
    /misunderstanding ([^,\.]+)/gi,
    /gap in ([^,\.]+)/gi,
  ];
  patterns.forEach(pattern => {
    const matches = diagnosticValue.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        concepts.push(match[1].trim().toLowerCase());
      }
    }
  });

  if (concepts.length === 0) {
    const words = diagnosticValue.toLowerCase().split(/[,\.]/);
    words.forEach(word => {
      const trimmed = word.trim();
      if (trimmed.length > 5 && trimmed.length < 50) {
        concepts.push(trimmed);
      }
    });
  }

  return [...new Set(concepts)]; 
}