function transactionData(state = [], action: any){
    switch(action.type){
        case 'SET_TRANSACTION_DATA':
            return [...action.payload]       
        case 'CLEAR_TRANSACTION_DATA':
            return [];
        default:
            return state;
    }
}

export default transactionData;