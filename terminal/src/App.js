import './App.css';
import { useState } from 'react'

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  return (
    <div className="App">
      <input
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
