const initialState = {
    selected: null,
    showModal: false,
    request: {

    }
}


const HelpResponseRequest = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RESPONSE_HELP_REQUEST_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.input]: action.value
                }
            }
        case 'SET_RESPONSE_HELP_REQUEST_MODAL':
            return {
                ...state,
                showModal: action.value,
                selected: action.selected
            }
    }
    return state
}

export default HelpResponseRequest;