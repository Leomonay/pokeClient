import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonZoom } from '../../actions/dataActions';
import Type from './Types';
import './PokeCard.css'
import { Link } from 'react-router-dom';
import appConfig from '../../config'
import loading from '../../../src/assets/imgs/esperando.gif'
const host = appConfig.host

export default function PokeCard(props) {
    const [pokemon,setPokemon] = useState({id:'',name:'',img:'', gif:'',types:['']})
    const {pokemonShown} = useSelector(state=>state.data)
    const dispatch = useDispatch()
    const arrayTypes = props.types
    
    async function getPokemon(){
        let url = `${host}/pokemon/${props.pokemonName?`byname?name=${props.pokemonName}`:props.id}`
        await fetch(url)
        .then(res=> res.json())
        .catch(e=>{
            console.error(e.message)
            return 'error'
        })
        .then(res=>{
            let pokemon={}
                pokemon.id=res.id
                pokemon.name=res.name.toUpperCase()
                pokemon.img=res.imageIcon?res.imageIcon:res.imageFront
                pokemon.gif=res.bigImage
                pokemon.types=res.types
            setPokemon(pokemon)
        })
        .catch(e=>{
            console.error(e.message)
            return 'error'
        })
    }

    function handleMouseOver(){
        if (pokemon.gif!==pokemonShown){
            dispatch(setPokemonZoom(pokemon.gif))
        }
    }
    useEffect(()=>{getPokemon()},[])

    function checkType(){
        if ((!arrayTypes) || arrayTypes.length===0) return true
        for (let i=0;i<=arrayTypes.length;i++){
            if (arrayTypes.includes(pokemon.types[i])) return true
        }
        return false
    }
    if(!pokemon.id){
        return(
            <div className='cardLoading'>
                <img className='cardLoadingImg' src={loading} alt='loading'/>
            </div>
        )
    }
    
    return (
        <Link className='toDetail' to={`/pokemon/${pokemon.id}`} style={{display: checkType()?'flex':'none'}}>
            <div className={'cardBackground ' +pokemon.types[0]} onMouseOver={()=>handleMouseOver()}>
                <div className='cardTitle'>{pokemon.name}</div>
                <div>
                    <div className='basis'>
                        <img className='cardImg' src={pokemon.img} alt=''/>
                    </div>
                </div>
                <div className='cardTypes'>
                    {pokemon.types.map(type=>
                        <Type name={type} key={type}/>
                    )}
                </div>
            </div>
        </Link>
    )
} 