import Game from "../src/modules/game/Game"

describe("Game", () => {
    it("should set the id as 0 when a new game is created", () => {
        let game = new Game()
        let gameId = game.id
        let expectedGameId = 0

        expect(gameId).toBe(expectedGameId)
    })
})