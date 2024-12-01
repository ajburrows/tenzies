import Die from "./components/Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti' 


export default function App(){
  const [dice, setDice] = useState(() => generateDiceObjs())
  const newGameButtonRef = useRef(null)

  function checkGameOver(){
    const firstVal = dice[0].value
    for(let die of dice){
      if (die.value !== firstVal || die.isHeld === false){
        return false
      }
    }
    return true
  }

  function generateDiceObjs(){
    const res = []
    for (let i = 0; i < 10; i++){
      res.push({
        //value: Math.ceil(Math.random() * 6),
        value: 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return res
  }

  function toggleHeld(id){
    setDice(prevDice => prevDice.map(die => 
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  function rerollDice(){
    setDice(prevDice => prevDice.map(die => 
      die.isHeld === false
        ? { ...die, value: Math.ceil(Math.random() * 6) }
        : die
    ))
  }

  function restartGame(){
    setDice(generateDiceObjs)
  }

  console.log(newGameButtonRef)
  const gameWon = checkGameOver()

  useEffect(() => {
    if (gameWon){
      newGameButtonRef.current.focus()
    }
  } , [gameWon])

  const dieComponentsArray = dice.map(dieObj => (
    <Die
      key={dieObj.id}
      id={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      toggleHeld={toggleHeld}
    />
  ))


  return(
    <main>
      {gameWon ? <Confetti /> : null }
      <div aria-live="polite" className="sr-only">
        {gameWon ? <p>Congratulations, you won! Press "New Game" to play again.</p> : null}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze or unfreeze them.</p>
      <div className="dice-container">
        {dieComponentsArray}
      </div>
      <button className="reroll-button" onClick={gameWon ? restartGame : rerollDice} ref={newGameButtonRef}>{gameWon ? "New Game" : "Reroll" }</button>
    </main>
  )
}