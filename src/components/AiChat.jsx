import { Bot, User } from "lucide-react";
import { useEffect, useState } from "react";
import { sendToGroq } from "../api/aiService";

const AiChat = () => {
  const STORAGE_KEY = "chat_messages";
  const savedMessages = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error("JSON parsing error:", e);
      return null;
    }
  })();
  const [messages, setMessages] = useState(
    savedMessages || [
      {
        id: 1,
        from: "bot",
        text: "Hello! How can I assist you today?",
        timestamp: Date.now(),
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  const [text, setText] = useState("");
  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = {
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    const input = text;
    setText("");

    try {
      const aiReply = await sendToGroq(input);
      console.log("AI Reply:", aiReply);
      const botMsg = {
        sender: "bot",
        text: aiReply.choices[0].message.content,
        timestamp: Date.now(),
      };

      console.log("Bot Message:", botMsg);
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log("AI error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b bg-white">
        <div className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-500" />
          AI Assistant
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-[#FAFAFA]">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[70%] ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                {isUser ? (
                  <User className="w-6 h-6 text-gray-400" />
                ) : (
                  <Bot className="w-6 h-6 text-purple-500" />
                )}

                <div className="flex flex-col">
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isUser
                        ? "bg-gray-200 text-gray-700 rounded-tr-sm"
                        : "bg-purple-500 text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none text-sm placeholder-gray-400"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            className="text-purple-500 rotate-45 p-2 rounded-lg"
            onClick={handleSend}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
