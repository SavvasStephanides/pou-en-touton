import GameQuestion from "./GameQuestion";

export default class Game{
    id: number = 0
    gameQuestions: GameQuestion[] = []
    currentLevel: number = 0


    appendGameQuestion = (gameQuestion: GameQuestion) => {
        this.gameQuestions.push(gameQuestion)
    }

    toShareableString = (): string => {
        let questionShareableStrings = this.gameQuestions.map((question) => question.toShareableString())
        return `🇨🇾 Πού εν τουτον; ${this.id} \n\n`
            + questionShareableStrings
                .filter((shareableString) => shareableString !== "")
                .join("\n")
    }
}