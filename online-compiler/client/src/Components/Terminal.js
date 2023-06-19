import { useEffect, useRef, useState } from "react";
import "../Styles/terminal.css"

function Terminal () {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState("")
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <div
        className="Main"
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
                    switch(input) {
                        case "test":
                            newOutput += "Testing"
                            break
                        default:
                            newOutput += `Command not found: ${input} \nuse 'help" to view commands`
                            // newOutput += "Unknown Command"
                    }
                    setOutput(newOutput)
                    setInput("")
                }
            }}
            />
            <div className="terminal">
                {output}
            </div>

        </div>
    )
}

export default Terminal