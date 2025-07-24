import React from "react";

const ChatWindow = ({ messages }) => {
  return (
    <div className="h-96 overflow-y-auto p-4 bg-white rounded-xl shadow-inner border border-gray-200 space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.sender === "AI" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md p-3 rounded-2xl text-sm shadow-sm ${
              msg.sender === "AI"
                ? "bg-blue-50 text-gray-800 rounded-bl-none"
                : "bg-green-100 text-gray-900 rounded-br-none"
            }`}
          >
            <p className="font-semibold mb-1">{msg.sender}</p>
            <p className="">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
