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
        if(answerId === this.correctAnswer){
            this.possibleAnswers.find(answer => answer.id === answerId).status = "CORRECT"
        }
        else{
            this.possibleAnswers.find(answer => answer.id === answerId).status = "WRONG"
        }
    }

    correctAnswerIsFound(): boolean{                
        return this.possibleAnswers.some(answer => answer.status === "CORRECT")
    }
}