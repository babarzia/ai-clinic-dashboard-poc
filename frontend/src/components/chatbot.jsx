import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const aiMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-green-200 text-black p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-purple-700 mb-3 text-center">AI Assistant</h2>
      <div
        ref={chatRef}
        className="h-48 overflow-y-auto bg-gray-50 border border-gray-200 rounded-md p-2 space-y-1 text-sm"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-2 rounded-md ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 text-blue-900"
                : "mr-auto bg-green-100 text-green-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

