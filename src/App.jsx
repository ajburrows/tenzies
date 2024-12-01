import Die from "./components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti' 

export default function App(){
  const [dice, setDice] = useState(() => generateDiceObjs())

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
        value: Math.ceil(Math.random() * 6),
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

  const gameWon = checkGameOver()

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze or unfreeze them.</p>
      <div className="dice-container">
        {dieComponentsArray}
      </div>
      <button className="reroll-button" onClick={rerollDice}>{gameWon ? "New Game" : "Reroll" }</button>
    </main>
  )
}