function selectedStockData(state = {}, action: any){
    switch(action.type){
        case 'MODIFY_SELECTED_STOCK_DATA':
            return {
                ...state,
                hasData: true,
                ...action.payload,
                
                
            }
        case 'CLEAR_SELECTED_STOCK_DATA':
            return {
                ...state,
                hasData: null,
                symbol: null
            }
        default:
            return {...state};
    }
}

export default selectedStockData;