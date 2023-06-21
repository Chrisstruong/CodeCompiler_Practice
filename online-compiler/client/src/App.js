import axios from "axios"
import './App.css';
import React, { useState, useEffect } from 'react'
import stubs from './defaultStubs'
import moment from "moment"
import Editor from "@monaco-editor/react";
import Terminal from "./Components/Terminal";

function App() {

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);


	const options = {
		fontSize: fontSize
	}

  const [code, setCode] = useState("")
 

  const [language, setLanguage] = useState("cpp")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState("")
  const [jobId, setJobId] = useState("")
  const [jobDetails, setJobDetails] = useState(null)
  console.log(`jobDetails: ${jobDetails}`)

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp"
    setLanguage(defaultLang)
  }, [])

  useEffect(() => {
    setCode(stubs[language])
  }, [language])

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language)
    console.log(`${language} set as default language`)
  }



  const renderTimeDetails = () => {
    if (!jobDetails) {
      return ""
    }

    let result = ''
    let { submittedAt, completedAt, startedAt } = jobDetails
    submittedAt = moment(submittedAt).toString()
    //result += `Submitted At: ${submittedAt}`
    if (!completedAt || !startedAt) {
      return result
    }
    const start = moment(startedAt)
    const end = moment(completedAt)
    const executionTime = end.diff(start, 'seconds', true)
    result += `Execution Time: ${executionTime * 1000}ms`
    return result
  }

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      // executeCode,
    }
    try {
      setJobId("")
      setStatus("")
      setOutput("")
      setJobDetails(null)
      const { data } = await axios.post("http://localhost:1000/run", payload)
      console.log(data)
      setJobId(data.jobId)
      let intervalId



      intervalId = setInterval(async () => {

        const { data: dataRes } = await axios.get("http://localhost:1000/status",
          { params: { id: data.jobId } })
        const { success, job, error } = dataRes
        console.log(dataRes)

        if (success) {
          const { status: jobStatus, output: jobOutput } = job
          setStatus(jobStatus)
          setJobDetails(job)
          if (jobStatus === "pending") return
          setOutput(jobOutput)
          clearInterval(intervalId)
        } else {
          setStatus("Error: Please retry!")
          console.error(error)
          clearInterval(intervalId)
          setOutput(error)
        }
      }, 1000)


    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr
        setOutput(errMsg)
      } else {
        setOutput("Error connecting to server")
      }
    }
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={
            (e) => {
              // let response = window.confirm("WARNING: Switching the language, will remove your current code")
              // if (response) 
              setLanguage(e.target.value)
              console.log(e.target.value)
            }
          }
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="js">JavaScript</option>

        </select>
      </div>
      <br />
      <div>
        <button onClick={setDefaultLanguage}>Set Default</button>
      </div>
      <br />

      {/* <textarea rows="20" cols="75" value={code} onChange={(e) => {
        setCode(e.target.value)
      }}></textarea> */}



      <Editor
        options={options}
        height="calc(500px)"
        width="100%"
        theme={"vs-dark"}
        language={"javascript"}
        value={code}
        onChange={(val) => { setCode(val) }}
      />

      <br />
      <button onClick={handleSubmit}>Submit</button>
      {/* <p>{status}</p>
      <p>{jobId && `JobId: ${jobId}`}</p> */}
      {/* <p>{renderTimeDetails()}</p> */}
      {/* <p>{output}</p> */}

      <Terminal setStatus={setStatus} handleSubmit={handleSubmit} status={status} jobId={jobId} output={output} renderTimeDetails={renderTimeDetails}/>

    </div>
  );
}

export default App;
