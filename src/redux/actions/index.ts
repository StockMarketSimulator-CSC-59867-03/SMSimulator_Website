import { StockDataModel } from "../../DataModels/stockData.model";
import { Notification } from "../../DataModels/notification";
import { Transaction } from "../../DataModels/transaction";
import { Event } from "../../DataModels/event";


export const setPortfolioData = (data: any) => ({
    type: "SET_USER_PORTFOLIO_DATA",
    payload: data
});

export const changeSessionID = (id: string) => ({
    type: "CHANGE_SESSION_ID",
    payload: id
});

export const changeSessionBalance = (balance: number) => ({
    type: "CHANGE_SESSION_BALANCE",
    payload: balance
});

export const setUserStockData = (data: any) => ({
    type: "SET_USER_STOCK_DATA",
    payload: data
});

export const clearUserStockData = () => ({
    type: "CLEAR_USER_STOCK_DATA",
    payload: {}
});

export const setSelectedStockData = (data: StockDataModel) => ({
    type: "MODIFY_SELECTED_STOCK_DATA",
    payload: data
});

export const clearSelectedStockData = () => ({
    type: "CLEAR_SELECTED_STOCK_DATA",
    payload: {}
});

export const setStockData = (data: any) => ({
    type: "SET_STOCK_DATA",
    payload: data
});

export const clearStockData = () => ({
    type: "CLEAR_STOCK_DATA",
    payload: {}
});

export const updateSearchInputValue = (inputValue: string) => {
	return {
		type: "UPDATE_SEARCH_INPUT_VALUE",
		payload: inputValue
	}
}
export const setTransactionData = (data: Transaction) => ({
    type: "SET_TRANSACTION_DATA",
    payload: data
});
export const addNotification = (data: Notification) => ({
    type: "ADD_NOTIFICATION",
    payload: data
});

export const replaceNotifications = (data: any) => ({
    type: "REPLACE_NOTIFICATIONS",
    payload: data
});

export const changeCurrentUserID = (id: any) => ({
    type: "CHANGE_USER_ID",
    payload: id
});

export const changeCurrentUsername = (username: any) => ({
    type: "CHANGE_USERNAME",
    payload: username
})

export const addToWatchList = (watchedStocks: any) => ({
    type: "ADD_TO_WATCHLIST",
    payload: watchedStocks
})

export const addToQueuedEvents = (data: Event) => ({
    type: "ADD_TO_QUEUED_EVENTS",
    payload: data
})

export const clearQueuedEvents = () => ({
    type: "CLEAR_QUEUED_EVENTS",
    payload: []
});