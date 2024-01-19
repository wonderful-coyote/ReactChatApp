import React, { useState } from "react";
import UserInput from "./userinput";
import ChatField from "./chatfield";
import axios from "axios";

const Messages = () => {
  const [chatMessages, setChatMessages] = useState([]);

  // Timing constants
  const TYPING_DELAY = 500;
  const RESPONSE_DELAY = 2000;

  const handleSendMessage = async (message) => {
    const timestamp = new Date().getTime(); // Get the current timestamp

    // Display user's message immediately with timestamp
    setChatMessages([
      ...chatMessages,
      { user: true, text: message, timestamp },
    ]);

    // Simulate typing indicator and delay before showing the response
    setTimeout(async () => {
      // Display the typing indicator until the bot response is ready
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: false, text: "Typing...", timestamp: new Date().getTime() },
      ]);

      // Check if the user's input is related to the date question
      const isDateQuery = message.toLowerCase().includes("perfect first date");

      // Function to generate a random response for "What’s your perfect first date?"
      const generateDateResponse = () => {
        const dateResponses = [
          "A cozy dinner at a candlelit restaurant followed by a romantic walk under the stars.",
          "69",
        ];

        // Randomly choose one of the responses
        return dateResponses[Math.floor(Math.random() * dateResponses.length)];
      };

      // Generate the date response outside the setTimeout block
      const dateResponse = isDateQuery ? generateDateResponse() : null;

      // Delay before showing the response
      await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY));

      // Check if the response is '69' and make an API call using Axios
      if (dateResponse === "69") {
        try {
          const apiUrl = "https://dog.ceo/api/breeds/image/random";

          // Use Axios to make the API call (GET request)
          const response = await axios.get(apiUrl);
          const imageData = response.data;

          // Display the typing indicator until the image is loaded
          setChatMessages((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the previous typing indicator
            { user: false, text: "Typing...", timestamp: new Date().getTime() }, // Add a new typing indicator
          ]);

          // Delay before showing the response
          await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY));

          // Display the fetched image as part of the bot response with timestamp
          const image = imageData.message; // Adjust based on the actual property in the API response
          setChatMessages((prevMessages) => [
            ...prevMessages.slice(0, -1), // Remove the additional typing indicator
            {
              user: false,
              text: "Here are some images for 69:",
              images: [image], // Wrap the image in an array
              timestamp: new Date().getTime(),
            },
          ]);

          // Log the fetched image data to the console
          console.log("Fetched image:", image);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      } else {
        // Delay before showing the response
        await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY));

        // Pre-recorded responses with timestamp
        const responses = {
          hello: "Hi there!",
          "how are you": "I am good, thank you!",
          bye: "Goodbye!",
          "what’s your perfect first date?":
            dateResponse || "I'm not sure how to respond to that.",
          // Add more responses here
        };

        const userMessage = message.toLowerCase();
        const botResponse =
          responses[userMessage] || "I'm not sure how to respond to that.";

        // Display the bot response, replacing the typing indicator with timestamp
        setChatMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove the previous typing indicator
          { user: false, text: botResponse, timestamp: new Date().getTime() },
        ]);
      }
    }, TYPING_DELAY); // Short delay before starting the typing indicator
  };

  return (
    <div>
      <ChatField messages={chatMessages} />
      <UserInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Messages;
