import React, { useState, useEffect } from "react";

interface WelcomeProps {
  features: string[];
}

const Welcome: React.FC<WelcomeProps> = ({ features }) => {
  const [name, setName] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");

  // Check if name exists in localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      setShowWelcome(true); // Show the welcome message if no name is stored
    } else {
      setName(storedName); // Set the name from localStorage
    }
  }, []);

  const handleNameSubmit = () => {
    if (inputName.trim()) {
      localStorage.setItem("userName", inputName);
      setName(inputName);
      setShowWelcome(false);
      window.location.reload();
    }
  };

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              Welcome to Our Site!
            </h1>
            <p className="text-gray-700 mb-4">
              We're excited to have you here. Here are some features you'll
              enjoy:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-gray-700 mb-2">
              Please enter your name to get started:
            </p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter your name"
                className="border border-gray-300 rounded px-3 py-2 mr-2 flex-grow"
              />
              <button
                onClick={handleNameSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display the user's name across the site */}
      {name && (
        <div className="text-center hidden mt-4">
          <p className="text-xl">Welcome back, {name}!</p>
        </div>
      )}
    </>
  );
};

export default Welcome;
