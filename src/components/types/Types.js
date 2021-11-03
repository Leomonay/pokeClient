import './Types.css'

export default function Type(props) {
    return(
        <div className={'type '+props.name} value={props.name} style={props.typeStyles}>{props.name.toUpperCase()}</div>
    )
} 