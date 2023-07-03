const {mostFrequentChar} = require("./codes/mostFrequentChar123")
const axios = require("axios")
const chai = require("chai")
const expect = chai.expect

describe("test the mostfrequentChar", function() {
    it("Test the mostFrequentChar method", async () =>  {
        expect(mostFrequentChar('bookeeper')).to.be.equal('e')
        const res = await axios.post("http://localhost:1000/mocha", {
            "status": "True Success"
        })
    })
    it("Test the mostFrequentChar method 2", function() {
        expect(mostFrequentChar('aaaaa')).to.be.equal('a')
    })
    it("Test the mostFrequentChar method 3", function() {
        expect(mostFrequentChar('bbbb')).to.be.equal('b')
    })
})