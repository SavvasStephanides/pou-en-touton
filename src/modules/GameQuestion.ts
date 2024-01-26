import PossibleAnswer from "./PossibleAnswer"

export default class GameQuestion {
    placePhoto: string
    question: string
    possibleAnswers: PossibleAnswer[] = []
    correctAnswer: number = 0

    constructor(placePhoto: string, question: string){
        this.placePhoto = placePhoto
        this.question = question
    }

    addPossibleAnswer(answer: PossibleAnswer){
        this.possibleAnswers.push(answer)
    }

    checkAnswer(answerId: number){
        const possibleAnswer: PossibleAnswer | undefined = this.possibleAnswers.find(answer => answer.id === answerId)

        if(possibleAnswer === undefined){
            throw "Answer not found for this answer ID"
        }

        if(answerId === this.correctAnswer){
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