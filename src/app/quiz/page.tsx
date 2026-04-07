/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import TopicSelector from "@/lib/components/TopicSelector";
import Link from "next/link";
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: string;
  diagnosticValue: string;
}

export default function QuizPageWithTracking() {
  const router = useRouter();
  const { user } = useUser();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    const storedTopic = sessionStorage.getItem('quizTopic');
    const storedMetadata = sessionStorage.getItem('quizMetadata');

    if (storedQuestions) {
      try {
        setQuestions(JSON.parse(storedQuestions));
        setTopic(storedTopic || 'Practice');
        if (storedMetadata) {
          setMetadata(JSON.parse(storedMetadata));
        }
        setStartTime(Date.now());
      } catch (error) {
        console.error('Error loading quiz:', error);
      }
    }

    setLoading(false);
  }, [router]);

  const handleOptionSelect = (questionId: number, option: string) => {
    if (!isSubmitted) {
      setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = async () => {
    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (selectedOptions[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);

    // Save results to database
    if (user) {
      await saveQuizResults();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveQuizResults = async () => {
    setSaving(true);
    try {
      const timeTaken = Math.round((Date.now() - startTime) / 1000); // in seconds

      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty: metadata?.difficulty || 'mixed',
          questions,
          selectedAnswers: selectedOptions,
          timeTaken
        })
      });

      const bodyText = await response.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(`Invalid JSON response from /api/quiz/submit: ${bodyText.slice(0, 300)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || `Request failed: ${bodyText.slice(0, 300)}`);
      }

      console.log('Quiz results saved:', data);
      sessionStorage.setItem('lastQuizResultId', data.result.quizResultId);
    } catch (error) {
      console.error('Error saving quiz results:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRetry = () => {
    setSelectedOptions({});
    setIsSubmitted(false);
    setScore(0);
    setStartTime(Date.now());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewTopic = () => {
    sessionStorage.removeItem('quizQuestions');
    sessionStorage.removeItem('quizTopic');
    sessionStorage.removeItem('quizMetadata');
    setQuestions([]);
    setSelectedOptions({});
    setIsSubmitted(false);
    setScore(0);
    setTopic('');
    setMetadata(null);
  };

  const handleViewWeakAreas = () => {
    router.push('/weak-areas');
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

  if (!loading && questions.length === 0) {
    return (
      <div className="min-h-screen px-6 py-16 bg-(--muted)">
        <TopicSelector
          onGenerated={(qs, generatedTopic, generatedMetadata) => {
            setQuestions(qs);
            setTopic(generatedTopic);
            setMetadata(generatedMetadata);
            setStartTime(Date.now());
          }}
        />
      </div>
    );
  }

  const answeredCount = Object.keys(selectedOptions).length;
  const scorePercentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen px-6 py-12 bg-(--muted)">
      <div className="w-full max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 bg-(--card) p-6 rounded-xl border border-(--border) shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-(--primary) mb-2">{topic}</h1>
              <p className="text-sm text-(--card-textColor)">
                {questions.length} questions • {metadata?.difficulty || 'Mixed'} difficulty
              </p>
            </div>
            {!isSubmitted && (
              <button
                onClick={handleNewTopic}
                className="text-sm text-(--card-textColor) hover:text-(--primary)"
              >
                ← Back
              </button>
            )}
          </div>

          {!isSubmitted && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-(--card-textColor) mb-2">
                <span>Progress</span>
                <span>{answeredCount} of {questions.length}</span>
              </div>
              <div className="w-full bg-(--muted) rounded-full h-2">
                <div 
                  className="bg-(--primary) h-2 rounded-full transition-all"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Banner with Weak Areas CTA */}
        {isSubmitted && (
          <div className="mb-8 space-y-4">
            <div className="p-8 bg-(--card) border-2 border-(--primary) rounded-xl text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Quiz Complete!</h2>
              <p className="text-6xl font-bold text-(--primary) mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-lg text-(--card-textColor) mb-6">{scorePercentage}% correct</p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleRetry}
                  className="bg-(--secondary) text-(--secondary-textColor) px-6 py-3 rounded-lg hover:opacity-90"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={handleNewTopic}
                  className="bg-(--primary) text-white px-6 py-3 rounded-lg hover:opacity-90"
                >
                  New Topic
                </button>
              </div>

              {saving && (
                <p className="text-xs text-(--muted-textColor) mt-4">
                  Saving your results...
                </p>
              )}
            </div>

            {/* Weak Areas CTA - Only show if score < 80% */}
            {scorePercentage < 80 && user && (
              <div className="bg-[#FA989A] rounded-xl p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Want to Improve?</h3>
                    <p className="opacity-90 mb-4">
                      Get a personalized quiz targeting your weak areas based on the questions you got wrong!
                    </p>
                  </div>
                  {/* <span className="text-4xl">📈</span> */}
                </div>
                <button
                  onClick={handleViewWeakAreas}
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Practice Weak Areas →
                </button>
              </div>
            )}

            {scorePercentage === 100 && (
              <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
                {/* <span className="text-6xl mb-4 block">🎉</span> */}
                <h3 className="text-2xl font-bold mb-2">Perfect Score!</h3>
                <p className="opacity-90">You&apos;ve mastered this topic. Keep up the great work!</p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-6 mb-4">
          {questions.map((question, index) => {
            const isCorrect = selectedOptions[question.id] === question.correctAnswer;
            const isWrong = isSubmitted && selectedOptions[question.id] && !isCorrect;
            const isAnswered = selectedOptions[question.id] !== undefined;
            
            return (
              <div
                key={question.id}
                className={`bg-(--card) border rounded-xl p-6 shadow-sm transition-all ${
                  isSubmitted 
                    ? isCorrect 
                      ? 'border-green-500 border-2' 
                      : isWrong 
                      ? 'border-red-500 border-2' 
                      : 'border-(--border)'
                    : isAnswered
                    ? 'border-(--primary) shadow-md'
                    : 'border-(--border)'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <p className="text-lg font-semibold text-(--primary) flex-1">
                    <span className="text-(--card-textColor) mr-2">Q{index + 1}.</span>
                    {question.question}
                  </p>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
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
                        className={`text-left px-5 py-4 rounded-lg border-2 transition-all ${
                          isSubmitted
                            ? isCorrectOption
                              ? 'bg-green-50 border-green-500 font-medium'
                              : isSelected && !isCorrectOption
                              ? 'bg-red-50 border-red-500'
                              : 'border-(--border) bg-white opacity-50'
                            : isSelected
                            ? 'border-(--primary) bg-blue-50 shadow-md'
                            : 'border-(--border) bg-white hover:border-(--primary) hover:bg-(--muted)'
                        } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{option}</span>
                          {isSubmitted && isCorrectOption && <span className="text-green-600 text-lg">✓</span>}
                          {isSubmitted && isSelected && !isCorrectOption && <span className="text-red-600 text-lg">✗</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="mt-5 p-5 bg-(--muted) rounded-lg border border-(--border)">
                    <p className="text-sm font-medium text-(--primary) mb-2">Learning Insight:</p>
                    <p className="text-sm text-(--card-textColor)">{question.diagnosticValue}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isSubmitted && (
          <div className="sticky bottom-0 pb-6 pt-4 bg-(--muted)">
            <button
              onClick={handleSubmit}
              disabled={answeredCount !== questions.length}
              className="w-full bg-(--primary) text-white px-8 py-5 rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
            >
              {answeredCount === questions.length
                ? 'Submit Quiz'
                : `Answer ${questions.length - answeredCount} more questions`
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
