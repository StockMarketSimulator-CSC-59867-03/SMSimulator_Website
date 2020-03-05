import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import sessionData from './sessionDataReducers';



const rootReducer = combineReducers({
    sessionData: sessionData
});

export default rootReducer;