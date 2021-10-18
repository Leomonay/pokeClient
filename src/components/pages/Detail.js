import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router';
import appConfig from '../../config'
import Type from '../pokemon/Types'
import './Detail.css'
const {host}=appConfig

export default function Detail() {
    const [detail,setDetail]=useState({})
    const [backClass, setBackClass]=useState('detailBack')
    const { id } = useParams();

    const backgroundsByType = {
        bug: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        dark: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        dragon: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        electric: 'https://t4.ftcdn.net/jpg/00/78/66/13/360_F_78661336_lJhntUBgIfUC21TuFgfMoTEvDQT5dBIE.jpg',
        fairy: 'http://cdn30.us1.fansshare.com/image/wallpaperbackground/blue-sky-background-hd-wallpapers-blue-1177767224.jpg',
        fighting: 'https://i2.wp.com/recommendmeanime.com/wp-content/uploads/2020/10/anime-tournements.jpg',
        fire: 'https://images2.alphacoders.com/282/thumb-1920-28242.jpg',
        flying: 'http://cdn30.us1.fansshare.com/image/wallpaperbackground/blue-sky-background-hd-wallpapers-blue-1177767224.jpg',
        ghost: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        grass: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        ground: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        ice: 'https://cdn.dribbble.com/users/87294/screenshots/3119991/iceberg_800x600.jpg',
        normal:  'https://i2.wp.com/recommendmeanime.com/wp-content/uploads/2020/10/anime-tournements.jpg',
        poison: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        psychic: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        rock: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        steel: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        water: 'https://image.freepik.com/vector-gratis/fondo-mar-videoconferencias_52683-43441.jpg',
    }

    function getDetail(){
        fetch(`${host}/pokemon/${id}`)
        .then(response=>response.json())
        .then(response=>{
            let pokemon={}
            pokemon.id=response.id
            pokemon.name=response.name.toUpperCase()
            pokemon.front=response.imageIcon?response.imageIcon:response.imageFront
            if( (!response.imageBack) || response.imageBack==='')setBackClass('detailBack fromFront')
            pokemon.back=response.imageBack?response.imageBack:response.imageFront
            pokemon.official=response.imageFront
            pokemon.bigImage=response.bigImage
            pokemon.types=response.types
            pokemon.stats=response.stats
            console.log('pokemon.stats', pokemon.stats)
            setDetail(pokemon)
        })
    }

    useEffect(()=>{
        function effect(){
            getDetail()
        };
        effect();
    },[id])

    if(!detail.id)return<>loading</>
    return (
        <div className='pokedexBackground' style={{backgroundImage: `url(${backgroundsByType[detail.types[0]]})`}}>
            <div className='lightBackground'>
                <div className='title'>{detail.name}</div>
                <div className='subtitle'>{detail.types.length===1?'Type':'Types'}</div>
                    <div className='detailTypes'>
                        {detail.types.map(e=><Type key={e} name={e}/>)}
                    </div>
                    <div className='subtitle'>Pokedex id: #{detail.id}</div>
                <div className='detailContent'>

                    <div className={'imageGallery ' +detail.types[0]} >
                        <img className='detailFront' src={detail.front} alt=''/>
                        <img className='detailBig' src={detail.official} alt=''/>
                        <img className={backClass} src={detail.back} alt=''/>
                    </div>

                    <div className='detailStats'>
                        {detail.stats.map(e=>
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