const {mostFrequentChar} = require("./codes/mostFrequentChar123")
const chai = require("chai")
const expect = chai.expect

describe("test the mostfrequentChar", function() {
    it("Test the mostFrequentChar method", function() {
        expect(mostFrequentChar('bookeeper')).to.be.equal('e')
        expect(mostFrequentChar('aaaaa')).to.be.equal('a')
        expect(mostFrequentChar('bbbb')).to.be.equal('b')
    })
    it("Test the mostFrequentChar method 2", function() {
        expect(mostFrequentChar('aaaaa')).to.be.equal('a')
    })
    it("Test the mostFrequentChar method 3", function() {
        expect(mostFrequentChar('bbbb')).to.be.equal('b')
    })
})