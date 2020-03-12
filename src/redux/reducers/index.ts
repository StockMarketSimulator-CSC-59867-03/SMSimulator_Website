import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import sessionData from './sessionDataReducers';
import selectedStockData from './selectedStockDataReducer';



const rootReducer = combineReducers({
    sessionData: sessionData,
    selectedStockData: selectedStockData
});

export default rootReducer;