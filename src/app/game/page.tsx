"use client"

import "./main.css"
import "./header.css"
import "./place-photo.css"
import "./question.css"
import { useState } from "react"
import GameQuestion from "@/modules/game/GameQuestion"
import PossibleAnswer from "@/modules/game/PossibleAnswer"
import Game from "@/modules/game/Game"
import VillageService from "@/modules/villages/village-service"

let villageService = new VillageService()
let village = villageService.getVillageById(264)

export default function GamePage() {
  
  let game: Game = new Game()
  const BASE_PATH = process.env.BASE_PATH  

  const whereIsThisGame: GameQuestion = new GameQuestion(
    village.photoFilename, 
    "Πού εν τούτον;", 
    ["Τρούλλοι", village.name, "Αβδελλερό", "Αραδίππου"], 1)  
  game.appendGameQuestion(whereIsThisGame)

  const whichDistrict: GameQuestion = new GameQuestion(
    village.photoFilename, 
    `Σε πια επαρχία βρίσκεται το χωριό ${village.name};`, 
    [village.district ? village.district.name : "", "Πάφος", "Λευκωσία", "Λεμεσός"], 0)  
  game.appendGameQuestion(whichDistrict)

  const population: GameQuestion = new GameQuestion(
    village.photoFilename, 
    "Πόσος είναι ο πληθυσμός του χωριού Αθηένου;", 
    ["<1000", "1000-5000", "5000-10000", ">10000"], 1)  
  game.appendGameQuestion(population)

  const [gameState, setGameState] = useState(game)

  function getAnswerClassNameForStatus(status: string): string{
    return status === "CORRECT" ? "correct-answer" : 
            status === "WRONG" ? "wrong-answer" : ""
  }

  function checkAnswer(answerIndex: number){        
    gameState.gameQuestions[gameState.currentLevel].checkAnswer(answerIndex)
    setGameState({...gameState})    
  }

  function goToNextLevel(){    
    gameState.currentLevel++
    setGameState({...gameState})   
  }

  return (
    <main>
      <header>
        <img src={`${BASE_PATH}/pouentouto-logo.png`} alt="" />
      </header>
      <main>
        <div className="game-question where-is-this">
          <section id="place-photo">
            <img src={`${BASE_PATH}/place-photos/${gameState.gameQuestions[gameState.currentLevel].placePhoto}`} alt="" />
          </section>
          <section id="question">
            <div className="question-title">{gameState.gameQuestions[gameState.currentLevel].question}</div>
            <ul className="possible-answers">
              {
                gameState.gameQuestions[gameState.currentLevel].possibleAnswers.map((answer: PossibleAnswer, index: number) => {
                  return <li key={index}  className={getAnswerClassNameForStatus(answer.status)}><button onClick={() => checkAnswer(index)}>{answer.title}</button></li>
                })
              }
            </ul>
          </section>
          {gameState.gameQuestions[gameState.currentLevel].correctAnswerIsFound() && <button className="next-level" onClick={() => goToNextLevel()}>Επόμενος γύρος</button>}
        </div>
      </main>
    </main>
  )
}