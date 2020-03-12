import { StockDataModel } from "../../DataModels/stockData.model";

export const changeSessionID = (id: string) => ({
    type: "CHANGE_SESSION_ID",
    payload:id
});


export const setSelectedStockData = (data: StockDataModel) => ({
    type: "MODIFY_STOCK_DATA",
    payload: data
});