import React from 'react';
import SearchBar from '../navigation/SearchBar'
import PokemonGrid from '../pokemon/PokemonGrid';
import PokeZoom from '../pokemon/PokeZoom'
import './Pokedex.css'

export default function Pokedex() {
    return (
        <div className='pokedexBackground'>
            <div className='lightBackground'>
                <SearchBar/>
                <div className='pokedexBD'>
                    <div className='pokedexIndex'>   
                        <div className='gridContainer'>
                            <PokemonGrid/>
                        </div>
                    </div>
                    <div className='pokemonVisor'>
                        <PokeZoom/>
                    </div>                
                </div>
            </div>
        </div>
    )
} 