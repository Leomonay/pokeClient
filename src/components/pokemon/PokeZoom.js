import React from 'react';
import { useSelector } from 'react-redux';
import './PokeZoom.css'

export default function PokeZoom(props) {
    const {pokemonShown} = useSelector(state=>state.pokemon)

    return (
        <div className='zoomBackground'>
            <div className='title'>Point a pokemon with mouse to view in large size</div>
            <div className='zoomVisor'>
                <img className='pokemonZoom' src={pokemonShown} alt=''/>
            </div>
        </div>
    )
} 