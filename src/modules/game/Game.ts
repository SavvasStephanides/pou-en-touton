import GameQuestion from "./GameQuestion";

export default class Game{
    gameQuestions: GameQuestion[] = []
    currentLevel: number = 0

    appendGameQuestion = (gameQuestion: GameQuestion) => {
        this.gameQuestions.push(gameQuestion)
    }
}