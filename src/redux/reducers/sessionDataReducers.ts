function sessionData(state = {}, action: any){
    switch(action.type){
        case 'CHANGE_SESSION_ID':
            return {
                ...state,
                
                id: action.payload
                
            }
        default:
            return {...state, id:""};
    }
}

export default sessionData;