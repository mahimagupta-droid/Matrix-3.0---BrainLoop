"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopicSelector from "@/lib/components/TopicSelector";
import { useAuth } from "@clerk/nextjs";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: string;
  diagnosticValue: string;
}
interface QuizMetadata {
  topic: string;
  difficulty: string;
  count: number;
  generatedAt: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { userId, isLoaded } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [metadata, setMetadata] = useState<QuizMetadata | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const baseKey = userId ? `_${userId}` : "";
    const storedQuestions = localStorage.getItem(`brainloop_questions${baseKey}`);
    const storedMetadata = localStorage.getItem(`brainloop_meta${baseKey}`);

    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        setQuestions(parsedQuestions);

        if (storedMetadata) {
          const parsedMeta = JSON.parse(storedMetadata);
          setMetadata(parsedMeta);
          setTopic(parsedMeta.topic || 'Practice');
        } else {
          setTopic('Practice');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading quiz:', error);
        setLoading(false);
      }
    } else {
      setQuestions([]);
      setLoading(false);
    }
  }, [router, userId, isLoaded]);

  const handleOptionSelect = (questionId: number, option: string) => {
    if (!isSubmitted) {
      setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedOptions[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);

    // Scroll to top to see results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setSelectedOptions({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewTopic = () => {
    const baseKey = userId ? `_${userId}` : "";
    localStorage.removeItem(`brainloop_questions${baseKey}`);
    localStorage.removeItem(`brainloop_meta${baseKey}`);
    router.push('/');
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🎉 Perfect Score! Outstanding!";
    if (percentage >= 80) return "🌟 Excellent Work! Keep it up!";
    if (percentage >= 60) return "👍 Good Job! You're making progress!";
    if (percentage >= 40) return "📚 Keep Learning! Review the explanations.";
    return "💪 Don't Give Up! Practice makes perfect.";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--muted)">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-(--primary) mx-auto mb-4"></div>
          <p className="text-lg text-(--card-textColor)">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen py-16 bg-(--muted) px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-(--primary) mb-2">Load the quiz</h2>
          <TopicSelector />
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(selectedOptions).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen px-6 py-12 bg-(--muted)">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 bg-(--card) p-6 rounded-xl border border-(--border) shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-(--primary) mb-2">
                {topic}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-(--card-textColor)">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {questions.length} questions
                </span>
                {metadata && (
                  <span className="flex items-center gap-1 capitalize">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {metadata.difficulty} difficulty
                  </span>
                )}
              </div>
            </div>
            {!isSubmitted && (
              <button
                onClick={handleNewTopic}
                className="text-sm text-(--card-textColor) hover:text-(--primary) transition"
              >
                ← Back
              </button>
            )}
          </div>
          {!isSubmitted && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-(--card-textColor) mb-2">
                <span>Progress</span>
                <span>{answeredCount} of {questions.length} answered</span>
              </div>
              <div className="w-full bg-(--muted) rounded-full h-2">
                <div
                  className="bg-(--primary) h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        {isSubmitted && (
          <div className="mb-8 p-8 bg-(--card) border-2 border-(--primary) rounded-xl text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {getScoreMessage()}
            </h2>
            <div className="mb-6">
              <p className={`text-6xl font-bold ${getScoreColor()}`}>
                {score}/{questions.length}
              </p>
              <p className="text-lg text-(--card-textColor) mt-2">
                {Math.round((score / questions.length) * 100)}% correct
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-bold text-2xl">{score}</p>
                <p className="text-green-600">Correct</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-800 font-bold text-2xl">{questions.length - score}</p>
                <p className="text-red-600">Incorrect</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 font-bold text-2xl">{questions.length}</p>
                <p className="text-blue-600">Total</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="bg-(--secondary) text-(--secondary-textColor) px-6 py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry Quiz
              </button>
              <button
                onClick={handleNewTopic}
                className="bg-(--primary) text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                New Topic
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 mb-8">
          {questions.map((question, index) => {
            const isCorrect = selectedOptions[question.id] === question.correctAnswer;
            const isWrong = isSubmitted && selectedOptions[question.id] && !isCorrect;
            const isAnswered = selectedOptions[question.id] !== undefined;
            return (
              <div
                key={question.id}
                className={`bg-(--card) border rounded-xl p-6 shadow-sm transition-all ${isSubmitted
                    ? isCorrect
                      ? 'border-green-500 border-2 shadow-green-100'
                      : isWrong
                        ? 'border-red-500 border-2 shadow-red-100'
                        : 'border-(--border)'
                    : isAnswered
                      ? 'border-(--primary) shadow-md'
                      : 'border-(--border)'
                  }`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <p className="text-lg font-semibold text-(--primary) flex-1 leading-relaxed">
                    <span className="text-(--card-textColor) font-normal mr-2">Q{index + 1}.</span>
                    {question.question}
                  </p>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${question.difficulty === 'easy'
                        ? 'bg-green-100 text-green-800'
                        : question.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {question.difficulty}
                    </span>
                    {isSubmitted && (
                      <span className={`text-xs font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3 mb-4">
                  {question.options.map((option) => {
                    const isSelected = selectedOptions[question.id] === option;
                    const isCorrectOption = option === question.correctAnswer;
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(question.id, option)}
                        disabled={isSubmitted}
                        className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${isSubmitted
                            ? isCorrectOption
                              ? 'bg-green-50 border-green-500 font-medium shadow-sm'
                              : isSelected && !isCorrectOption
                                ? 'bg-red-50 border-red-500 shadow-sm'
                                : 'border-(--border) bg-white opacity-50'
                            : isSelected
                              ? 'border-(--primary) bg-blue-50 shadow-md transform scale-[1.02]'
                              : 'border-(--border) bg-white hover:border-(--primary) hover:bg-(--muted) hover:shadow-sm'
                          } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{option}</span>
                          {isSubmitted && isCorrectOption && (
                            <span className="ml-3 text-green-600 font-bold text-lg">✓</span>
                          )}
                          {isSubmitted && isSelected && !isCorrectOption && (
                            <span className="ml-3 text-red-600 font-bold text-lg">✗</span>
                          )}
                          {!isSubmitted && isSelected && (
                            <span className="ml-3 text-(--primary)">●</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {isSubmitted && (
                  <div className="mt-5 p-5 bg-(--muted) rounded-lg border border-(--border)">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-(--primary) flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-(--primary) mb-2">
                          📚 Learning Insight
                        </p>
                        <p className="text-sm text-(--card-textColor) leading-relaxed">
                          {question.diagnosticValue}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!isSubmitted && (
          <div className="sticky bottom-6 z-10">
            <button
              onClick={handleSubmit}
              disabled={unansweredCount > 0}
              className="w-full bg-(--primary) text-white px-8 py-5 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl flex items-center justify-center gap-3"
            >
              {unansweredCount === 0 ? (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Quiz
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Answer {unansweredCount} more question{unansweredCount !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
