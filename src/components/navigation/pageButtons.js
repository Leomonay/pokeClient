import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "../../actions/dataActions" 
import { setPokemonZoom } from "../../actions/pokemonActions"

export default function PageButtons() {
    const {currentPage,totalPages} = useSelector(state=>state.data)
    const dispatch = useDispatch()

    const pages= (()=>{
        let array = [
            {caption:'<< First', toPage: 1, format:' edges'},
            {caption: '< Prev', toPage: currentPage-1, format:' consecutive'}]
        let indexes = [-10,-2,-1,0,1,2,10] 
        indexes.map(dif=>
            array.push({
                caption:currentPage+dif<1?'<':currentPage+dif>totalPages?'>':currentPage+dif,
                toPage:currentPage+dif,
                format: (currentPage+dif>totalPages||currentPage+dif<1)?' notPage':dif===0?' currentPage':' goToPage',
            })
        )
        array=[...array,
            {caption: 'Next >', toPage: currentPage+1, format:' consecutive'},
            {caption: 'Last >>', toPage: totalPages, format:' edges'}]
        return array
    })()

    function setPage(page){
        dispatch(setCurrentPage(parseInt(page)))
        dispatch(setPokemonZoom(''))
    }

    function PageButton(page,index){
        let goToPage = page.toPage
        let caption = page.caption
        let format = page.format
        return(
            <div className={'pageButton'+format}
            key={index}
            onClick={()=>(goToPage>=1 && goToPage<=totalPages && goToPage!==currentPage)&&setPage(goToPage)}
            >{typeof caption == 'string' && caption.includes(' ')?
                caption.split(' ').map((word,index)=><div key={index} className={word.length>2?'pageWord':''}>{word}</div>)
            :caption}</div>
        )
    }

    return (
        <div className='gridPages'>
            {pages.map(PageButton)}
        </div>
    )
} 