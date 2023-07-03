const mongoose = require("mongoose")

const mochaSchema = new mongoose.Schema({
    "status": String,
}, {timestamps: true})

const Mocha = mongoose.model("Mocha", mochaSchema)

module.exports = Mocha