const MyClass = require("../src/myClass.js")
var myObj = new MyClass()

describe("Test suit", function () {
    it("Test the add method", function () {
        myObj.add(1, 2)
    })
})