"use client"

import "./main.css"
import "./header.css"
import "./place-photo.css"
import "./question.css"
import { useState } from "react"
import GameQuestion from "@/modules/GameQuestion"
import PossibleAnswer from "@/modules/PossibleAnswer"
import Game from "@/modules/Game"

export default function GamePage() {
  const whereIsThisGame: GameQuestion = new GameQuestion("athienou.jpeg", "Πού εν τούτον;")  
  whereIsThisGame.addPossibleAnswer(new PossibleAnswer(1, "Πυρόι"))
  whereIsThisGame.addPossibleAnswer(new PossibleAnswer(2, "Αθηένου"))
  whereIsThisGame.addPossibleAnswer(new PossibleAnswer(3, "Τρούλλοι"))
  whereIsThisGame.addPossibleAnswer(new PossibleAnswer(4, "Άσσια"))
  whereIsThisGame.correctAnswer = 2

  const whichDistrict: GameQuestion = new GameQuestion("athienou.jpeg", "Σε πια επαρχία βρίσκεται η Αθηένου;")  
  whichDistrict.addPossibleAnswer(new PossibleAnswer(1, "Λάρνακα"))
  whichDistrict.addPossibleAnswer(new PossibleAnswer(2, "Πάφος"))
  whichDistrict.addPossibleAnswer(new PossibleAnswer(3, "Λευκωσία"))
  whichDistrict.addPossibleAnswer(new PossibleAnswer(4, "Λεμεσός"))
  whichDistrict.correctAnswer = 1

  const population: GameQuestion = new GameQuestion("athienou.jpeg", "Πόσος είναι ο πληθυσμός της Αθηένου;")  
  population.addPossibleAnswer(new PossibleAnswer(1, "<1000"))
  population.addPossibleAnswer(new PossibleAnswer(2, "1000-5000"))
  population.addPossibleAnswer(new PossibleAnswer(3, "5000-10000"))
  population.addPossibleAnswer(new PossibleAnswer(4, ">10000"))
  population.correctAnswer = 2

  const game = new Game(whereIsThisGame, whichDistrict, population)

  const [gameState, setGameState] = useState(game)
  let [currentGameQuestion, setCurrentGameQuestion] = useState(0)

  const answerClassNames = {
    "CORRECT": "correct-answer",
    "WRONG": "wrong-answer"
  }

  function getAnswerClassNameForStatus(status: string): string{
    return status === "CORRECT" ? "correct-answer" : 
            status === "WRONG" ? "wrong-answer" : ""
  }

  function checkAnswer(question:GameQuestion, answerId: number){    
    question.checkAnswer(answerId)
    setGameState({...gameState})    
  }

  return (
    <main>
      <header>
        <img src="/pouentouto-logo.png" alt="" />
      </header>
      <main>
        {/* POU EN TOUTO */}
        {currentGameQuestion === 0 && <div className="game-question where-is-this">
          <section id="place-photo">
            <img src={`/place-photos/${gameState.whereIsThisGame.placePhoto}`} alt="" />
          </section>
          <section id="question">
            <div className="question-title">{gameState.whereIsThisGame.question}</div>
            <ul className="possible-answers">
              {
                gameState.whereIsThisGame.possibleAnswers.map((answer) => {
                  return <li key={answer.id}  className={getAnswerClassNameForStatus(answer.status)}><button onClick={() => checkAnswer(gameState.whereIsThisGame, answer.id)}>{answer.title}</button></li>
                })
              }
            </ul>
          </section>
          {gameState.whereIsThisGame.correctAnswerIsFound() && <button onClick={() => setCurrentGameQuestion(++currentGameQuestion)}>Επόμενος γύρος</button>}
        </div>}

        {/* SE PIA EPARXIA */}
        {currentGameQuestion === 1 && <div className="game-question which-district">
          <section id="place-photo">
            <img src={`/place-photos/${gameState.whichDistrict.placePhoto}`} alt="" />
          </section>
          <section id="question">
            <div className="question-title">{gameState.whichDistrict.question}</div>
            <ul className="possible-answers">
              {
                gameState.whichDistrict.possibleAnswers.map((answer) => {
                  return <li key={answer.id}  className={getAnswerClassNameForStatus(answer.status)}><button onClick={() => checkAnswer(gameState.whichDistrict, answer.id)}>{answer.title}</button></li>
                })
              }
            </ul>
          </section>
          {gameState.whichDistrict.correctAnswerIsFound() && <button onClick={() => setCurrentGameQuestion(++currentGameQuestion)}>Επόμενος γύρος</button>}
        </div>}

        {/* POPULATION */}
        {currentGameQuestion === 2 && <div className="game-question population">
          <section id="place-photo">
            <img src={`/place-photos/${gameState.population.placePhoto}`} alt="" />
          </section>
          <section id="question">
            <div className="question-title">{gameState.population.question}</div>
            <ul className="possible-answers">
              {
                gameState.population.possibleAnswers.map((answer) => {
                  return <li key={answer.id}  className={getAnswerClassNameForStatus(answer.status)}><button onClick={() => checkAnswer(gameState.population, answer.id)}>{answer.title}</button></li>
                })
              }
            </ul>
          </section>
          {gameState.population.correctAnswerIsFound() && <button onClick={() => setCurrentGameQuestion(++currentGameQuestion)}>Επόμενος γύρος</button>}
        </div>}
      </main>
    </main>
  )
}