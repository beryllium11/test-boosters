import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { countriesReducer } from './country-reducer';
import { globalReducer } from './global-reducer';


const rootReducer = combineReducers({
    globalReducer: globalReducer,
    countriesReducer: countriesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
