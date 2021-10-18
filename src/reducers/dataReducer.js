const initialState = {
    pokedexPage: 1,
    pokemonShown: '',
    pokedexPageSize: 12,
    pokemonResult: '',
    base:'National Pokedex',
    totalPokes:{'api':1500, 'created':500}
};

export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'SET_ZOOM':
        return{
            ...state,
            pokemonShown: action.payload
        };
        case 'SET_PAGE':
        return{
            ...state,
            pokedexPage: action.payload
        };
        case 'SEARCH_POKEMON':
        return{
            ...state,
            pokemonResult: action.payload
        };
        case 'PAGE_SIZE':
        return{
            ...state,
            pokedexPageSize: action.payload
        };
        case 'SET_BASE':
        return{
            ...state,
            base: action.payload
        };
        case 'SET_TOTAL':
            return{
                ...state,
                totalPokes: action.payload
            };
        default: return state;
    }
}