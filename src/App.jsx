import Die from "./components/Die"
import { useState } from "react"

export default function App(){
  const [dieVals, setDieVals] = useState(generateAllNewDice())

  function generateAllNewDice(){
    const res = []
    for (let i = 0; i < 10; i++){
      res.push(Math.ceil(Math.random() * 6))
    }
    return res
  }

  const dieComponentsArray = dieVals.map(val => <Die value={val} />)

  console.log(dieComponentsArray)
  return(
    <main className="game-container">
      <div className="dice-container">
        {dieComponentsArray}
      </div>

    </main>
  )
}