const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({hello: "world!"})
})

app.post("/run", (req, res) => {
    const { language = "cpp", code} = req.body

    if (code === undefined) {
        return res.status(400).json({success: false, error: "Empty code body!"})
    }

    // We need to generate a c++ file with content from the request
    // We need to run the file and send the response

    return res.json({language, code})
})

app.listen(1000, () => {
    console.log(`Listening on port 1000!`)
})    