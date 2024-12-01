
export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <button
            className="die"
            style={styles}
            onClick={() => props.toggleHeld(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`${props.isHeld ? "Frozen die" : "Die"} with value ${props.value}`}
        >
            {props.value}
        </button>
    )
}