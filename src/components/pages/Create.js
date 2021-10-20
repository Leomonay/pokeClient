import React, { useEffect, useMemo, useState } from 'react';
import TypeSelect from '../pokemon/TypeSelect';
import appConfig from "../../config"
import './Create.css'
import Result from '../pokemon/Result';
const host = appConfig.host

export default function CreatePokemon() {
    const [newId, setNewId]=useState(null)
    const [statErrors, setStatErrors]=useState([])
    const [displayResult, setDisplayResult]=useState('none')
    const statsLimits= useMemo(()=>{
        return {
            'Hp':{min: '5', max: '255'},
            'Height':{min: '20', max: '2000'},
            'Weight':{min: '0.1', max: '1000'},
            'Attack':{min: '5', max: '255'},
            'Special Attack':{min: '5', max: '255'},
            'Defense':{min: '5', max: '255'},
            'Special Defense':{min: '5', max: '255'},
            'Speed':{min: '5', max: '255'},
        }
    },[])
    const [newPokemon, setNewPokemon] = useState({
        name:'',
        types:[],
        images:{
            icon:'',
            front:'',
            backIcon:''
        },
        stats:{
            'Hp':0,
            'Height':0,
            'Weight':0,
            'Attack':0,
            'Special Attack':0,
            'Defense':0,
            'Special Defense':0,
            'Speed':0,
        }
    })

    function handleNameChange(e){
        setNewPokemon({...newPokemon,name: e.target.value})
    }
    function getSelectedTypes(types){
        setNewPokemon({...newPokemon,types: types})
    }
    function handleStatsChange(e){
        let stat = e.target.id
        setNewPokemon(
            {...newPokemon,stats:{
                ...newPokemon.stats,[stat]: Number(e.target.value)}})
    }
    function handleImageChange(e){
        let ref = {'Icon':'icon','Main image':'front','Back icon':'backIcon'}
        let item = ref[e.target.id]
        setNewPokemon({...newPokemon,images:{
            ...newPokemon.images,[item]:e.target.value
        }})
    }

    useEffect(()=>{
        function handleErrors(){
            let errors=[]
            if (!newPokemon.name)errors.push({error: 'Name: ', detail: `a pokemon needs a name!`})
            if (!newPokemon.types || newPokemon.types.length===0)errors.push({error: 'Types: ', detail: `at least one type must be selected.`})
            if (!newPokemon.images || !newPokemon.images.front)errors.push({error: 'Images: ', detail: `at least a front image must be set.`})
            let statsSum = 0
            for (let stat of Object.keys(newPokemon.stats || statsLimits)){
                if (!newPokemon.stats || newPokemon.stats[stat]<statsLimits[stat].min || newPokemon.stats[stat]>statsLimits[stat].max){
                    errors.push({error: [stat]+": ", detail: `value must be between ${statsLimits[stat].min} and ${statsLimits[stat].max}.`})
                }
                if (newPokemon.stats && stat!=="Height"&&stat!=="Weight"){
                    statsSum += newPokemon.stats[stat]
                }
            }
            if (statsSum>600){
                errors.push({error: 'Total Stats: ', detail: `the sum of Hp, Attack, Special Attack, Defense, Special Defense and Speed must be equal to or less than 600.`})
            }
            setStatErrors(errors)
        };
        handleErrors()
    },[newPokemon, statsLimits])
 
    function sendPokemon(){
        fetch(`${host}/pokemon`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newPokemon)
        })
        .then(resp=>resp.json())
        .then(resp=>{
            if(resp.error){
                setStatErrors([resp])
            }else{
                setNewId(resp.id)
                setDisplayResult('flex')
            }
        })
    }

    useEffect(()=>{setNewPokemon({})},[])

    return (
        <div className='newPokemonBackground'>
            <div className='newPokemonScreen'>
                <div className='createHeader'>
                    <div className='createTitle'>Pokemon Lab </div> - Where pokemon can be created -
                </div>
                <div className='createHeader'>
                    <div className='nameInputLabel'>Name</div>
                    <input type='text' className='nameTextInput' id='createNameInput' placeholder='New pokemon name' onChange={(e)=>handleNameChange(e)}/>
                    Type:
                    <TypeSelect parentFunction={getSelectedTypes} limit='2'/>

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
                            {Object.keys(newPokemon.stats || statsLimits).map(stat=>
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
                        <div className='errorMessages'>{
                            statErrors.length>0?
                                statErrors.map(e=>
                                <li key={e.error}>
                                    <b>{e.error+" "}</b>
                                    {e.detail}
                                </li>) :""
                            }
                            <div className='createButton'
                                style={{display:statErrors.length===0?'flex':'none'}}
                                onClick={sendPokemon}
                                >Create!
                            </div>
                            {newId&&<div className='creationResult'>
                                <Result id={newId} display={displayResult} parentFunction={setNewId}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 