const MyClass = require("../src/myClass.js")
const sinon = require("sinon")
const myObj = new MyClass()
const chai = require("chai")
const expect = chai.expect


describe("Test suit", function () {
    it("Test the add method", function () {
        expect(myObj.add(1, 2)).to.be.equal(3)
    })

    // it("Test the add method", function () {
    //     expect(myObj.mostFrequentChar(1, 2)).to.be.equal(3)
    // })

    it("spy the add method", function () {
        let spy = sinon.spy(myObj, "add")
        let arg1 = 10, arg2 = 20
        myObj.callAnotherFn(arg1, arg2)
        sinon.assert.calledOnce(spy)
        expect(spy.calledOnce).to.be.true
        expect(spy.calledWith(10, 20)).to.be.true
    })

    it("spy the callback method", function () {
        var callback = sinon.spy()
        myObj.callTheCallback(callback)
        expect(callback.calledOnce).to.be.true
    })

})