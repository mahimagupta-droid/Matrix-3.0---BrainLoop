"use client";
import { questions } from "@/lib/assets/questions";
import { useState } from "react";

export default function QuizPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const handleOptionSelect = (questionIndex: number, option: string) => {
    try {
      setSelectedOptions((prev) => ({ ...prev, [questionIndex]: option }));
    } catch (error) {

    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-(--muted) flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-9 mb-15 mt-10">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-(--card) border border-(--border) rounded-xl p-6 shadow-sm flex flex-col gap-5"
          >
            <p className="text-lg font-semibold text-(--primary)">
              Q{index + 1}. {question.question}
            </p>
            <div className="flex flex-col gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  className="text-left px-4 py-3 rounded-lg border border-(--border) bg-white hover:bg-(--muted) transition"
                >
                  {option}
                </button>
              ))}
            </div>

          </div>
        ))}
        <button className="bg-(--primary) text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
}