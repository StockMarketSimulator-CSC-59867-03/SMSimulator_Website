function stockData(state = {}, action: any){
    switch(action.type){
        case 'SET_STOCK_DATA':
            return {
                ...state,
                
                ...action.payload
                
            }
        default:
            return {...state};
    }
}

export default stockData;