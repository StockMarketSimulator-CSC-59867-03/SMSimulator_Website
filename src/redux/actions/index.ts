import { StockDataModel } from "../../DataModels/stockData.model";
import { Notification } from "../../DataModels/notification";

export const changeSessionID = (id: string) => ({
    type: "CHANGE_SESSION_ID",
    payload: id
});

export const setSelectedStockData = (data: StockDataModel) => ({
    type: "MODIFY_STOCK_DATA",
    payload: data
});

export const setStockData = (data: any) => ({
    type: "SET_STOCK_DATA",
    payload: data
});

export const updateSearchInputValue = (inputValue: string) => {
	return {
		type: "UPDATE_SEARCH_INPUT_VALUE",
		payload: inputValue
	}
}

export const addNotification = (data: Notification) => ({
    type: "ADD_NOTIFICATION",
    payload: data
});

export const replaceNotifications = (data: any) => ({
    type: "REPLACE_NOTIFICATIONS",
    payload: data
});