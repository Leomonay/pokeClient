import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNewPokemon } from '../../actions/pokemonActions'
import PokeCard from './PokeCard'
import './Result.css'

export default function Result(props){
    const {id} = props
    const [display,setDisplay]=useState(props.display)
    const dispatch = useDispatch()
    useEffect(()=>{setDisplay(props.display)},[props.display])

    return(
        <div className='resultBackground' style={{display : display}}>
            Here is your Pokemon!<br/>
            click to see it!
            <PokeCard id={id} pokemon={props.pokemon}/>
            or...
            <div className='createOther'
                onClick={()=>{
                    dispatch(setNewPokemon({}))
                    setDisplay('none')
                    }}
                >Create other</div>
        </div>
    )

}