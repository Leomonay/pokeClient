export function setPokedexPage(page){
    return{
        type: 'SET_PAGE',
        payload: page 
    }
}
export function setPokedexPageSize(size){
    return{
        type: 'PAGE_SIZE',
        payload: size 
    }
}
export function totalPokedexPages(totalPokes, pageSize){
    return{
        type: 'TOTAL_PAGES',
        payload: parseInt(totalPokes/pageSize) + ( totalPokes%pageSize === 0 ? 0 : 1 )
    }
}
export function setBase(base){
    return{
        type: 'SET_BASE',
        payload: base
    }
}