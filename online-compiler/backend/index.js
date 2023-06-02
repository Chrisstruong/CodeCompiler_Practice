const express = require("express")
const cors = require('cors')
require("dotenv").config()
require("./config/db.connection")
const {MONGODB_URI, PORT} = process.env


const {generateFile} =  require('./generateFile')
const {executeCpp} = require('./executeCpp')
const { executePy } = require("./executePy")
const Job = require('./models/Job')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({hello: "world!"})
})

app.post("/run", async (req, res) => {
    const { language = "cpp", code} = req.body
    console.log(language, code.length)
    if (code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body!"})
    }
    try{

    // We need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code)

    const job = await new Job({language, filepath}).save()
    const jobId = job["_id"]

    res.status(201).json({success: true, jobId})
    console.log(job)

    // We need to run the file and send the response
    let output 

        
    if(language === "cpp") {
         output = await executeCpp(filepath)
    } else {
         output = await executePy(filepath)
    }

    console.log({filepath, output})

    //return res.json({ filepath, output })
    } catch(err) {
        console.log(err)
        //res.status(500).json({err})
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})    

