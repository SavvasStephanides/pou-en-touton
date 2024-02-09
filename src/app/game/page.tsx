"use client"

import "./main.css"
import "./header.css"
import "./place-photo.css"
import "./question.css"
import { useEffect, useState } from "react"
import GameQuestion from "@/modules/game/GameQuestion"
import PossibleAnswer from "@/modules/game/PossibleAnswer"
import Game from "@/modules/game/Game"
import VillageService from "@/modules/villages/village-service"
import GameService from "@/modules/game/game-service"

let villageService = new VillageService()
let village = villageService.getVillageById(264)

function createGame(){
  let game: Game = new Game()

  const whereIsThisGame: GameQuestion = new GameQuestion(
    village.photoFilename, 
    "Πού εν τούτον;", 
    [
      new PossibleAnswer("Τρούλλοι"), 
      new PossibleAnswer(village.name), 
      new PossibleAnswer("Αβδελλερό"), 
      new PossibleAnswer("Αραδίππου")
    ], 1)  
  game.appendGameQuestion(whereIsThisGame)

  const whichDistrict: GameQuestion = new GameQuestion(
    village.photoFilename, 
    `Σε πια επαρχία βρίσκεται το χωριό ${village.name};`, 
    [
      new PossibleAnswer(village.district ? village.district.name : ""), 
      new PossibleAnswer("Πάφος"), 
      new PossibleAnswer("Λευκωσία"), 
      new PossibleAnswer("Λεμεσός")
    ], 0)  
  game.appendGameQuestion(whichDistrict)

  const population: GameQuestion = new GameQuestion(
    village.photoFilename, 
    "Πόσος είναι ο πληθυσμός του χωριού Αθηένου;", 
    [
      new PossibleAnswer("<1000"), 
      new PossibleAnswer("1000-5000"), 
      new PossibleAnswer("1000-5000"), 
      new PossibleAnswer(">10000")
    ], 1)  
  game.appendGameQuestion(population)

  return game;
}

export default function GamePage() {
  if(typeof window === "undefined"){
    return (<main>...</main>)
  }
  const BASE_PATH = process.env.BASE_PATH  
  
  let game: Game
  
  let gameFromLocalStorage = window.localStorage.getItem("pouentouton-game")
  let lastSavedToday: boolean = window.localStorage.getItem("pouentouton-game-date") === new Date().toDateString()
  if(gameFromLocalStorage && lastSavedToday){
    game = new GameService().jsonToGame(gameFromLocalStorage)
    console.log("Saved game")
    console.log(game)
  }
  else{
    game = createGame()
    console.log("New game");
    console.log(game)
  }

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
    document.querySelector(".game-question")?.removeAttribute("fade-in")
    document.querySelector(".game-question")?.setAttribute("hide", "")

    setTimeout(() => {
      document.querySelector(".game-question")?.removeAttribute("hide")
      document.querySelector(".game-question")?.setAttribute("fade-in", "")
    }, 50)
    console.log(document.querySelector(".game-question"))
    
    gameState.currentLevel++
    setGameState({...gameState})   
  }

  function setGameStateToLocalStorage(){
    if(typeof window !== "undefined"){
      localStorage.setItem("pouentouton-game", JSON.stringify(gameState))
      localStorage.setItem("pouentouton-game-date", new Date().toDateString())
    }
    return true
  }

  return (
    <main>
    {
      setGameStateToLocalStorage()
    }
      <header>
        <img src={`${BASE_PATH}/pouentouto-logo.png`} alt="" />
      </header>
      <main>
        <div className="game-question">
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