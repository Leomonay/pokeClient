const initialState = {
    currentPage: 1,
    pokedexPageSize: 12,
    totalPages:0,
    baseRef:{'National Pokedex':'api','Created in Lab':'server'},
    base:'api',
};

export default function dataReducer (state = initialState,action){
    switch (action.type){
        case 'SET_PAGE':
        return{
            ...state,
            currentPage: action.payload
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
        default: return state;
    }
}