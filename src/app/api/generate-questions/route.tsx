/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

const MODEL_ID = "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error: GEMINI_API_KEY is not set." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { topic, difficulty, numberOfQuestions } = body;

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    const questionCount = Math.min(Math.max(numberOfQuestions || 10, 5), 20);
    const prompt = `Generate exactly ${questionCount} multiple-choice questions about "${topic}" for an adaptive learning platform.

Requirements:
- Difficulty level: ${difficulty || "mixed (easy, medium, hard)"}
- Each question MUST have exactly 4 options labeled as "a) ...", "b) ...", "c) ...", "d) ..."
- Include the correct answer in the exact format shown in options
- Add a "diagnosticValue" field (2-3 sentences)
- Cover different aspects of the topic
- Make questions progressively challenging

CRITICAL: Return ONLY a valid JSON array. No markdown. No backticks.
Format:
[
  {
    "id": 1,
    "question": "Question?",
    "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
    "correctAnswer": "b) ...",
    "topic": "${topic}",
    "difficulty": "easy",
    "diagnosticValue": "..."
  }
]`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    });

    const responseText = result.response.text().trim();

    if (!responseText) {
      return NextResponse.json(
        { error: "Empty response from Gemini API." },
        { status: 500 },
      );
    }

    let questions;
    try {
      let cleaned = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const start = cleaned.indexOf("[");
      const end = cleaned.lastIndexOf("]");
      if (start !== -1 && end !== -1) {
        cleaned = cleaned.substring(start, end + 1);
      }

      questions = JSON.parse(cleaned);
      if (!Array.isArray(questions)) {
        throw new Error("Parsed response is not an array.");
      }

      questions = questions.map((q: any, index: number) => ({
        id: q.id || index + 1,
        question: q.question || "",
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: q.correctAnswer || "",
        topic: q.topic || topic,
        difficulty: q.difficulty || difficulty || "medium",
        diagnosticValue: q.diagnosticValue || "No diagnostic info available",
      }));
    } catch (err) {
      console.error("Parsing error:", err, "raw response:", responseText);
      return NextResponse.json(
        {
          error: "Failed to parse AI response.",
          details: err instanceof Error ? err.message : "Unknown parsing error.",
        },
        { status: 500 },
      );
    }

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No questions generated." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      questions,
      metadata: {
        topic,
        difficulty: difficulty || "mixed",
        count: questions.length,
        generatedAt: new Date().toISOString(),
        model: MODEL_ID,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate questions.",
        details: error instanceof Error ? error.message : "Unknown error.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Gemini API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
}
