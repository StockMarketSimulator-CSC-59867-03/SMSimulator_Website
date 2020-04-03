function userStocks(state = {}, action: any){
    switch(action.type){
        case 'SET_USER_STOCK_DATA':
            return {
                ...action.payload
            }
        case 'CLEAR_USER_STOCK_DATA':
            return {
            }
        default:
            return {...state};
    }
}

export default userStocks;