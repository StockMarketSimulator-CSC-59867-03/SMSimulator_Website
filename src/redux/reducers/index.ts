import { combineReducers } from 'redux'
import sessionData from './sessionDataReducers';
import selectedStockData from './selectedStockDataReducer';
import stockData from './stockDataReducer';
import searchInput from './searchInputReducers';
import notifications from './notificationReducer';
import currentUserData from './userReducer';
import userStocks from './userStockDataReducers';
import transactionData from './transactionDataReducer';
import queuedEvents from './queuedEventReducer';

const rootReducer = combineReducers({
    sessionData: sessionData,
    selectedStockData: selectedStockData,
    stockData: stockData,
    searchInput: searchInput,
    notifications: notifications,
    currentUserData: currentUserData,
    userStocks: userStocks,
    transactionData: transactionData,
    queuedEvents: queuedEvents,
});

export default rootReducer;