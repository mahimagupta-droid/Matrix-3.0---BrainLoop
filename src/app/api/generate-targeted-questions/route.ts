/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { dbConnect } from "../../../lib/dbConnections/dbConnection";
import QuizResult from "../../../lib/models/quizResults";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-1.5-flash";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error: GEMINI_API_KEY is not set." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const body = await request.json();
    const { numberOfQuestions = 10 } = body;
    await dbConnect();
    const recentQuizzes = await QuizResult.find({ userId })
      .sort({ timestamp: -1 })
      .limit(10);

    if (recentQuizzes.length === 0) {
      return NextResponse.json(
        { error: "No quiz history found. Take some quizzes first!" },
        { status: 400 },
      );
    }

    // Analyze weak areas
    const weakAreasAnalysis = analyzeWeakAreasFromHistory(recentQuizzes);

    if (weakAreasAnalysis.weakTopics.length === 0) {
      return NextResponse.json({
        message: "Great job! No weak areas found. Keep practicing!",
        shouldGenerateRegular: true,
      });
    }

    // Build prompt
    const prompt = buildTargetedPrompt(weakAreasAnalysis, numberOfQuestions);

    console.log("Generating targeted questions using Gemini...");

    // 🔥 Gemini API call
    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });

    const responseText = result.response.text();

    // Parse response
    let questions;
    try {
      let cleanedResponse = responseText.trim();

      cleanedResponse = cleanedResponse
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();

      const arrayStart = cleanedResponse.indexOf("[");
      const arrayEnd = cleanedResponse.lastIndexOf("]");

      if (arrayStart !== -1 && arrayEnd !== -1) {
        cleanedResponse = cleanedResponse.substring(arrayStart, arrayEnd + 1);
      }

      questions = JSON.parse(cleanedResponse);

      questions = questions.map((q: any, index: number) => ({
        id: q.id || index + 1,
        question: q.question || "",
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: q.correctAnswer || "",
        topic: q.topic || weakAreasAnalysis.weakTopics[0].topic,
        difficulty: q.difficulty || "medium",
        diagnosticValue:
          q.diagnosticValue || "No diagnostic information available.",
        targetedAt: q.targetedAt || "general weakness",
      }));
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      return NextResponse.json(
        { error: "Failed to generate targeted questions" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      questions,
      metadata: {
        weakAreasTargeted: weakAreasAnalysis.weakTopics.map(
          (t: any) => t.topic,
        ),
        conceptsTargeted: weakAreasAnalysis.weakConcepts.map(
          (c: any) => c.concept,
        ),
        count: questions.length,
        generatedAt: new Date().toISOString(),
        type: "targeted",
      },
    });
  } catch (error) {
    console.error("Error generating targeted questions:", error);
    return NextResponse.json(
      {
        error: "Failed to generate targeted questions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

function analyzeWeakAreasFromHistory(quizzes: any[]) {
  const topicPerformance: {
    [key: string]: { correct: number; total: number };
  } = {};
  const wrongAnswers: any[] = [];
  quizzes.forEach((quiz) => {
    quiz.questionResults.forEach((qr: any) => {
      const topic = qr.topic;
      if (!topicPerformance[topic]) {
        topicPerformance[topic] = { correct: 0, total: 0 };
      }
      topicPerformance[topic].total++;
      if (qr.isCorrect) {
        topicPerformance[topic].correct++;
      } else {
        wrongAnswers.push(qr);
      }
    });
  });

  const weakTopics = Object.entries(topicPerformance)
    .map(([topic, perf]) => ({
      topic,
      accuracy: Math.round((perf.correct / perf.total) * 100),
      questionsWrong: perf.total - perf.correct,
    }))
    .filter((t) => t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy);
  const conceptCounts: { [key: string]: number } = {};
  wrongAnswers.forEach((answer) => {
    const diagnostic = answer.diagnosticValue.toLowerCase();
    const keywords = [
      "time complexity",
      "space complexity",
      "algorithm",
      "big o",
      "logarithmic",
      "linear",
      "quadratic",
      "recursion",
      "iteration",
    ];
    keywords.forEach((keyword) => {
      if (diagnostic.includes(keyword)) {
        conceptCounts[keyword] = (conceptCounts[keyword] || 0) + 1;
      }
    });
  });

  const weakConcepts = Object.entries(conceptCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([concept, count]) => ({ concept, count }));
  const sampleWrongQuestions = wrongAnswers.slice(0, 5).map((q) => ({
    question: q.question,
    diagnostic: q.diagnosticValue,
  }));
  return {
    weakTopics,
    weakConcepts,
    sampleWrongQuestions,
  };
}

function buildTargetedPrompt(analysis: any, numberOfQuestions: number): string {
  const weakTopicsText = analysis.weakTopics
    .map((t: any) => `${t.topic} (${t.accuracy}% accuracy)`)
    .join(", ");
  const weakConceptsText = analysis.weakConcepts
    .map((c: any) => c.concept)
    .join(", ");
  const sampleQuestionsText = analysis.sampleWrongQuestions
    .map(
      (q: any, i: number) => `${i + 1}. ${q.question}\nIssue: ${q.diagnostic}`,
    )
    .join("\n\n");
  return `You are creating a TARGETED practice quiz.
            WEAK TOPICS: ${weakTopicsText}
            WEAK CONCEPTS: ${weakConceptsText}

            WRONG QUESTIONS:
            ${sampleQuestionsText}
            TASK:
            Generate exactly ${numberOfQuestions} MCQs targeting these weaknesses.
            STRICT RULE:
            Return ONLY valid JSON array. No explanation. No markdown.
            FORMAT:
                    [
                        {
                            "id": 1,
                            "question": "Question?",
                            "options": ["a)", "b)", "c)", "d)"],
                            "correctAnswer": "b)",
                            "topic": "${analysis.weakTopics[0]?.topic || "General"}",
                            "difficulty": "easy",
                            "diagnosticValue": "Tests concept",
                            "targetedAt": "specific weakness"
                        }
                    ]`;
}
