// UserInput.jsx

import React, { useState } from 'react';

const UserInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-gray-200 p-2">
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="flex-grow p-2 border rounded outline-white bg-gray-300 text-black mr-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message && (
          <button
            className="p-2 bg-blue-500 text-white border rounded"
            onClick={handleSend}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInput;
