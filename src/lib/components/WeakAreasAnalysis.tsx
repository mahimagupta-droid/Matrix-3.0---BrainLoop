/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WeakAreasAnalysis() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [expandedQuizData, setExpandedQuizData] = useState<any>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    Promise.all([fetchWeakAreas(), fetchQuizHistory()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const fetchWeakAreas = async () => {
    try {
      const response = await fetch("/api/weak-areas");
      const bodyText = await response.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(
          `Invalid JSON response from /api/weak-areas: ${bodyText.slice(0, 300)}`
        );
      }
      if (!response.ok) {
        throw new Error(
          data.error ||
            data.details ||
            `Request failed: ${bodyText.slice(0, 300)}`
        );
      }
      setAnalysis(data);
    } catch (error) {
      console.error("Error fetching weak areas:", error);
      setAnalysis({
        hasData: false,
        message: "Unable to fetch weak areas at this time.",
      });
    }
  };

  const fetchQuizHistory = async () => {
    try {
      const response = await fetch("/api/quiz/history?limit=20");
      const data = await response.json();
      if (response.ok) {
        setQuizHistory(data.quizzes || []);
      }
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    }
  };

  const fetchQuizDetail = async (quizId: string) => {
    if (expandedQuiz === quizId) {
      setExpandedQuiz(null);
      setExpandedQuizData(null);
      return;
    }
    setExpandedQuiz(quizId);
    setLoadingQuiz(true);
    try {
      const response = await fetch(`/api/quiz/${quizId}`);
      const data = await response.json();
      if (response.ok) {
        setExpandedQuizData(data.quiz);
      }
    } catch (error) {
      console.error("Error fetching quiz detail:", error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const generateTargetedQuiz = async () => {
    setGenerating(true);
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 90));
    }, 500);

    try {
      const response = await fetch("/api/generate-targeted-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numberOfQuestions: 10 }),
      });

      const bodyText = await response.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(
          `Invalid JSON response: ${bodyText.slice(0, 300)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.details || `Request failed: ${bodyText.slice(0, 300)}`
        );
      }

      setProgress(100);

      sessionStorage.setItem("quizQuestions", JSON.stringify(data.questions));
      sessionStorage.setItem("quizTopic", "Targeted Practice (Weak Areas)");
      sessionStorage.setItem("quizMetadata", JSON.stringify(data.metadata));

      setTimeout(() => {
        router.push("/quiz");
      }, 500);
    } catch (error) {
      console.error("Error generating targeted quiz:", error);
      alert(error instanceof Error ? error.message : "Failed to generate quiz");
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setGenerating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds: number | null) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--primary)"></div>
      </div>
    );
  }

  if (!analysis?.hasData) {
    return (
      <div className="bg-(--card) rounded-xl border border-(--border) p-8 text-center">
        <div className="w-16 h-16 bg-(--muted) rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-(--primary)"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2 text-(--primary)">No Data Yet</h3>
        <p className="text-(--card-textColor) mb-6">
          Take some quizzes first, and we&apos;ll analyze your weak areas!
        </p>
        <button
          onClick={() => router.push("/quiz")}
          className="bg-(--primary) text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Start Practicing
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <p className="text-sm text-(--card-textColor)">Quizzes Taken</p>
              <p className="text-2xl font-bold text-(--primary)">
                {analysis.summary.totalQuizzes}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-(--card-textColor)">Average Score</p>
              <p className="text-2xl font-bold text-(--primary)">
                {analysis.summary.averageScore}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <p className="text-sm text-(--card-textColor)">Weak Topics</p>
              <p className="text-2xl font-bold text-(--primary)">
                {analysis.weakTopics.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Targeted Quiz */}
      <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              🎯 Practice Your Weak Areas
            </h2>
            <p className="opacity-90">
              AI-generated quiz targeting your specific struggles
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-xs opacity-80">Powered by AI</p>
          </div>
        </div>
        {generating && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Analyzing your weak areas...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <button
          onClick={generateTargetedQuiz}
          disabled={generating}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {generating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating Quiz...
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate Targeted Quiz
            </>
          )}
        </button>
      </div>

      {/* Weak Topics */}
      {analysis.weakTopics.length > 0 && (
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <h3 className="text-xl font-bold mb-4 text-(--primary) flex items-center gap-2">
            <span>📊</span>
            Topics Needing Improvement
          </h3>
          <div className="space-y-3">
            {analysis.weakTopics.map((topic: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {topic.topic}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        topic.accuracy >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {topic.accuracy}% accuracy
                    </span>
                  </div>
                  <div className="w-full bg-(--muted) rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        topic.accuracy >= 50 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${topic.accuracy}%` }}
                    />
                  </div>
                  <p className="text-xs text-(--card-textColor) mt-1">
                    {topic.questionsWrong} questions wrong
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weak Concepts */}
      {analysis.topWeakConcepts.length > 0 && (
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <h3 className="text-xl font-bold mb-4 text-(--primary) flex items-center gap-2">
            <span>🔍</span>
            Specific Concepts to Focus On
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.topWeakConcepts.map((concept: any, index: number) => (
              <div
                key={index}
                className="bg-(--muted) px-4 py-2 rounded-full border border-(--border)"
              >
                <span className="font-medium text-foreground capitalize">
                  {concept.concept}
                </span>
                <span className="ml-2 text-xs text-(--card-textColor)">
                  ({concept.occurrences} times)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
            <span>💡</span>
            Recommendations
          </h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-blue-800">
                <span className="text-blue-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz History — each quiz as a separate session */}
      {quizHistory.length > 0 && (
        <div className="bg-(--card) rounded-xl border border-(--border) p-6">
          <h3 className="text-xl font-bold mb-4 text-(--primary) flex items-center gap-2">
            <span>📋</span>
            Quiz Sessions
          </h3>
          <div className="space-y-3">
            {quizHistory.map((quiz: any) => (
              <div key={quiz.id} className="border border-(--border) rounded-lg overflow-hidden">
                <button
                  onClick={() => fetchQuizDetail(quiz.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-(--muted) transition text-left cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-foreground">
                        {quiz.topic}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          quiz.score >= 80
                            ? "bg-green-100 text-green-800"
                            : quiz.score >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {quiz.score}%
                      </span>
                    </div>
                    <p className="text-xs text-(--card-textColor)">
                      {formatDate(quiz.timestamp)} · {quiz.correctAnswers}/
                      {quiz.totalQuestions} correct · {formatTime(quiz.timeTaken)}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-(--card-textColor) transition-transform ${
                      expandedQuiz === quiz.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedQuiz === quiz.id && (
                  <div className="border-t border-(--border) p-4 bg-(--muted)">
                    {loadingQuiz ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-(--primary)"></div>
                      </div>
                    ) : expandedQuizData ? (
                      <div className="space-y-3">
                        {expandedQuizData.questionResults.map(
                          (qr: any, i: number) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg border ${
                                qr.isCorrect
                                  ? "bg-green-50 border-green-200"
                                  : "bg-red-50 border-red-200"
                              }`}
                            >
                              <p className="text-sm font-medium text-foreground mb-1">
                                Q{i + 1}. {qr.question}
                              </p>
                              <p className="text-xs text-(--card-textColor)">
                                Your answer:{" "}
                                <span
                                  className={
                                    qr.isCorrect
                                      ? "text-green-700 font-medium"
                                      : "text-red-700 font-medium"
                                  }
                                >
                                  {qr.selectedAnswer}
                                </span>
                              </p>
                              {!qr.isCorrect && (
                                <p className="text-xs text-green-700 mt-0.5">
                                  Correct: {qr.correctAnswer}
                                </p>
                              )}
                              <p className="text-xs text-(--card-textColor) mt-1 italic">
                                {qr.diagnosticValue}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-(--card-textColor)">
                        Could not load quiz details.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
