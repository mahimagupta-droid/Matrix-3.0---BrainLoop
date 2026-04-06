// "use client";
// import { questions } from "@/lib/assets/questions";
// export default function QuizPage() {
//   return (
//     <div className="flex flex-col items-center justify-start min-h-[10vh]">
//       {questions.map((question, index) => (
//         <div key={index} className="flex flex-col items-center justify-start min-h-[20vh]">
//           <p>{question.question}</p>
//           <ul>
//             {question.options.map((option) => (
//               <li key={option}>{option}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";
import { questions } from "@/lib/assets/questions";

export default function QuizPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-[var(--muted)] flex justify-center">
      
      <div className="w-full max-w-3xl flex flex-col gap-8">

        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm flex flex-col gap-5"
          >
            
            {/* Question */}
            <p className="text-lg font-semibold text-[var(--primary)]">
              Q{index + 1}. {question.question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  className="text-left px-4 py-3 rounded-lg border border-[var(--border)] bg-white hover:bg-[var(--muted)] transition"
                >
                  {option}
                </button>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}