import './App.css';
import { useEffect, useRef, useState } from 'react'

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])


  return (
    <div 
    className="App"
    onClick={e => inputRef.current.focus()}

    >
      
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            let newOutput = ""
            newOutput = output + "\n" + "$ " + input + "\n"
            switch (input) {
              case "ls":
                newOutput += "List of projects"
                break
              case "pwd":
                newOutput += "Your on my cool site"
                break
              default:
                newOutput += "Unknown Command"
            }
            setOutput(newOutput)
            setInput("")
          }
        }}
      />
      <div className='terminal'>
        {output}
      </div>
    </div>
  );
}

export default App;
