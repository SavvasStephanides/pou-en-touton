"use client"

import "./main.css"
import "./header.css"
import "./place-photo.css"
import "./question.css"
import "./toaster.css"
import { useState } from "react"
import PossibleAnswer from "@/modules/game/PossibleAnswer"
import Game from "@/modules/game/Game"
import GameService from "@/modules/game/game-service"

let gameService: GameService = new GameService()

export default function GamePage() {
  if(typeof window === "undefined"){
    return (<main>...</main>)
  }
  const BASE_PATH = process.env.BASE_PATH  

  let game: Game
  
  let gameFromLocalStorage = window.localStorage.getItem("pouentouton-game")
  let lastSavedToday: boolean = window.localStorage.getItem("pouentouton-game-date") === new Date().toDateString()
  if(gameFromLocalStorage && lastSavedToday){
    game = gameService.jsonToGame(gameFromLocalStorage)
  }
  else{
    game = gameService.getTodaysGame()
  }

  const [gameState, setGameState] = useState(game)

  function getAnswerClassNameForStatus(status: string): string{
    return status === "CORRECT" ? "correct-answer" : 
            status === "WRONG" ? "wrong-answer" : ""
  }

  function checkAnswer(answerIndex: number){        
    gameState.gameQuestions[gameState.currentLevel].checkAnswer(answerIndex)
    
    if(gameState.gameQuestions[gameState.currentLevel].possibleAnswers.find(a => a.status === "CORRECT")){
      showToaster("🎉 Ήβρες το!")
    }
    
    setGameState({...gameState})    
  }

  function goToNextLevel(){    
    document.querySelector(".game-question")?.removeAttribute("fade-in")
    document.querySelector(".game-question")?.setAttribute("hide", "")

    setTimeout(() => {
      document.querySelector(".game-question")?.removeAttribute("hide")
      document.querySelector(".game-question")?.setAttribute("fade-in", "")
    }, 50)
    
    gameState.currentLevel++
    setGameState({...gameState})   
  }

  function copyShareableString(){
    let shareableString = gameState.toShareableString()
    if(navigator.share){
      navigator.share({
        text: shareableString
      })
    }
    else{
      navigator.clipboard.writeText(shareableString)
      showToaster("📋 Εμπήκε στο clipboard")
    }
  }

  function setGameStateToLocalStorage(){
    if(typeof window !== "undefined"){
      localStorage.setItem("pouentouton-game", JSON.stringify(gameState))
      localStorage.setItem("pouentouton-game-date", new Date().toDateString())
    }
    return true
  }

  function showToaster(text: string){
    let toasterWrapper = document.querySelector("#toaster-wrapper")
    let toaster = document.querySelector("#toaster-wrapper #toaster")
    if(toaster){
      toaster.innerHTML = text
    }
    toasterWrapper?.setAttribute("show", "1")

    setTimeout(() => {
      toasterWrapper?.setAttribute("show", "0")
    }, 3000)
  }

  return (
    <div>
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
            <div className="question-title">{gameState.gameQuestions[gameState.currentLevel].iconEmoji} {gameState.gameQuestions[gameState.currentLevel].question}</div>
            <ul className="possible-answers">
              {
                gameState.gameQuestions[gameState.currentLevel].possibleAnswers.map((answer: PossibleAnswer, index: number) => {
                  return <li key={index}  className={getAnswerClassNameForStatus(answer.status)}><button onClick={() => checkAnswer(index)}>{answer.title}</button></li>
                })
              }
            </ul>
          </section>
          {gameState.gameQuestions[gameState.currentLevel].correctAnswerIsFound() && <div className="question-end-buttons">
            <button className="share" onClick={() => copyShareableString()}>Share</button>
            {gameState.currentLevel !== (gameState.gameQuestions.length-1) && <button className="next-level" onClick={() => goToNextLevel()}>Επόμενος γύρος</button>}
            
          </div>}
        </div>
      </main>
      <div id="toaster-wrapper">
        <div id="toaster" style={{margin: "auto", backgroundColor: "black", color: "white", padding: "9px 30px", marginTop: "30px", width: "300px", textAlign: "center"}}>

        </div>
      </div>
    </div>
  )
}