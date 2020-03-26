function stockData(state = {}, action: any){
    switch(action.type){
        case 'SET_STOCK_DATA':
            return {
                ...state,
                
                ...action.payload
                
            }
        case 'CLEAR_STOCK_DATA':
            return {
            }
        default:
            return {...state};
    }
}

export default stockData;