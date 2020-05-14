function portfolioData(state = {}, action: any){
    switch(action.type){
        case 'SET_USER_PORTFOLIO_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default portfolioData;