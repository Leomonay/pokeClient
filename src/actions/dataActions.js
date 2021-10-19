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

export function searchPokemon(name){
    return{
        type: 'SEARCH_POKEMON',
        payload: name 
    }
}
export function setPokemonZoom(gif){
    return{
        type: 'SET_ZOOM',
        payload: gif
    }
}
export function setBase(base){
    return{
        type: 'SET_BASE',
        payload: base
    }
}
export function setTotal(total){
    return{
        type: 'SET_TOTAL',
        payload: total
    }
}