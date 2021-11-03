import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokedexPageSize, setBase, totalPokedexPages } from "../../actions/dataActions";
import { getPokemon, getTotalPokemon } from '../../actions/pokemonActions';
import TypeSelector from "../types/TypeSelector";
import PokeCard from "./PokeCard";
import PageButtons from "../navigation/pageButtons";
import loading from '../../../src/assets/imgs/rotatingPokeBall.gif'
import './PokeGrid.css'

export default function PokemonGrid (){
    const {pokedexPageSize, currentPages, baseRef, base, totalPages} = useSelector((state)=>state.data)
    const {pokemonList, totalPokemon} = useSelector(state=>state.pokemon)
    const [firstPokemon, setFirstPokemon]=useState('')
    const [filterTypes, setFilterTypes] = useState([])
    const [menuClass, setMenuClass] = useState('hidden')
    // const typeStyles = {width: '4rem',fontSize: '.8rem'}
    const [totalPokes, setTotalPokes]=useState(0)
    const [currentPage, setCurrentPage]=useState(currentPages[base])
    
    const dispatch = useDispatch()
    const step=6

    useEffect(()=>dispatch(getTotalPokemon()),[dispatch])
    useEffect(()=>console.log('filterTypes',filterTypes),[filterTypes])
    
    
    //pages
    function PageFilter(){
        function setPageSizeValue(value){
            const newValue = Math.max (1, parseInt (value))
            dispatch(setPokedexPageSize(newValue))
            dispatch(totalPokedexPages(totalPokes, newValue))
        }

        function setPageSize(e){
            const value=parseInt(e.target.value)
            let newSize = Math.max (step, pokedexPageSize+value)
            if(newSize%6!==0)newSize=parseInt(newSize/step)*6
            dispatch(setPokedexPageSize(newSize))
            dispatch(totalPokedexPages(totalPokes, newSize))
        }

        return(
            <div className='gridFilterSection'>
            <div className="subtitle">
                Pokemon by page: 
            <button className='sizeButton' value={-step} onClick={(e)=>setPageSize(e)}>&#9660;</button>
            <input
                className='itemsByPage'
                onChange={(e)=>setPageSizeValue(e.target.value)}
                value={pokedexPageSize}
                id='sizeInput'
                />
            <button className='sizeButton' value={+step} onClick={(e)=>setPageSize(e)}>&#9650;</button>
            page {currentPage} of {totalPages}
            </div>
    </div>
        )
    }

    //bases
    function BaseFilter(){
        function baseMenuClick(){
            setMenuClass(menuClass==='hidden'?'baseList':'hidden')
            document.getElementById('root').onClick = (menuClass==='hidden'?()=>baseMenuClick():'')
        }    

        function handleOptionClick(baseName){
            dispatch( setBase(baseRef[baseName]))
            baseMenuClick()
        }

        return(
                <div className='filterOption' onClick={baseMenuClick}>
                    {Object.keys(baseRef).find(name=>baseRef[name]===base)} &#9660;
                <div className={menuClass}>
                    {Object.keys(baseRef).map((baseName,index)=>
                        <div className='baseOption'
                            name={baseName}
                            key={index}
                            onClick={()=>handleOptionClick(baseName)}>
                            {baseName}
                        </div>                            
                    )}
                </div>
            </div>
        )
    }

    //Current Page, TotalPokes, 
    useEffect(()=>setCurrentPage(currentPages[base]),[currentPages,base])
    useEffect(()=>setTotalPokes(totalPokemon[base]),[base, totalPokemon])

    //pokemonList
    useEffect(()=>{
        if(!currentPage || !pokedexPageSize || !totalPokes)return
        const first = pokedexPageSize*(currentPage-1)+1 
        const last = Math.min( pokedexPageSize*currentPage , totalPokes)
        setFirstPokemon(first)
        dispatch(getPokemon(first, last, base))
    },[currentPage,pokedexPageSize,totalPokes, base, dispatch])


    useEffect(()=>dispatch(totalPokedexPages(totalPokes, pokedexPageSize)),
    [totalPokes, pokedexPageSize,dispatch])


    function Waiting(){
        return<div className='waitingBackground'>
            <img src={loading} alt='' className='waitingImg'/>
            Loading Results...
        </div>}

    function PokeList(){
        return(<div className='pokemonGrid'>
        {pokemonList[0]?
            pokemonList.map((pokemon,index)=>
                (filterTypes.length===0
                    ||filterTypes.includes(pokemon.types[0])
                    ||filterTypes.includes(pokemon.types[0]))&&
                    <PokeCard 
                        key={index}
                        id={( base==='server' ? 'A' : '' ) + (firstPokemon+index) }
                        pokemon={pokemon}/>)
            :<Waiting/>
        }
        </div>)
    }

    return(
        <div className='gridBackground'>
            <div className='gridFilters'>
                <div className='gridFilterSection'>
                    <div className="subtitle">Filters</div>
                    <BaseFilter/>
                    <TypeSelector select={(types)=>setFilterTypes(types)}/>
                </div>
                <PageFilter/>
            </div>

            <div className='gridDiv'>            
                <PokeList/>
            </div>
            <PageButtons/>
        </div>
    )
}