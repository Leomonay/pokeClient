import appConfig from "../config"
const {host} = appConfig

export function setcurrentPages(page){
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
export function setErrors(errors){
    return{
        type: 'SET_ERRORS',
        payload: errors
    }
}
export function getPokemonTypes(){
    return async function(dispatch){
        return fetch(`${host}/types`)
        .then(resp=>resp.json())
        .then(types=>dispatch(
            {
            type: 'GET_POKEMON_TYPES',
            payload: types
            }
        ))
    }
}

export function setFilterTypes(types){
    console.log('action types', types)
    return {
        type: 'FILTER_TYPES',
        payload: types
    }
}