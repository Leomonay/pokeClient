import React, { useEffect, useState } from 'react';
import PokeCard from '../pokemon/PokeCard';
import './SearchBar.css'
import { searchPokemon } from '../../actions/pokemonActions';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchBar() {
    const {pokemonResult} = useSelector(data=>data.pokemon)
    const [displayError, setDisplayError] = useState('none')
    const [displaySuccess, setDisplaySuccess] = useState('none')
    const [activeSearch, setActiveSearch] = useState(false)
    const dispatch = useDispatch()

    function handleSubmit(){
        let name = document.getElementById('inputName').value
        dispatch(searchPokemon(name))
    }

    useEffect(()=>{
        console.log(!!pokemonResult)
        setActiveSearch(!!pokemonResult)
    },[pokemonResult])

    useEffect(()=>{if(activeSearch)
        if(pokemonResult.error){
            setDisplayError('flex')
        }else{
            setDisplaySuccess('flex')
        }
    },[activeSearch,pokemonResult])
    
    useEffect(()=>console.log('pokemonResult',pokemonResult),[pokemonResult])

    function handleTryAgain(){
        document.getElementById('inputName').value=""
        setDisplaySuccess('none')
        setDisplayError('none')
        setActiveSearch(false)
    }
    useEffect(()=>document.getElementById('inputName').addEventListener(
        "keydown",(e)=>{if (e.code === "Enter"){
            dispatch(searchPokemon(document.getElementById('inputName').value))
        }}
    ),[dispatch])

    return (
            <div className='pokeDexSearch'>
                <input className='searchInput' id='inputName' type='text' placeholder='type exact name'
                    // onKeyPress={(event)=>{if (event.code == 13)  handleSubmit()}}
                />
                <button type='submit' className='searchButton' onClick={handleSubmit}>Search</button>

                <div className='modal errorModal' id='errorModal' style={{display: displayError}}>
                    <h3>Pokemon Not Found</h3>
                    <h4>Remember to type the exact name</h4>
                    <div className='tryAgainButton' onClick={handleTryAgain}>Try Again</div>               
                </div>

                <div className='modal successModal' id='successModal' style={{display: displaySuccess}}>
                    <h3>Here is your Pokemon!</h3>
                    <h4>Click on it to see in detail</h4>
                        {(pokemonResult && !pokemonResult.error) && <PokeCard pokemon={pokemonResult}/>}
                        or...
                    <div className='tryAgainButton' onClick={handleTryAgain}>search other</div>           
                </div>
                
            </div>
    )
}