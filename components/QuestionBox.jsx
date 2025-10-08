import { useState } from "react";

export default function QuestionBox({ q, onAnswer }) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="p-2 border rounded mb-2">
      <p>{q}</p>
      <textarea
        className="w-full border p-1 mb-1"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-2 py-1 rounded"
        onClick={() => onAnswer(answer)}
      >
        Submit
      </button>
    </div>
  );
}
