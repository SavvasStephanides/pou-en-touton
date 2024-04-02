import PossibleAnswer from "./PossibleAnswer"

export default class GameQuestion {
    placePhoto: string
    question: string
    possibleAnswers: PossibleAnswer[] = []
    correctAnswer: number
    iconEmoji: string

    constructor(placePhoto: string, question: string, possibleAnswers: PossibleAnswer[], correctAnswer: number, iconEmoji: string){
        this.placePhoto = placePhoto
        this.question = question
        this.possibleAnswers = possibleAnswers
        this.correctAnswer = correctAnswer
        this.iconEmoji = iconEmoji
    }

    addPossibleAnswer(answer: PossibleAnswer){
        this.possibleAnswers.push(answer)
    }

    checkAnswer(answerIndex: number){
        const possibleAnswer: PossibleAnswer | undefined = this.possibleAnswers[answerIndex]

        if(possibleAnswer === undefined){
            throw `Answer not found for this answer ID: ${answerIndex}`
        }

        if(answerIndex === this.correctAnswer){
            possibleAnswer.status = "CORRECT"
        }
        else{
            possibleAnswer.status = "WRONG"
        }
    }

    correctAnswerIsFound(): boolean{                
        return this.possibleAnswers.some(answer => answer.status === "CORRECT")
    }

    toShareableString(): string{
        let totalGuesses = this.possibleAnswers.length - this.possibleAnswers.filter((answer) => answer.status === "none").length
        if(totalGuesses > 0){
            let wrongGuesses = this.possibleAnswers.filter((answer) => answer.status === "WRONG").length

            if(wrongGuesses === 0 && this.possibleAnswers.find((answer) => answer.status === "CORRECT")){
                return `${this.iconEmoji} 🎉`
            }
            return `${this.iconEmoji} ${"🟥".repeat(wrongGuesses)}${this.correctAnswerIsFound() ? "🟩" : ""}`
        }
        else {
            return ""
        }
    }
}