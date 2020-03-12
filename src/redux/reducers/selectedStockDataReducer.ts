function selectedStockData(state = {}, action: any){
    switch(action.type){
        case 'MODIFY_STOCK_DATA':
            return {
                ...state,
                hasData: true,
                ...action.payload,
                history: action.payload.history,
                domain: action.payload.domain
                
            }
        default:
            return {...state, hasData:false};
    }
}

export default selectedStockData;