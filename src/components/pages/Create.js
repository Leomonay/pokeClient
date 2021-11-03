import React, { useEffect } from 'react';
import TypeSelector from '../types/TypeSelector';
import './Create.css'
import Result from '../pokemon/Result';
import {createNewPokemon, setNewPokemon, setNewPokemonType } from '../../actions/pokemonActions'
import { useDispatch, useSelector } from 'react-redux';
import { utils } from '../../utils';
import { setErrors } from '../../actions/dataActions';
const {statsLimits, errorItems} = utils

export default function CreatePokemon() {
    const {newPokemon}=useSelector(state=>state.pokemon)
    const {creationErrors}=useSelector(state=>state.data)
    const dispatch = useDispatch()

    function handleNameChange(e){dispatch(setNewPokemon({...newPokemon,name: e.target.value}))}

    function getSelectedTypes(types){dispatch(setNewPokemonType(types))}

    function handleStatsChange(e){
        let stat = e.target.id
        dispatch(setNewPokemon(
            {...newPokemon,stats:{
                ...newPokemon.stats,[stat]: Number(e.target.value)}}))
    }
    
    function handleImageChange(e){
        let ref = {'Icon':'icon','Main image':'front','Back icon':'backIcon'}
        let item = ref[e.target.id]
        dispatch(setNewPokemon(
            {...newPokemon,images:
                {...newPokemon.images,[item]:e.target.value}
            }
        ))
    }

    function Errors(props){
        const {errors} = props
        const keys = Object.keys(errors)
        if(keys.length>0) return keys.map(key=>{
            const item = key[0].toUpperCase()+key.slice(1)
            return<li key={key}><b>{item+": "}</b>{errors[key]}</li>
        })
        return<></>
    }

    useEffect(()=>dispatch( setErrors (errorItems(newPokemon))),[newPokemon,dispatch])

    return (
        <div className='newPokemonBackground'>
            <div className='newPokemonScreen'>
                <div className='createHeader'>
                    <div className='createTitle'>Pokemon Lab </div> - Where pokemon can be created -
                </div>
                <div className='createHeader'>
                    <div className='nameInputLabel'>Name</div>
                    <input type='text' className='nameTextInput' id='createNameInput' placeholder='New pokemon name' onChange={(e)=>handleNameChange(e)}/>
                    <TypeSelector select={getSelectedTypes} limit='2'/>

                </div>

                <div className='createDescription'>

                    <div className='createSection'>
                        <b>Set Images:</b><br/>
                        {['Main image', 'Icon', 'Back icon'].map(e=>
                            <div className='inputDiv' key={e}>
                                <div className='inputLabel'>{e}</div>
                                <input className='textInput' type='text' id={e} placeholder='type a transparent png URL' onChange={e=>handleImageChange(e)}/>
                            </div>
                        )}
                        <div className='createGallery'>
                            <img className='createIcon' src={(!newPokemon.images || !newPokemon.images.icon)? 'https://i.imgur.com/ROlBaFl.png' : newPokemon.images.icon} alt='icon'/>
                            <img className='createMain' src={(!newPokemon.images || !newPokemon.images.front)? 'https://i.imgur.com/ROlBaFl.png' : newPokemon.images.front} alt='main'/>
                            <img 
                                className={'createBack'+(newPokemon.images?
                                    ((!newPokemon.images.backIcon) && newPokemon.images.front ?' fromFront':''):'')} 
                                
                                src={(!newPokemon.images || !(newPokemon.images.backIcon || newPokemon.images.front)? 'https://i.imgur.com/ROlBaFl.png':
                                        (newPokemon.images.backIcon ? newPokemon.images.backIcon
                                            :newPokemon.images.front))} alt='back'/>
                        </div>
                    </div>

                    <div className='createSection'>
                        <b>Stats:</b><br/>
                        <div className='statsSection'>
                            {Object.keys(statsLimits).map(stat=>
                                <div className='statInputDiv' key={stat}>
                                    <div className='inputLabel'>{stat}</div>
                                    <input 
                                        id={stat}
                                        className='numInput'
                                        type='number'
                                        placeholder={statsLimits[stat].min+' - '+statsLimits[stat].max}
                                        min={statsLimits[stat].min}
                                        max={statsLimits[stat].max}
                                        onChange={event=>handleStatsChange(event)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='errorMessages'>
                            {<Errors errors={creationErrors}/>}
                            <div className='createButton'
                                style={{display:Object.keys(creationErrors).length===0?'flex':'none'}}
                                onClick={()=>dispatch(createNewPokemon(newPokemon))}
                                >Create!
                            </div>
                            {newPokemon.pokemon&&<div className='creationResult'>
                                <Result id={newPokemon.pokemon.id} display={newPokemon.pokemon?'flex':'none'} pokemon={newPokemon.pokemon}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 