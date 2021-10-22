import {createStore,combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import dataReducer from '../reducers/dataReducer';
import pokemonReducer from '../reducers/pokemonReducer';

const reducers = combineReducers({
    data:dataReducer,
    pokemon: pokemonReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store=createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk))
);
export default store