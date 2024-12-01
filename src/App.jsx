import Die from "./components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App(){
  const [dice, setDice] = useState(generateDiceObjs())

  function generateDiceObjs(){
    const res = []
    for (let i = 0; i < 10; i++){
      res.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        key: nanoid()
      })
    }
    return res
  }

  function rerollDice(){
    setDice(generateDiceObjs())
  }

  const dieComponentsArray = dice.map(dieObj => <Die value={dieObj.value} key={dieObj.key} />)

  return(
    <main>
      <div className="dice-container">
        {dieComponentsArray}
      </div>
      <button className="reroll-button" onClick={rerollDice}>Reroll</button>
    </main>
  )
}