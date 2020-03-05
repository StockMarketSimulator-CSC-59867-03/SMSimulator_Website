import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';


function sessionData(state = {}, action: any){
    switch(action.type){
        case 'CHANGE_SESSION_ID':
            return {
                ...state,
                
                id: action.payload
                
            }
        default:
            return {...state, id: "hello"};
    }
}

const rootReducer = combineReducers({
    sessionData: sessionData
});

export default rootReducer;