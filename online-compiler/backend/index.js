const express = require("express")
const cors = require('cors')
require("dotenv").config()
require("./config/db.connection")
const {MONGODB_URI, PORT} = process.env


const {generateFile} =  require('./generateFile')

const { addJobToQueue } = require('./jobQueue')
const Job = require('./models/Job')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/status", async(req, res)=> {
    const jobId = req.query.id
    console.log("status requested", jobId)

    if (jobId == undefined){
        return res.status(400).json({success: false, error:"missing id query param"})
    }

    
    try{
        const job = await Job.findById(jobId)
        if (job===undefined) {
            return res.status(404).json({success: false, error: "invalid job id"})
        }

        return res.status(200).json({success: true, job })

    } catch (err) {
        return res.status(400).json({success: false, error: JSON.stringify(err)})
    }
})

app.post("/run", async (req, res) => {
    const { language = "cpp", code} = req.body
    console.log(language, code.length)
    if (code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body!"})
    }
    let job

    try{

    // We need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code)

    const job = await new Job({language, filepath}).save()
    const jobId = job["_id"]
    addJobToQueue(jobId)
    res.status(201).json({success: true, jobId})
    console.log(job)

    // We need to run the file and send the response
    let output 

    

    //return res.json({ filepath, output })
    } catch(err) {
        return res.status(500).json({success: false, err: JSON.stringify(err)})
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})    

