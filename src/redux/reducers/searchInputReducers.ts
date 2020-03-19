function searchInput(state = {}, action: any){
    switch(action.type){
        case 'UPDATE_SEARCH_INPUT_VALUE':
            return {
				searchInput: action.payload                
            }
        default:
            return {searchInput:""};
    }
}

export default searchInput;