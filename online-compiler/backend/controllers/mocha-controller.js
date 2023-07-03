const express = require('express')
const router = express.Router()
const  Mocha  = require("../models/Mocha")

require("../config/db.connection")

router.get("/", async (req, res) => {
    try {
        res.json(await Mocha.find({}))
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post("/", async (req, res) => {
    try {
        res.json(await Mocha.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
