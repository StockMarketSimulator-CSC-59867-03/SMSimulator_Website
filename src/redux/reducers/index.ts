import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import sessionData from './sessionDataReducers';
import selectedStockData from './selectedStockDataReducer';
import stockData from './stockDataReducer';
import searchInput from './searchInputReducers';
import notifications from './notificationReducer';
import currentUserData from './userReducer';
import userStocks from './userStockDataReducers';
import transactionData from './transactionDataReducer';

const rootReducer = combineReducers({
    sessionData: sessionData,
    selectedStockData: selectedStockData,
    stockData: stockData,
    searchInput: searchInput,
    notifications: notifications,
    currentUserData: currentUserData,
    userStocks: userStocks,
    transactionData: transactionData
});

export default rootReducer;