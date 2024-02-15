import Game from "./Game";
import GameQuestion from "./GameQuestion";
import PossibleAnswer from "./PossibleAnswer";

const allGames = require("../data/games.json")

export default class GameService{
    jsonToGame(jsonString: any): Game{
        let gameJsonObject = JSON.parse(jsonString)
        let game: Game = new Game()
        game.currentLevel = gameJsonObject.currentLevel

        game.gameQuestions = gameJsonObject.gameQuestions.map((question: any) => {
            let answers: PossibleAnswer[] = question.possibleAnswers.map((answer: any) => {
                return answer
            })
            let gameQuestion: GameQuestion = new GameQuestion(question.placePhoto, question.question, answers, question.correctAnswer)
            return gameQuestion
        })

        return game
    }

    getTodaysGame(){
        const today = new Date().toDateString()
        let todaysGame = allGames.find((game: any) => game.date === today).game
        return this.jsonToGame(JSON.stringify(todaysGame))
    }
}