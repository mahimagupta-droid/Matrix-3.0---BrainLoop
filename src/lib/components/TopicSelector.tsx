"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { AcademicCapIcon, SparklesIcon, AdjustmentsHorizontalIcon, HashtagIcon } from "@heroicons/react/24/outline";

type Difficulty = "easy" | "medium" | "hard" | "mixed";
interface GeneratePayload {
  topic: string;
  difficulty: Difficulty;
  numberOfQuestions: number;
}

interface TopicSelectorProps {
  // When provided, questions are passed directly to the caller instead of saving to localStorage and navigating.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onGenerated?: (questions: any[], topic: string, metadata: any) => void;
}

const SUGGESTED_TOPICS = [
  "JavaScript Promises",
  "Binary Search",
  "React Hooks",
  "SQL Joins",
  "Machine Learning Basics",
  "World War II",
  "Calculus Derivatives",
  "Newton's Laws",
  "Python Data Structures",
  "Photosynthesis Process",
  "Life Processes",
  "Finite Automata",
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; description: string; color: string }[] = [
  { value: "easy",   label: "Easy",   description: "Foundational concepts", color: "var(--success)" },
  { value: "medium", label: "Medium", description: "Applied understanding",  color: "var(--warning)" },
  { value: "hard",   label: "Hard",   description: "Advanced & edge cases",  color: "var(--danger)"  },
  { value: "mixed",  label: "Mixed",  description: "All difficulty levels",  color: "var(--primary)" },
];

export default function TopicSelector({ onGenerated }: TopicSelectorProps = {}) {
  const router = useRouter();
  const { userId } = useAuth();

  const [topic,             setTopic            ] = useState("");
  const [difficulty,        setDifficulty       ] = useState<Difficulty>("mixed");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [isLoading,         setIsLoading        ] = useState(false);
  const [error,             setError            ] = useState<string | null>(null);

  const handleSuggestedTopic = (suggested: string) => {
    setTopic(suggested);
    setError(null);
  };

  const handleGenerate = async () => {
    const trimmed = topic.trim();

    if (!trimmed) {
      setError("Please enter a topic before generating a quiz.");
      return;
    }
    if (trimmed.length < 3) {
      setError("Topic must be at least 3 characters long.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const payload: GeneratePayload = {
        topic: trimmed,
        difficulty,
        numberOfQuestions,
      };

      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate questions.");
      }

      if (onGenerated) {
        onGenerated(data.questions, trimmed, data.metadata);
      } else {
        const baseKey = userId ? `_${userId}` : "";
        localStorage.setItem(`brainloop_questions${baseKey}`, JSON.stringify(data.questions));
        localStorage.setItem(`brainloop_meta${baseKey}`, JSON.stringify(data.metadata));
        router.push("/quiz");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-(--primary)">
          Generate Your Quiz
        </h2>
        <p className="text-(--card-textColor) text-sm">
          Enter any topic and let AI craft a personalised set of questions for you.
        </p>
      </div>
      <div className="bg-(--card) border border-(--border) rounded-2xl p-7 shadow-sm flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <AcademicCapIcon className="w-4 h-4 text-(--primary)" />
            Topic
          </label>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => { setTopic(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. React Hooks, Binary Search, Photosynthesis…"
              maxLength={100}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-(--border) bg-(--input)
                         text-foreground placeholder-(--muted-textColor)
                         focus:outline-none focus:ring-2 focus:ring-(--ring)
                         transition text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-(--muted-textColor)">
              {topic.length}/100
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {SUGGESTED_TOPICS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestedTopic(s)}
                className="text-xs px-3 py-1 rounded-full border border-(--border)
                           bg-(--muted) text-(--card-textColor)
                           hover:border-(--primary) hover:text-(--primary)
                           transition cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <AdjustmentsHorizontalIcon className="w-4 h-4 text-(--primary)" />
            Difficulty
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => {
              const active = difficulty === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  style={active ? { borderColor: opt.color, color: opt.color } : {}}
                  className={`flex flex-col items-center gap-0.5 px-3 py-3 rounded-lg border
                              text-xs font-medium transition cursor-pointer
                              ${active
                                ? "bg-(--muted) border-2"
                                : "border-(--border) text-(--card-textColor) hover:bg-(--muted)"
                              }`}
                >
                  <span className="font-semibold text-sm">{opt.label}</span>
                  <span className="opacity-70">{opt.description}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <HashtagIcon className="w-4 h-4 text-(--primary)" />
            Number of Questions
            <span className="ml-auto text-(--primary) font-bold text-base">
              {numberOfQuestions}
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={20}
            step={1}
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="w-full accent-(--primary) cursor-pointer"
          />
          <div className="flex justify-between text-xs text-(--muted-textColor)">
            <span>5 (quick)</span>
            <span>10 (standard)</span>
            <span>20 (deep dive)</span>
          </div>
        </div>
        {error && (
          <div className="text-sm text-(--danger-textColor) bg-(--danger) bg-opacity-10
                          border border-(--danger) rounded-lg px-4 py-3">
            ⚠️ {error}
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2
                     bg-(--primary) text-white font-semibold
                     py-3 rounded-lg transition cursor-pointer
                     hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Generating your quiz…
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Generate Quiz
            </>
          )}
        </button>
      </div>
    </div>
  );
}
