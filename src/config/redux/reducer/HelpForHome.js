const initialState = {
    loading: true,
    helps: []
}


const HelpForHome = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELPS_FOR_HOME_LOADING':
            return {
                ...state,
                loading: action.value
            }
        case 'SET_HELPS_FOR_HOME':
            return {
                ...state,
                helps: action.value
            }
    }
    return state
}

export default HelpForHome;