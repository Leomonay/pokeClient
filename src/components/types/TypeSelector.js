import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonTypes } from "../../actions/dataActions";
import Type from "./Types";

import './TypeSelector.css'

export default function TypeSelector(props){
    const {pokemonTypes} = useSelector(state=>state.data)
    const [showMenu, setShowMenu] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState([])
    const limit = parseInt(props.limit) || pokemonTypes.length
    const dispatch = useDispatch()
    const main = document.getElementsByClassName('main-content')[0]

    useEffect(()=> dispatch(getPokemonTypes()),[dispatch])

    function clickMenu(){
        main.onclick=showMenu?'':(event)=>closeDropDown(event)
        setShowMenu(!showMenu)
    }

    function handleClick(type){
        const types = selectedTypes.includes(type)?
            selectedTypes.filter(item=>item!==type)
            :[...selectedTypes,type]
        setSelectedTypes(types)
        props.select(types)
    }

    function closeDropDown(event){
        if(event.target.className.slice(0,4)!=='type'){
            setShowMenu(false)
            main.onclick=''
        }
        return
    }
    
    return(
        <div className='typeSelectBackground'>
            <div className='typeSelect' onClick={()=>clickMenu()}>Types &#9660;</div>
            <div className='selectedTypesList'>
                {selectedTypes.length>0 && selectedTypes.map(type=><Type key={type} name={type}/>)}
            </div>
            {showMenu && <div className='typeMenu'>
                <div className='typeList'>
                    {pokemonTypes.map((type,index)=>
                        <div className={`typeItem`} value={type} key={index} onClick={()=>handleClick(type)}>
                            <input id = {`check${type}`}
                                className = 'typeCheck'
                                value = {type}
                                type='checkbox'
                                checked = {selectedTypes.includes(type)}
                                readOnly={true}
                                disabled = {selectedTypes.length===limit && (!selectedTypes.includes(type))}
                                />
                            <Type key={index} name={type}/>
                        </div>
                    )}
                </div>
                <button className='typeOK' onClick={()=>clickMenu()}>OK</button>
            </div>}
        </div>
        )
}