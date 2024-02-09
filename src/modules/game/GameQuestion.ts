import PossibleAnswer from "./PossibleAnswer"

export default class GameQuestion {
    placePhoto: string
    question: string
    possibleAnswers: PossibleAnswer[] = []
    correctAnswer: number

    constructor(placePhoto: string, question: string, possibleAnswers: PossibleAnswer[], correctAnswer: number){
        this.placePhoto = placePhoto
        this.question = question
        this.possibleAnswers = possibleAnswers
        this.correctAnswer = correctAnswer
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
}