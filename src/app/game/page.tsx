"use client"

import "./main.css"
import "./header.css"
import "./place-photo.css"
import "./question.css"
import "./toaster.css"
import { useEffect, useState } from "react"
import PossibleAnswer from "@/modules/game/PossibleAnswer"
import Game from "@/modules/game/Game"
import GameService from "@/modules/game/game-service"
import Link from "next/link"

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
  const [nextGameTimer, setNextGameTimer] = useState("")
  const [sideMenuIsVisible, setSideMenuIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      let timeNowAsUTC = new Date(new Date(Date.now()).toLocaleString("en-US", {timeZone: "UTC"}))
      let hours = 23 - timeNowAsUTC.getHours()
      let minutes = 59 - timeNowAsUTC.getMinutes()
      let seconds = 59-timeNowAsUTC.getSeconds()

      let hoursDisplay = hours >= 10 ? hours : `0${hours}`
      let minutesDisplay = minutes >= 10 ? minutes : `0${minutes}`
      let secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`

      setNextGameTimer(`${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`)
    }, 1000)
    

    
  })

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

  function showSideMenu(){
    setSideMenuIsVisible(true)
    
  }

  return (
    <div>
    {
      setGameStateToLocalStorage()
    }

      <div dangerouslySetInnerHTML={{__html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2194018182042050"
          crossorigin="anonymous"></script>
      <!-- Pou en touton -->
      <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-2194018182042050"
          data-ad-slot="3596258713"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>`}}></div>
      
      <header style={{maxWidth: "600px", margin: "auto", position: "relative"}}>
        <button onClick={showSideMenu} style={{position: "absolute", left: "15px", backgroundColor: "white", border: "1px solid #eee", borderRadius: "15px", cursor: "pointer"}}><img src={`${BASE_PATH}/hamburger.png`} alt="" style={{height: "30px"}}/></button>
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
            <button className="share" onClick={() => copyShareableString()}>Μοιράσου το σκόρ σου!</button>
            {gameState.currentLevel !== (gameState.gameQuestions.length-1) && <button className="next-level" onClick={() => goToNextLevel()}>🎁 Bonus γύρος</button>}

            
          </div>}
          {gameState.gameQuestions[gameState.currentLevel].correctAnswerIsFound() &&
          <div>
            <div style={{textAlign: "center", marginTop: "30px"}}>
              <Link href={`https://www.google.com/maps/place/${gameState.gameQuestions[0].possibleAnswers[gameState.gameQuestions[0].correctAnswer].title},Cyprus`}>Μάθε περισσότερα!</Link>
            </div>
            <div style={{padding: "30px"}}>
                <div style={{textAlign: "center"}}>Επόμενη φωτογραφία σε:</div>
                <div style={{fontSize: "30px", fontWeight: "bold", marginTop: "9px", textAlign: "center"}}>🕰️ {nextGameTimer}</div>
            </div>
          </div>
          }
        </div>
      </main>
      <div id="toaster-wrapper">
        <div id="toaster" style={{margin: "auto", backgroundColor: "black", color: "white", padding: "9px 30px", marginTop: "30px", width: "300px", textAlign: "center"}}>

        </div>
      </div>
      <div style={{position: "absolute", left: 0, top: 0, width: "300px", backgroundColor: "white", height: "100%", borderRight: "1px solid #eee", display: sideMenuIsVisible ? "block" : "none", padding: "21px"}}>
        <h2>Τζιάλλα παιχνίδκια!</h2>
        <div style={{marginTop: "15px"}}>
          <Link href={"https://savvas.me/xorkaton"} style={{display: "block", width: "100%"}}>
            <img src={`${BASE_PATH}/xorkaton-logo.png`} alt="" style={{width: "150px"}}/>
          </Link>
        </div>

        <h2 style={{marginTop: "30px"}}>Δημιουργός</h2>
        <div style={{marginTop: "21px"}}>
          <Link href={"/contact"} style={{border: "1px solid #ddd", padding: "6px", borderRadius: "12px", textDecoration: "none", color: "black"}}>Επικοινωνία με τον δημιουργό</Link>
        </div>
        <button style={{position: "absolute", right: "12px", top: "12px", fontSize: "21px"}} onClick={() => setSideMenuIsVisible(false)}>X</button>
      </div>
      
    </div>
  )
}