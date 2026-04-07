"use client";
import { useState } from "react";
export default function AITutor({ context = "" }: { context?: string }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [loading, setLoading] = useState(false);
  const askTutor = async () => {
    if (!question.trim()) return;
    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ question, context })
      });
      const bodyText = await res.text();
      let data;
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(`Invalid JSON response from /api/tutor: ${bodyText.slice(0, 300)}`);
      }
      if (!res.ok) {
        throw new Error(data.error || data.details || `Request failed: ${bodyText.slice(0, 300)}`);
      }
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response
      }]);
      await fetch('/api/tutor/history', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          question,
          response: data.response,
          context
        })
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-(--card) rounded-xl border border-(--border) p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        {/* <div className="w-10 h-10 rounded-full bg-(--primary) flex items-center justify-center text-white">
          AI Tutor
        </div> */}
        <div>
          <h3 className="font-semibold text-(--primary)">AI Tutor</h3>
          <p className="text-xs text-(--card-textColor)">Ask me anything!</p>
        </div>
      </div>
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`rounded-lg p-3 max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-(--primary) text-white' 
                : 'bg-(--muted) text-foreground'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="bg-(--muted) rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-(--primary) rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-(--primary) rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-(--primary) rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askTutor()}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 rounded-lg border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--ring)"
          disabled={loading}
        />
        <button
          onClick={askTutor}
          disabled={loading || !question.trim()}
          className="bg-(--primary) text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}