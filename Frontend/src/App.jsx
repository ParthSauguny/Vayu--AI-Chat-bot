import { useState } from 'react'
import './App.css'

function App() {
  const [error , setError] = useState("");
  
  return (
    <div className='flex flex-col justify-center mx-auto bg-gray-400 border-4 border-zinc-950 py-5 mt-20 px-6'>
      <div className=''>
        <p1> What do you want to know lil' nigga
          <button>Surprise Me!</button>
        </p1>

        <div>
          <input
            type="text"
            placeholder='how can i help you today?'
            onChange={""}
          />
          {!error && <button> Ask </button>}
          {error && <button> Clear </button>}

        </div>
        {error && <p>{error}</p>}
      </div>

      <div>
        <div>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default App