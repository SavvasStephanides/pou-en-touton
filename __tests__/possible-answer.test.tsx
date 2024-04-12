import PossibleAnswer from "../src/modules/game/PossibleAnswer"

describe("Possible Answer", () => {
    it("should set status to 'none' when not defined in the constructor", () => {
        let expectedStatus = "none"

        let fakePossibleAnswer = new PossibleAnswer("Answer1")
        let actualStatus = fakePossibleAnswer.status

        expect(actualStatus).toBe(expectedStatus)
    })

    it("should set status to 'CORRECT' when specified in the constructor", () => {
        let expectedStatus = "CORRECT"

        let fakePossibleAnswer = new PossibleAnswer("Answer1", "CORRECT")
        let actualStatus = fakePossibleAnswer.status

        expect(actualStatus).toBe(expectedStatus)
    })
})