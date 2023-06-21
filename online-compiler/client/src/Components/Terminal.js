import { useEffect, useRef, useState } from "react";
import "../Styles/terminal.css"

function Terminal(props) {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState("")

    return (
        <div
            className="Main"
        >
            <input
                // ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        let newOutput = ""
                        newOutput = output + "\n" + "$ " + input + "\n"
                        switch (input) {
                            case "test":
                                newOutput = ""
                                newOutput += "[chrisstruong]$ Testing"
                                props.handleSubmit()
                                break

                            case "help":
                                newOutput += "test - execute test cases\nclear - clear the terminal"

                                break;

                            case "clear":
                                newOutput = ""     
                                props.setStatus("")
                                                        
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
                {props.status === "success" ? 
                <>
                <p>{props.status}</p>
                <p>JobId: {props.jobId}</p>
                <p>{props.renderTimeDetails()}</p>
                <p className="output">{props.output}</p>
               
                </>
                 : ""}
                
            </div>
                
        </div>
    )
}

export default Terminal