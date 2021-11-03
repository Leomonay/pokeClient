const initialState = {
    currentPages: {api: 1, server:1},
    pokedexPageSize: 12,
    totalPages:0,
    baseRef:{'National Pokedex':'api','Created in Lab':'server'},
    base:'api',
    creationErrors:{},
    pokemonTypes:[],
    selectTypes:{filter:[], create:[]}
};

export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'SET_PAGE':
        return{
            ...state,
            currentPages: action.payload
        };
        case 'ACTIVE_SEARCH':
            return{
                ...state,
                activeSearch: action.payload
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
        case 'TOTAL_PAGES':
            return{
                ...state,
                totalPages: action.payload
            };
        case 'SET_ERRORS':
            return{
                ...state,
                creationErrors: action.payload
            };
        case 'GET_POKEMON_TYPES':
            return{
                ...state,
                pokemonTypes: action.payload
            };
        case 'FILTER_TYPES':
            console.log(action.payload)
            return{
                ...state,
                selectTypes: {...state.filterTypes,filter: action.payload}
            };
        default: return state;
    }
}