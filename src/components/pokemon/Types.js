import './Types.css'

export default function Type(props) {
    return(
        <div className={'type '+props.name} name={props.name}>{props.name.toUpperCase()}</div>
    )
} 