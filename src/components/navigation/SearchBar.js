import React, { useEffect, useState } from 'react';
import PokeCard from '../pokemon/PokeCard';
import appConfig from '../../config'
import './SearchBar.css'
const {host} = appConfig

export default function SearchBar() {
    const [pokemonName, setPokemonName] = useState  ('')
    const [displayError, setDisplayError] = useState('none')
    const [displaySuccess, setDisplaySuccess] = useState('none')

    function handleSubmit(){
        let name = document.getElementById('inputName').value
        setPokemonName( name )
        fetch(`${host}/pokemon/byname?name=${name}`)
        .then(data=>{
            if (data.status===200){
                setDisplaySuccess('flex')
            }else{
                setDisplayError('flex')
            }
        })
        .catch(error=>console.error(error.message))
    }

    function handleTryAgain(){
        document.getElementById('inputName').value=""
        setDisplaySuccess('none')
        setDisplayError('none')
    }
    useEffect(()=>document.getElementById('inputName').addEventListener(
        "keydown",(e)=>{
            if (e.code == "Enter")handleSubmit()
        }
    ),[])

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
                        {pokemonName&&<PokeCard pokemonName={pokemonName} key={pokemonName}/>}
                        or...
                    <div className='tryAgainButton' onClick={handleTryAgain}>search other</div>           
                </div>
                
            </div>
    )
}