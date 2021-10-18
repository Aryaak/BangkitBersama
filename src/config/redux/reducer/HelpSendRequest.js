const initialState = {
    id: null,
    showModal: false,
    show: false,
    alertTex: '',
    setAlert: false,
    status: 0,
    form: {
        help_id: null,
        reason: null
    }
}


const HelpSendRequest = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_REQUEST_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.input]: action.value
                }
            }
        case 'SET_HELP_REQUEST_ID':
            return {
                ...state,
                id: action.value
            }
        case 'SET_HELP_REQUEST_MODAL':
            return {
                ...state,
                showModal: action.value
            }
        case 'SET_HELP_REQUEST_SHOW':
            return {
                ...state,
                show: action.value
            }
        case 'SET_ALERT_TEXT_HELP_REQUEST':
            return {
                ...state,
                alertText: action.value
            }
        case 'SET_ALERT_HELP_REQUEST':
            return {
                ...state,
                setAlert: action.value
            }

        case 'RESET_HELP_REQUEST_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    reason: ''
                }
            }
    }
    return state
}

export default HelpSendRequest;