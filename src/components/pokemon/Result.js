import { useEffect, useState } from 'react'
import PokeCard from './PokeCard'
import './Result.css'

export default function Result(props){
    const {id} = props
    const [display,setDisplay]=useState(props.display)
    
    useEffect(()=>{setDisplay(props.display)},[props.display])

    return(
        <div className='resultBackground' style={{display : display}}>
            Here is your Pokemon!<br/>
            click to see it!
            <PokeCard id={id}/>
            or...
            <div className='createOther'
                onClick={()=>{setDisplay('none'); props.parentFunction(null)}}
                >Create other</div>
        </div>
    )

}