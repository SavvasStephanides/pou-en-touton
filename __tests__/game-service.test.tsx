import GameService from "../src/modules/game/game-service"

describe("GameService", () => {
    it("should return json string as Game object", () => {
        let gameJsonString = `{
            "id": 11,
            "currentLevel": 0,
            "gameQuestions": [
                {
                    "question": "Πού εν τούτον;",
                    "iconEmoji": "📍",
                    "possibleAnswers": [
                        {
                            "title": "Λύμπια",
                            "status": "none"
                        },
                        {
                            "title": "Αγία Ειρήνη Κερύνειας",
                            "status": "none"
                        }
                    ],
                    "correctAnswer": 0,
                    "placePhoto": "v-67.jpg"
                },
                {
                    "question": "Σε πια επαρχία βρίσκεται το χωριό Λύμπια;",
                    "iconEmoji": "🌆",
                    "possibleAnswers": [
                        {
                            "title": "Λευκωσία",
                            "status": "none"
                        },
                        {
                            "title": "Κερύνεια",
                            "status": "none"
                        }
                    ],
                    "correctAnswer": 1,
                    "placePhoto": "v-67.jpg"
                }
            ]
        }`

        let gameService = new GameService()
        let actualGameObject = gameService.jsonToGame(gameJsonString)

        expect(actualGameObject.id).toBe(11)
        expect(actualGameObject.currentLevel).toBe(0)

        let gameQuestion1 = actualGameObject.gameQuestions[0]
        expect(gameQuestion1.question).toBe("Πού εν τούτον;")
        expect(gameQuestion1.iconEmoji).toBe("📍")
        expect(gameQuestion1.correctAnswer).toBe(0)
        expect(gameQuestion1.placePhoto).toBe("v-67.jpg")

        expect(gameQuestion1.possibleAnswers[0].title).toBe("Λύμπια")
        expect(gameQuestion1.possibleAnswers[1].title).toBe("Αγία Ειρήνη Κερύνειας")

        let gameQuestion2 = actualGameObject.gameQuestions[1]
        expect(gameQuestion2.question).toBe("Σε πια επαρχία βρίσκεται το χωριό Λύμπια;")
        expect(gameQuestion2.iconEmoji).toBe("🌆")
        expect(gameQuestion2.correctAnswer).toBe(1)
        expect(gameQuestion2.placePhoto).toBe("v-67.jpg")
        expect(gameQuestion2.possibleAnswers[0].title).toBe("Λευκωσία")
        expect(gameQuestion2.possibleAnswers[1].title).toBe("Κερύνεια")

    })
})