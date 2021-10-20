import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokedexPageSize, setPokemonZoom, setPokedexPage, setBase, setTotal } from "../../actions/dataActions";
import appConfig from './../../config'
import TypeSelect from './TypeSelect'
import PokeCard from "./PokeCard";
import './PokeGrid.css'
const {host} = appConfig;

export default function PokemonGrid (){
    const {pokedexPageSize, pokedexPage, base, totalPokes} = useSelector((state)=>state.data)
    const dispatch = useDispatch()
    const [pageSize] = useState(12)
    const [idArray, setIdArray] = useState([])
    const [filterTypes, setFilterTypes] = useState([])
    const [showBases, setShowBases] = useState('none')
    const [totalPages, setTotalPages] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13])
    const [bases] = useState({
        'National Pokedex':'api',
        'Created in Lab':'created'
    })
    const typeStyles = {
        width: '4rem',
        fontSize: '.8rem'
    }
    const pages= (()=>{
        let array = [
            {caption:'<< First', toPage: 1, format:' edges'},
            {caption: '< Prev', toPage: pokedexPage-1, format:' consecutive'}]
        let indexes = [-10,-2,-1,0,1,2,10] 
        indexes.map(dif=>
            array.push({
                caption:pokedexPage+dif<1?'<':pokedexPage+dif>totalPages.length?'>':pokedexPage+dif,
                toPage:pokedexPage+dif,
                format: (pokedexPage+dif>totalPages.length||pokedexPage+dif<1)?' notPage':dif===0?' currentPage':' goToPage',
            })
        )
        array=[...array,
            {caption: 'Next >', toPage: pokedexPage+1, format:' consecutive'},
            {caption: 'Last >>', toPage: totalPages.length, format:' edges'}]
        return array
    })()

    useEffect(()=>{
        document.getElementById('sizeInput').value=pageSize
    },[pageSize])

    useEffect(()=>{
        async function getTotalPokes(){
            fetch(`${host}/totalpokemon`)
            .then(response=>response.json())
            .then(response=> dispatch( setTotal(response) ) )
        }
        getTotalPokes()
    },[dispatch, pageSize, pokedexPage, base])
    
    useEffect(() => {
        function getIdArray(){
            const firstPokemon=pokedexPageSize*(pokedexPage-1)+1
            let pokemonsToShow = []
            let db = bases[base]
            let limit=Math.min(firstPokemon+pokedexPageSize-1, totalPokes[db])
            if(limit>0){
                for (let i=firstPokemon; i<=limit;i++){
                    pokemonsToShow.push( (db==='created'?'A':'') +i)
                }
            }
            setIdArray(pokemonsToShow)
        }
        getIdArray()
    }, [pokedexPage, pokedexPageSize, base, bases, totalPokes])

    useEffect(() => {
        function getTotalPages(){
            let pages = totalPokes[bases[base]]/pokedexPageSize + (
                totalPokes%pokedexPage===0?0:1
            )
            let pagesArray=[]
            for (let i=1; i<=pages;i++){pagesArray.push(i)}
            setTotalPages(pagesArray)
            if(pokedexPage>pagesArray.length)dispatch(setPokedexPage(pagesArray.length))
        }
        getTotalPages()
    }, [pokedexPageSize, base, totalPokes, bases, pokedexPage, dispatch])

    function setPage(page){
        dispatch(setPokedexPage(parseInt(page)))
        dispatch(setPokemonZoom(''))
    }

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
    
    function handleOptionClick(option){
        dispatch(setBase(option))
        handleBaseClick()
    }

    return(
        <div className='gridBackground'>
            <div className='gridFilters'>
                <div className='gridFilterSection'>
                    <div className="subtitle">Filters</div>
                    <div className='filterOption' onClick={handleBaseClick}>{base} &#9660;</div>
                        <div className='baseList' style={{display: showBases}}>
                            <div className='baseOption' onClick={()=>handleOptionClick('National Pokedex')}>National Pokedex</div>
                            <div className='baseOption' onClick={()=>handleOptionClick('Created in Lab')}>Created in Lab</div>
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
                        page {pokedexPage} of {totalPages.length}
                        </div>
                </div>
            </div>

            <div className='gridDiv'>            
                <div className='pokemonGrid'>
                    {idArray.map(e=><PokeCard id={e} key={e} types={filterTypes}/>)}
                </div>
            </div>
            <div className='gridPages'>
                {pages.map((page,index)=>{
                    let goToPage = page.toPage
                    let caption = page.caption
                    let format = page.format
                    return<div className={'pageButton'+format}
                        key={index}
                        onClick={()=>(goToPage>=1 && goToPage<=totalPages.length && goToPage!==pokedexPage)&&setPage(goToPage)}
                        >{typeof caption == 'string' && caption.includes(' ')?
                            caption.split(' ').map((word,index)=><div key={index} className={word.length>2?'pageWord':''}>{word}</div>)
                        :caption}</div>
                })}
            </div>

        </div>
    )
}