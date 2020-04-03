function sessionData(state = {}, action: any){
    switch(action.type){
        case 'CHANGE_SESSION_ID':
            return {
                ...state,
                
                id: action.payload
                
            }
        case 'CHANGE_SESSION_BALANCE':
            return {
                ...state,
                balance: action.payload
            }
        default:
            return {...state};
    }
}

export default sessionData;