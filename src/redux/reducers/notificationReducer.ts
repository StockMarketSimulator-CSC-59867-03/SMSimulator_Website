function notifications(state = [], action: any){
    switch(action.type){
        case 'ADD_NOTIFICATION':
            return [...state,action.payload]
        case 'REPLACE_NOTIFICATIONS':
            return action.payload
        default:
            return state;
    }
}

export default notifications;