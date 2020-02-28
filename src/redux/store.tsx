import { combineReducers, createStore } from 'redux'

function sessionData(state = [], action: any){
    switch(action.type){
        case 'CHANGE_SESSION_ID':
            return [
                ...state,
                {
                sessionID: action.id
                }
            ]
    }
}

const rootReducer = combineReducers({});
const store = createStore(rootReducer);

export default store;