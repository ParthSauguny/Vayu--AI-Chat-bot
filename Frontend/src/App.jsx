import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ques, setQues] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const SurpriseOptions = [
    "Who won the latest Nobel Peace Prize?",
    "What is gen-ai?",
    "How are you?"
  ];

  const surprise = () => {
    const surQuestion = SurpriseOptions[Math.floor(Math.random() * SurpriseOptions.length)];
    setQues(surQuestion);
  };

  const getResponse = async() => {
    if(ques.length === 0){
      setError("Please ask a question!");
      return;
    }
    try {
      //console.log("starting");
      const response = await axios.post("http://localhost:5000/gemini" , {ques , chatHistory});
      console.log("ans: " , response.data);
      setChatHistory(oldHistory => [
        ...oldHistory,
        {
          role: 'user',
          parts: [ques]  // Ensuring 'ques' is an array
        },
        {
          role: 'Vayu',
          parts: [response.data]  // Ensuring 'response.data' is an array
        }
      ]);
      
      setQues("");
      //console.log("level 1");
    } catch (error) {
      console.log(error);
      setError("Something went wrong! Please try again later");
    }
  };

  const handleClear = () => {
    setQues("");
    setError("");
  };

  return (
    <div className='flex flex-col items-center mx-auto bg-gradient-to-r from-gray-300 to-gray-500 border-4 border-zinc-950 rounded-lg p-6 mt-20 w-full max-w-lg shadow-lg'>
      <div className='text-center mb-4'>
        <p className="text-xl font-semibold mb-2 text-gray-800">What do you want to know?</p>
        <button 
          onClick={surprise} 
          disabled={chatHistory.length > 0} 
          className='bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed'
        >
          Surprise Me!
        </button>
      </div>

      <div className='flex items-center mb-4 w-full'>
        <input
          type="text"
          placeholder='How can I help you today?'
          value={ques}
          onChange={(e) => setQues(e.target.value)}
          className='flex-grow border border-gray-400 rounded-l px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400'
        />
        <button 
          onClick={error ? handleClear : getResponse} 
          className={`px-4 py-2 text-white rounded-r ${error ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition`}
        >
          {error ? "Clear" : "Ask"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className='bg-white w-full rounded-lg p-4 shadow-inner overflow-y-auto max-h-40'>
        {chatHistory.map((chatItem, index) => (
          <p key={index} className="text-gray-700 mb-1">{chatItem.role} : {chatItem.parts}</p>
        ))}
      </div>
    </div>
  );
}

export default App;