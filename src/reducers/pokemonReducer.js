const initialState={
    pokemonList:[],
    totalPokemon:{},
    pokemonShown: '',
    pokemonResult:null,
    newPokemon:{}
}

export default function pokemonReducer (state = initialState,action){
    switch (action.type){
        case 'POKEMON_LIST':
            return{
                ...state,
                pokemonList: action.payload
            };
        case 'TOTAL_POKEMON':
            return{
                ...state,
                totalPokemon: action.payload
            };
        case 'SEARCH_POKEMON':
            return{
                ...state,
                pokemonResult: action.payload
            };            
        case 'SET_ZOOM':
            return{
                ...state,
                pokemonShown: action.payload
            };
        case 'SET_NEWPOKE':
            return{
                ...state,
                newPokemon: action.payload
            };
        case 'SET_NEWPOKEMON_TYPE':
            return{
                ...state,
                newPokemon: {...state.newPokemon, types:action.payload}
            };
        default: return state;
    }
}