
export default function Die(props){
    return(
        <button className="die" onClick={() => console.log("clicked")}>{props.value}</button>
    )
}