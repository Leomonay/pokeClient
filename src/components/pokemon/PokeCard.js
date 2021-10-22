import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonZoom } from '../../actions/pokemonActions';
import Type from './Types';
import './PokeCard.css'
import { Link } from 'react-router-dom';
// import loading from '../../../src/assets/imgs/esperando.gif'

export default function PokeCard(props) {
    const {pokemon}=props
    const {pokemonShown} = useSelector(state=>state.pokemon)
    const dispatch = useDispatch()

    function handleMouseOver(){
        if (pokemon.bigImage!==pokemonShown){
            dispatch(setPokemonZoom(pokemon.bigImage))
        }
    }
    
    return (
        <Link className='toDetail' to={`/pokemon/${pokemon.id}`}>
            <div className={'cardBackground ' +pokemon.types[0]} onMouseOver={()=>handleMouseOver()}>
                <div className='cardTitle'>{pokemon.name}</div>
                <div>
                    <div className='basis'>
                        <img className='cardImg' src={pokemon.imageIcon} alt=''/>
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