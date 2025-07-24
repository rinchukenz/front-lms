import React, { useState } from "react";
import ChatWindow from "../../components/student-components/chatWindow";
import { sendAnswer, startInterview } from "../../services/StudentService";

function InterviewPage() {
  const [topic, setTopic] = useState("Java");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleStart = async () => {
    const res = await startInterview(topic);
    setCurrentQuestion(res.data.question);
    setMessages([
      { sender: "AI", text: "Hello! 👋 Ready for your mock interview? Let's begin." },
      { sender: "AI", text: res.data.question },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    const res = await sendAnswer({
      topic,
      question: currentQuestion,
      answer: input,
    });

    const { feedback, nextQuestion } = res.data;

    setMessages((prev) => [
      ...prev,
      { sender: "AI", text: `Feedback: ${feedback}` },
      { sender: "AI", text: nextQuestion },
    ]);

    setCurrentQuestion(nextQuestion);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>🤖</span> <span>AI Mock Interview</span>
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="font-medium">Choose your role:</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Java">SDE - Software Developer (Java)</option>
            <option value="React">SDE - Frontend Developer (React)</option>
            <option value="DSA">SDE - DSA Round</option>
          </select>

          <button
            onClick={handleStart}
            className="ml-auto bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Start Interview
          </button>
        </div>

        <ChatWindow messages={messages} />

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSend}
            className="bg-violet-500 text-white px-5 py-2 rounded-lg hover:bg-violet-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
