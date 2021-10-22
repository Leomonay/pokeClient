import appConfig from "../config"
const {host} = appConfig

export function getPokemonList(start, final, server){
    const range = start&&final? `?start=${start}&limit=${final}`:''
    const base = server==='server'? '&base=server' : ''
    return(async function(dispatch){
        return fetch(`${host}/pokemon${range}${base}`)
        .then(response=>response.json())
        .then(json=>{
            dispatch(
                {
                    type: 'POKEMON_LIST',
                    payload: json
                })
        })
    })
}
export function getTotalPokemon(){
    return(async function(dispatch){
        return fetch(`${host}/totalpokemon`)
        .then(response=>response.json())
        .then(json=>dispatch(
            {
                type: 'TOTAL_POKEMON',
                payload: json
            }
        ))
    })
}
export function setPokemonZoom(gif){
    return{
        type: 'SET_ZOOM',
        payload: gif
    }
}
export function searchPokemon(name){
    return( async function (dispatch){
        return fetch(`${host}/pokemon/byname?name=${name}`)
        .then(response=>response.json())
        .then(json=>dispatch(
            {
                type: 'SEARCH_POKEMON',
                payload: json
            }
        ))
        .catch(error=>{
            console.log(error)
            dispatch({
                type: 'SEARCH_POKEMON',
                payload: null
            })
        })
    })
}
export function setNewPokemon(total){
    return{
        type: 'SET_NEWPOKE',
        payload: total
    }
}
export function setNewPokemonType(types){
    return{
        type: 'SET_NEWPOKEMON_TYPE',
        payload: types
    }
}