const initialState = {
    help: {}
}


const HelpDetail = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_DETAIL':
            return {
                ...state,
                help: action.value
            }
    }
    return state
}

export default HelpDetail;