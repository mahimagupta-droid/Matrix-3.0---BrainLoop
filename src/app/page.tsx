import Link from "next/link";
import { MagnifyingGlassIcon, ChatBubbleLeftRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import TopicSelector from "@/lib/components/TopicSelector";

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <section className="px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-(--primary)">
            AI-Powered Adaptive Learning
          </h1>
          <p className="text-lg text-(--card-textColor) max-w-2xl">
            Diagnose weak topics. Explain mistakes. Reinforce understanding.
            Master any subject faster.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/quiz">
              <button className="bg-(--primary) text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition cursor-pointer">
                Start Practicing
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-(--secondary) text-(--secondary-textColor) px-6 py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-6 bg-(--muted) py-16 rounded-lg">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold">
            The Problem
          </h2>
          <p className="text-(--card-textColor) leading-relaxed">
            Traditional practice questions tell you if you&apos;re wrong, but not WHY.
            You repeat the same mistakes, lose confidence, and struggle with topics.
            Without personalized feedback, improvement slows down.
          </p>
        </div>
      </section>
      <section className="px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 py-20">
          <h2 className="text-3xl font-semibold text-center">
            Our Solution
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-(--card) p-6 rounded-lg border border-(--border) flex flex-col gap-3 hover:shadow-md transition justify-center items-center">
              <h3 className="text-xl font-semibold flex gap-2">
                <MagnifyingGlassIcon width={24} height={24} />
                Diagnose
              </h3>
              <p className="text-(--card-textColor)">
                AI analyzes your answers to identify exactly which concepts you&apos;re struggling with.
              </p>
            </div>
            <div className="bg-(--card) p-6 rounded-lg border border-(--border) flex flex-col gap3 hover:shadow-md transition justify-center items-center">
              <h3 className="text-xl font-semibold flex gap-2">
                <ChatBubbleLeftRightIcon width={24} height={24} />
                Explain
              </h3>
              <p className="text-(--card-textColor)">
                Get personalized explanations tailored to your specific mistake.
              </p>
            </div>
            <div className="bg-(--card) p-6 rounded-lg border border-(--border) flex flex-col gap-3 hover:shadow-md transition justify-center items-center">
              <h3 className="text-lg font-semibold flex gap-2">
                <ArrowPathIcon width={24} height={24} />
                Reinforce
              </h3>
              <p className="text-(--card-textColor)">
                Practice adaptive sequences from easy to hard until mastery.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 bg-(--muted) py-16 w-[70%] text-lg rounded-lg" id="features">
        <h1 className="text-3xl font-semibold text-center mb-10">Our USP</h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-(--primary)">3x</h3>
            <p className="text-(--card-textColor)">Faster improvement</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-(--primary)">100%</h3>
            <p className="text-(--card-textColor)">Personalized feedback</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-(--primary)">∞</h3>
            <p className="text-(--card-textColor)">Questions available</p>
          </div>
        </div>
      </section>
      <section className="px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 py-20">
          <h2 className="text-3xl font-semibold text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">1. Attempt Questions</h3>
              <p className="text-(--card-textColor)">
                Solve practice questions to test your understanding.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">2. Get Feedback</h3>
              <p className="text-(--card-textColor)">
                Receive detailed AI explanations for mistakes.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">3. Practice More</h3>
              <p className="text-(--card-textColor)">
                Reinforce learning with adaptive follow-ups.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-12 w-full max-w-4xl">
        <TopicSelector />
      </section>
      <section className="px-6 py-20 bg-(--primary) text-white rounded-lg mb-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold">
            Ready to Master Your Topics?
          </h2>
          <p className="opacity-90">
            Start practicing smarter today. Get instant AI feedback and watch your improvement accelerate.
          </p>
          <button className="bg-white text-(--primary) px-6 py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
            <Link href="/quiz">Get Started</Link>
          </button>
        </div>
      </section>
    </main>
  );
}