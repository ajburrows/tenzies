import Die from "./components/Die"

export default function App(){
  return(
    <main className="game-container">
      <div className="dice-container">
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
        <Die value={1} />
      </div>

    </main>
  )
}