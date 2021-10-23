import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokedexPageSize, setBase, totalPokedexPages } from "../../actions/dataActions";
import { getPokemon, getTotalPokemon } from '../../actions/pokemonActions';
import TypeSelect from './TypeSelect'
import PokeCard from "./PokeCard";
import PageButtons from "../navigation/pageButtons";
import loading from '../../../src/assets/imgs/rotatingPokeBall.gif'
import './PokeGrid.css'

export default function PokemonGrid (){
    const {pokedexPageSize, currentPages, baseRef, base, totalPages} = useSelector((state)=>state.data)
    const {pokemonList, totalPokemon} = useSelector(state=>state.pokemon)
    const [filteredList, setFilteredList] = useState([])
    const [firstPokemon, setFirstPokemon]=useState([1,12])
    const dispatch = useDispatch()
    const [filterTypes, setFilterTypes] = useState([])
    const [showBases, setShowBases] = useState('none')
    const typeStyles = {width: '4rem',fontSize: '.8rem'}
    const [totalPokes, setTotalPokes]=useState(0)
    const [baseCaption, setBaseCaption]=useState('')
    const [currentPage, setCurrentPage]=useState(currentPages[base])

    function changePageSize(e){
        let newSize=0
        if(e.target.className==='sizeButton'){
            let step = 6*parseInt(e.target.id)
            newSize = Math.max(6, pokedexPageSize+step)
            document.getElementById('sizeInput').value=newSize
        }else{
            newSize=e.target.value? Math.max(1,parseInt(e.target.value)):1
        }
        dispatch(setPokedexPageSize(newSize))
    }

    function handleBaseClick(){
        if(showBases==='none'){
            setShowBases('flex')
            document.getElementById('root').onClick=()=>handleBaseClick()
        }else{
            setShowBases('none')
            document.getElementById('root').onClick=''
        }
    }
    
    function handleOptionClick(baseName){
        dispatch( setBase(baseRef[baseName]))
        handleBaseClick()
    }

    useEffect(()=>setCurrentPage(currentPages[base]),[currentPages,base])

    useEffect(()=>dispatch(getTotalPokemon()),[dispatch])

    useEffect(()=>{
        if(!currentPage || !pokedexPageSize || !totalPokes)return

        const first = currentPage===1 ? 1 : pokedexPageSize*(currentPage-1)+1 
        const last = currentPage===1 ? pokedexPageSize : Math.min(pokedexPageSize*currentPage,totalPokes)
        setFirstPokemon(first)
        dispatch(getPokemon(first, last, base))

    },[currentPage,pokedexPageSize,totalPokes, base, dispatch])

    useEffect(()=>{
        if(filterTypes.length===0){
            setFilteredList(pokemonList)
        }else{
            setFilteredList(pokemonList.filter(pokemon=>
                filterTypes.includes(pokemon.types[0]) || filterTypes.includes(pokemon.types[1])
                ))
        }
    },[filterTypes,pokemonList])

    useEffect(()=>setBaseCaption(Object.keys(baseRef).find(key=>baseRef[key]===base)),[base,baseRef])
    useEffect(()=>setTotalPokes(totalPokemon[base]),[base, totalPokemon])

    useEffect(()=>{
        document.getElementById('sizeInput').value=pokedexPageSize
    },[pokedexPageSize])

    useEffect(()=>dispatch(totalPokedexPages(totalPokes, pokedexPageSize)),
    [totalPokes, pokedexPageSize,dispatch])

    function PokeList(props){
        const {list} = props
        return list.map((pokemon,index)=>{
            const pokeId = ( base==='server' ? 'A' : '' ) + (firstPokemon+index)
            return<PokeCard key={index} id={pokeId} types={filterTypes} pokemon={pokemon}/>}
        )}

    function Waiting(){
        return<div className='waitingBackground'>
            <img src={loading} alt='' className='waitingImg'/>
            Loading Results...
        </div>}

    return(
        <div className='gridBackground'>
            <div className='gridFilters'>
                <div className='gridFilterSection'>
                    <div className="subtitle">Filters</div>
                    <div className='filterOption' onClick={handleBaseClick}>
                        {baseCaption} &#9660;
                        </div>
                        <div className='baseList' style={{display: showBases}}>
                            {Object.keys(baseRef).map((baseName,index)=>
                                 <div className='baseOption' name={baseName} key={index} onClick={()=>handleOptionClick(baseName)}>{baseName}</div>                            
                            )}
                        </div>
                    <div className='typesSelection'>
                        <TypeSelect parentFunction={setFilterTypes} typeStyles={typeStyles}/>
                    </div>
                </div>
                <div className='gridFilterSection'>
                        <div className="subtitle">
                            Pokemon by page: 
                        <button className='sizeButton' id='-1' onClick={e=>changePageSize(e)}>&#9660;</button>
                        <input
                            className='itemsByPage'
                            onChange={(e)=>changePageSize(e)}
                            id='sizeInput'
                            />
                        <button className='sizeButton' id='+1' onClick={e=>changePageSize(e)}>&#9650;</button>
                        page {currentPage} of {totalPages}
                        </div>
                </div>
            </div>

            <div className='gridDiv'>            
                <div className='pokemonGrid'>
                    {filteredList[0] ? <PokeList list={filteredList}/> : <Waiting/>}
                </div>
            </div>
            <PageButtons/>
        </div>
    )
}