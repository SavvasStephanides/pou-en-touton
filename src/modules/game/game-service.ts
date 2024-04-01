import Game from "./Game";
import GameQuestion from "./GameQuestion";
import PossibleAnswer from "./PossibleAnswer"
const game = require("../data/game.json")

export default class GameService{
    jsonToGame(jsonString: any): Game{
        let gameJsonObject = JSON.parse(jsonString)        
        
        let game: Game = new Game()
        game.currentLevel = gameJsonObject.currentLevel
        game.id = gameJsonObject.id

        game.gameQuestions = gameJsonObject.gameQuestions.map((question: any) => {
            let answers: PossibleAnswer[] = question.possibleAnswers
            let gameQuestion: GameQuestion = new GameQuestion(question.placePhoto, question.question, answers, question.correctAnswer, question.iconEmoji)
            return gameQuestion
        })

        return game
    }

    getTodaysGame(){
        return this.jsonToGame(JSON.stringify(game.game))
    }
}