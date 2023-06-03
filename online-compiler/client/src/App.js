import axios from "axios"
import './App.css';
import React, { useState } from 'react'

function App() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("cpp")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState("")
  const [jobId, setJobId] = useState("")


  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    }
    try {
      setJobId("")
      setStatus("")
      setOutput("")
      const { data } = await axios.post("http://localhost:1000/run", payload)
      console.log(data)
      setJobId(data.jobId)
      let intervalId


      
      intervalId= setInterval(async ()=> {

        const {data: dataRes} = await axios.get("http://localhost:1000/status", 
        {params: {id: data.jobId}})
        const {success, job, error } = dataRes
        console.log(dataRes)

        if (success) {
          const {status: jobStatus, output: jobOutput} = job
          setStatus(jobStatus)
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


    } catch ({response}) {
      if (response){
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
            (e)=> {
              setLanguage(e.target.value)
              console.log(e.target.value)
            }
          }
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea rows="20" cols="75" value={code} onChange={(e) => { setCode(e.target.value) }}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{jobId && `JobId: ${jobId}`}</p>
      <p>{output}</p>
    </div>
  );
}

export default App;
