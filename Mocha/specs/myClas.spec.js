const MyClass = require("../src/myClass.js")
const sinon = require("sinon")
const myObj = new MyClass()
const chai = require("chai")
const expect = chai.expect
const chaiaspromise = require("chai-as-promised")
chai.use(chaiaspromise)


describe.skip("Test suit", function () {
    it("Test the add method", function () {
        expect(myObj.add(1, 2)).to.be.equal(3)
    })


    it("spy the add method", function () {
        let spy = sinon.spy(myObj, "add")
        let arg1 = 10, arg2 = 20
        myObj.callAnotherFn(arg1, arg2)
        sinon.assert.calledOnce(spy)
        expect(spy.calledOnce).to.be.true
        expect(spy.calledWith(10, 20)).to.be.true
    })

    it("spy the callback method", function () {
        let callback = sinon.spy()
        myObj.callTheCallback(callback)
        expect(callback.calledOnce).to.be.true
    })

    it("mock the sayHello method", function () {
       let mock = sinon.mock(myObj)
       let expectation = mock.expects("sayHello")
       expectation.exactly(1)
       expectation.withArgs("hello world")
       myObj.callAnotherFn(10, 20)
       mock.verify()
    })



})

describe.skip("Test suit for stub", function () {
    it("Test the add method", function () {
       let stub = sinon.stub(myObj, "add")
       stub
       .withArgs(10, 20)
       .onFirstCall()
       .returns(100)
       .onSecondCall()
       .returns(200)
       expect(myObj.callAnotherFn(10, 20)).to.be.equal(100)
       expect(myObj.callAnotherFn(10, 20)).to.be.equal(200)
    })
})


describe("Test the promise", function () {
    it("Promise test case", function () {
        this.timeout(0)
        // myObj.testPromise().then(function(result) {
        //     expect(result).to.be.equal(6)
        //     done()
        // })
        return expect(myObj.testPromise()).to.eventually.equal(6)
    })
})