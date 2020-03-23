import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import sessionData from './sessionDataReducers';
import selectedStockData from './selectedStockDataReducer';
import stockData from './stockDataReducer';
import searchInput from './searchInputReducers';
import notifications from './notificationReducer';
import currentUserData from './userReducer';

const rootReducer = combineReducers({
    sessionData: sessionData,
    selectedStockData: selectedStockData,
    stockData: stockData,
    searchInput: searchInput,
    notifications: notifications,
    currentUserData: currentUserData
});

export default rootReducer;