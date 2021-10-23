import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router';
import { resetPokemonResult, getPokemonDetail, setNewPokemon } from '../../actions/pokemonActions';
import { utils } from '../../utils';
import Type from '../pokemon/Types'
import './Detail.css'
const {backgroundsByType}=utils

export default function Detail() {
    const {pokemonDetail} = useSelector(state=>state.pokemon)
    const {base} = useSelector(state=>state.data)
    const [backClass, setBackClass]=useState('detailBack')
    const {id} = useParams();
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(resetPokemonResult())
        dispatch(setNewPokemon({}))},[dispatch])

    useEffect(()=>dispatch(getPokemonDetail(id)),[id,dispatch,base])

    useEffect(()=>{
        pokemonDetail.imageBack?setBackClass('detailBack'):setBackClass('detailBack fromFront')
    },[pokemonDetail])

    if(!pokemonDetail.id)return<div>loading</div>
    return (
        <div className='pokedexBackground' style={{backgroundImage: `url(${backgroundsByType[pokemonDetail.types[0]]})`}}>
            <div className='lightBackground'>
                <div className='title'>{pokemonDetail.name}</div>
                <div className='subtitle'>{pokemonDetail.types.length===1?'Type':'Types'}</div>
                    <div className='detailTypes'>
                        {pokemonDetail.types.map(e=><Type key={e} name={e}/>)}
                    </div>
                    <div className='subtitle'>Pokedex id: #{pokemonDetail.id}</div>
                <div className='detailContent'>

                    <div className={'imageGallery ' +pokemonDetail.types[0]} >
                        <img className='detailFront' src={pokemonDetail.imageIcon||pokemonDetail.imageFront} alt=''/>
                        <img className='detailBig' src={pokemonDetail.imageFront} alt=''/>
                        <img className={backClass} src={pokemonDetail.imageBack||pokemonDetail.imageFront} alt=''/>
                    </div>

                    <div className='detailStats'>
                        {pokemonDetail.stats.map(e=>
                            <div className='detailStat' key={e.name}>
                                <div className='statName'>{e.name}</div>
                                <div className='statValue'>{e.value}</div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
} 