function queuedEvents(state = [], action: any){
    switch(action.type){
        case 'ADD_TO_QUEUED_EVENTS':
            return [...state, action.payload]
        default:
            return state;
    }
}

export default queuedEvents;