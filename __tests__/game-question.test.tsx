import GameQuestion from "../src/modules/game/GameQuestion"
import PossibleAnswer from "../src/modules/game/PossibleAnswer"

describe("Game Question", () => {
    it("should add a possible answer when calling addPossibleAnswer", () => {
        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", [], 0, "😬")
        let fakePossibleAnswer = new PossibleAnswer("Answer title")

        fakeGameQuestion.addPossibleAnswer(fakePossibleAnswer)

        expect(fakeGameQuestion.possibleAnswers.length).toBe(1)
        expect(fakeGameQuestion.possibleAnswers[0].title).toBe("Answer title")
        expect(fakeGameQuestion.possibleAnswers[0].status).toBe("none")
    })

    it("should set answer to CORRECT when correct answer specified in checkAnswer", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 1, "😬")

        fakeGameQuestion.checkAnswer(1)

        expect(fakeGameQuestion.possibleAnswers[0].status).toBe("none")
        expect(fakeGameQuestion.possibleAnswers[1].status).toBe("CORRECT")
        expect(fakeGameQuestion.possibleAnswers[2].status).toBe("none")
        expect(fakeGameQuestion.possibleAnswers[3].status).toBe("none")
    })

    it("should set answer to WRONG when correct answer specified in checkAnswer", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 2, "😬")

        fakeGameQuestion.checkAnswer(0)

        expect(fakeGameQuestion.possibleAnswers[0].status).toBe("WRONG")
        expect(fakeGameQuestion.possibleAnswers[1].status).toBe("none")
        expect(fakeGameQuestion.possibleAnswers[2].status).toBe("none")
        expect(fakeGameQuestion.possibleAnswers[3].status).toBe("none")
    })

    it("should return true if an answer is set as CORRECT when calling correctAnswerIsFound", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2", "CORRECT")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 1, "😬")

        expect(fakeGameQuestion.correctAnswerIsFound()).toBe(true)

    })

    it("should return false if no answer is set as CORRECT when calling correctAnswerIsFound", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2", "WRONG")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4", "WRONG")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 0, "😬")

        expect(fakeGameQuestion.correctAnswerIsFound()).toBe(false)

    })

    it("toShareableString should return the correct string when wrong answers are present", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1", "WRONG")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2", "WRONG")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3", "CORRECT")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4", "WRONG")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 0, "😬")

        let expectedShareableString = `😬 🟥🟥🟥🟩`
        let actualShareableString = fakeGameQuestion.toShareableString()

        expect(actualShareableString).toBe(expectedShareableString)


    })

    it("toShareableString should return a string with a confetti emoji if no wrong answers are present", () => {
        let fakePossibleAnswer1 = new PossibleAnswer("Answer title 1", "CORRECT")
        let fakePossibleAnswer2 = new PossibleAnswer("Answer title 2", "none")
        let fakePossibleAnswer3 = new PossibleAnswer("Answer title 3", "none")
        let fakePossibleAnswer4 = new PossibleAnswer("Answer title 4", "none")
        let possibleAnswers: PossibleAnswer[] = [fakePossibleAnswer1, fakePossibleAnswer2, fakePossibleAnswer3, fakePossibleAnswer4]

        let fakeGameQuestion = new GameQuestion("photo.jpg", "Question?", possibleAnswers, 0, "😬")

        let expectedShareableString = `😬 🎉`
        let actualShareableString = fakeGameQuestion.toShareableString()

        expect(actualShareableString).toBe(expectedShareableString)


    })
})