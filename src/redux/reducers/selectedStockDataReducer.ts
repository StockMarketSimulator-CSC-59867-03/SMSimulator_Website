function selectedStockData(state = {}, action: any){
    switch(action.type){
        case 'MODIFY_STOCK_DATA':
            return {
                ...state,
                hasData: true,
                ...action.payload
                
            }
        default:
            return {...state, hasData:false};
    }
}

export default selectedStockData;