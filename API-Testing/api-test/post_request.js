const axios = require("axios")
const { expect } = require("chai")
const {faker} = require("@faker-js/faker")

describe("GET API Request Tests", async () => {
    it("should be able to post a user details", async () => {
        const randomName = faker.name.findName()
        const randomJobTitle = faker.name.jobTitle()
        const res = await axios.post('https://reqres.in/api/users', {
            "name": "randomName",
            "job": "randomJobTitle"
        })
        console.log(res.data)
        expect(res.data.name).equal("randomName")
        expect(res.data.job).equal("randomJobTitle")
    })
})