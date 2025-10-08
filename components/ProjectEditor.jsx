import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import QuestionBox from "./QuestionBox";

let socket;

export default function ProjectEditor({ projectId, initialSRS }) {
  const [srs, setSrs] = useState(initialSRS);
  const [questions, setQuestions] = useState([]);
  const transcriptRef = useRef("");

  useEffect(() => {
    socket = io(process.env.SOCKET_IO_SERVER_URL, { auth: { projectId } });
    socket.emit("join", { projectId });

    socket.on("srs_update", (payload) => setSrs(payload.srs));
    socket.on("questions", (payload) => setQuestions(payload.questions));
    socket.on("transcript_chunk", ({ chunk }) => {
      transcriptRef.current += chunk + "\n";
    });

    return () => socket.disconnect();
  }, [projectId]);

  const submitAnswer = (q, ans) => {
    socket.emit("answer", { projectId, question: q, answer: ans });
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 p-4 overflow-auto">
        <h2>Requirements</h2>
        <pre className="whitespace-pre-wrap">{srs}</pre>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto">
          <h3>Clarification Questions</h3>
          {questions.map((q, idx) => (
            <QuestionBox key={idx} q={q} onAnswer={(ans) => submitAnswer(q, ans)} />
          ))}
        </div>
      </div>
    </div>
  );
}
