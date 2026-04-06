import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    return NextResponse.json(
      { error: "Server configuration error: GEMINI_API_KEY is not set." },
      { status: 500 },
    );
  }

  const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const authObj = auth();
    if (!(await authObj).userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { topic, difficulty, numberOfQuestions } = body;

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

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

    const result = await genAI.models.generateContent({
      model: MODEL_ID,
      contents: [{ text: prompt }],
    });

    const responseText =
      result.text?.trim() ||
      (result.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();

    if (!responseText) {
      console.error("Gemini returned an empty response", JSON.stringify(result, null, 2));
      return NextResponse.json(
        {
          error: "Empty response from Gemini API.",
          details: "The Gemini response did not contain any text output.",
        },
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

      questions = questions.map((q, index) => ({
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
          raw: responseText,
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
