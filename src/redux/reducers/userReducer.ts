function currentUserData(state = {}, action: any){
    switch(action.type){
        case 'CHANGE_USER_ID':
            return {
                ...state,
                id: action.payload,
            }
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        default:
            return {
                ...state
            };
    }
}
export default currentUserData;