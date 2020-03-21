function currentUserData(state = {}, action: any){
    switch(action.type){
        case 'CHANGE_USER_ID':
            return {
                ...state,
                id: action.payload,
            }
        default:
            return {
                ...state
            };
    }
}
export default currentUserData;