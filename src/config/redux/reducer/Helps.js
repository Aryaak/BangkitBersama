const initialState = {
    helps: []
}


const Helps = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELPS':
            return {
                ...state,
                helps: action.value
            }
    }
    return state
}

export default Helps;