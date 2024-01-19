// ChatField.jsx

import React, { useRef, useEffect } from "react";

const ChatField = ({ messages }) => {
  const chatBottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric", second: "numeric" };
    return new Date(timestamp).toLocaleString("en-US", options);
  };

  return (
    <div className="w-full h-screen bg-gray-200 overflow-y-auto p-5 pt-20 pb-20">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 ${
            msg.user ? "flex justify-end" : "flex justify-start"
          }`}
        >
          <div
            className={`inline-block p-4 rounded ${
              msg.user
                ? "bg-blue-500 text-white float-right"
                : "bg-gray-400 text-black float-left"
            }`}
          >
            {msg.text && <div className="mb-2">{msg.text}</div>}

            {msg.images && (
              <div>
                {msg.images.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={`Dog ${i + 1}`}
                    style={{ maxWidth: "100%" }}
                  />
                ))}
              </div>
            )}

            <div className="text-xs text-white-500">
              {formatTimestamp(msg.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={chatBottomRef} />
    </div>
  );
};

export default ChatField;
