import { useEffect, useState } from "react"
import appConfig from "../../config"
import Type from "./Types"
import './TypeSelect.css'
const host = appConfig.host

export default function TypeSelect(props){
    const [selectedTypes, setSelectedTypes] = useState([])
    // const [parentFunction, setParentFunction] = useState(props.parentFunction)
    const [typesDisplay, setTypesDisplay]=useState('none')
    const [types, setTypes] = useState([]);
    const [limit, setLimit] = useState(parseInt(props.limit)||types.length)
    const closeItems = document.getElementsByClassName('main-content')[0]

    const {parentFunction}=props
    useEffect(()=>{
        parentFunction(selectedTypes)
    },[selectedTypes, parentFunction])

    function getTypes(){
        try{
            fetch(`${host}/types`)
            .then(resp=>resp.json())
            .then(resp=>setTypes(resp.sort()))
        }catch(e){
            console.error(e.message)
        }
    }

    useEffect(() =>getTypes(), [])

    useEffect(()=>{
        if(!limit)setLimit(types.length)
    },[types,limit])

    function closeMenuClickingOutside(e){
        if(e.target.className.slice(0,4)==='type')return
        setTypesDisplay('none')
        closeItems.onclick=""
    }

    function handleMenuClick(e){
        // e.preventDefault()
        if(typesDisplay==='none'){
            setTypesDisplay('flex')
            closeItems.onclick=(e)=>closeMenuClickingOutside(e)
        }else{
            setTypesDisplay('none')
            closeItems.onclick=""
        }
    }

    function handleTypeClick(e){
        let type = e.target.innerText ? e.target.innerText.toLowerCase() : e.target.id
        let check = document.getElementById(type)
        
        if(selectedTypes.length<limit && !selectedTypes.includes(type) ){
            setSelectedTypes([...selectedTypes,type])
            check.checked=true
        }else if(selectedTypes.includes(type)){
            setSelectedTypes(selectedTypes.filter(element=>element!==type))
            check.checked=false
        }
    }    

    return(
        <div className='typeSelectBackground'>
                <div className='typeSelect' onClick={(e)=>handleMenuClick(e)}>Types &#9660;</div>
                <div className='selectedTypesList'>
                    {selectedTypes.map(e=><Type key={e} name={e} typeStyles={props.typeStyles}/>)}
                </div>
                <div className='typeMenu' style={{display:typesDisplay}}>
                    <div className='typeList'>
                        {types.map((e,index)=>
                        <div className='typeItem' name={e} key={e}
                            onClick={(e)=>handleTypeClick(e)}
                            >
                            <input
                                id = {e}
                                className = 'typeCheck'
                                type='checkbox'
                                disabled={selectedTypes.length===limit && (!selectedTypes.includes(e))}
                                />
                            <Type key={index} name={e}/>
                        </div>)}
                    </div>
                    <button className='typeOK' onClick={(e)=>handleMenuClick(e)}>OK</button>
                </div>
        </div>
    )
}