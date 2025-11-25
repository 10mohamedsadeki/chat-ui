import { useEffect, useState } from "react";
import { getChatByUserId, getUserDetails, sendMessage } from "../api/chat";

const ChatSection = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [text, setText] = useState("");
  const currentUserId = 7;

  

  const handleSend = async () => {
    if (!text.trim()) return;

    const res = await sendMessage(currentUserId, selectedChat.id, text);

    console.log("Message sent:", res.data);

   
    setMessages((prev) => [
      ...prev,
      {
        fromUser: currentUserId,
        toUser: selectedChat.id,
        message: text,
        timestamp: Date.now(),
      }
    ]);
     

   
    setText("");
  };
  useEffect(() => {
    if (selectedChat) {
      getChatByUserId(selectedChat.id).then((response) => {
        setMessages(response.data);
        console.log("Fetched messages:", response.data);
      });

      getUserDetails(selectedChat.id).then((response) => {
        setUserDetails(response.data);
      });
    }
  }, [selectedChat]);
  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Please Select a person to chat
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className=" px-6 py-4 flex justify-between items-center bg-white">
        <div className="text-lg font-semibold">{userDetails?.username}</div>
        <div className="flex items-center gap-3">
          {/* Avatar Stack */}
          <div className="flex -space-x-2">
            <img
              src={userDetails?.profileImage}
              alt="Member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <button className="text-gray-400 hover:text-gray-600">
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 space-y-6 bg-[#FAFAFA]">
        {messages.length === 0 && (
          <div className="flex h-full justify-center items-center text-gray-400">
            No messages yet...
          </div>
        )}

        {messages.map((msg) => {
          const isSent = msg.fromUser === currentUserId; 

          return (
            <div
              key={msg.id}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[300px] ${
                  isSent ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar (Receiver only) */}
                {!isSent && (
                  <img
                    src={userDetails?.profileImage}
                    className="w-8 h-8 rounded-full shrink-0"
                  />
                )}

                <div className="flex flex-col">
                  <div
                    className={
                      isSent
                        ? "bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl rounded-tr-sm"
                        : "bg-linear-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-2xl rounded-tl-sm"
                    }
                  >
                    {msg.message}
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
      <div className=" px-6 py-4 bg-white">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none text-sm placeholder-gray-400"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="text-gray-300 hover:text-gray-400">
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button className="text-gray-300 hover:text-gray-400">
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <button className="text-gray-300 hover:text-gray-400">
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
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

export default ChatSection;
