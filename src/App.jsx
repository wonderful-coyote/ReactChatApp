import React, { useState } from 'react'; 
import './App.css'
import Header from './components/header'
import UserInput from './components/userinput'
import ChatField from './components/chatfield'
import Messages from './components/messages'

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <Header />
      <Messages />
    </div>
  );
};

export default App;