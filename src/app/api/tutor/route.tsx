import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY");
    return NextResponse.json(
      { error: "Server configuration error: GEMINI_API_KEY is not set." },
      { status: 500 }
    );
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  try {
    const { question, context } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    const prompt = `You are a helpful tutor.

Context:
${context || "No additional context provided."}

Student question:
${question}

Provide a clear, concise explanation.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json(
      {
        error: "Failed to get response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}