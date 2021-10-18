const initialState = {
    id: null,
    showModal: false,
    form: {
        help_id: null,
        review: null
    }
}


const HelpSendReview = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_REVIEW_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.input]: action.value
                }
            }

        case 'SET_HELP_REVIEW_MODAL':
            return {
                ...state,
                showModal: action.value
            }
        case 'SET_HELP_REVIEW_ID':
            return {
                ...state,
                id: action.value
            }
        case 'RESET_HELP_REVIEW_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    review: ''
                }
            }
    }
    return state
}

export default HelpSendReview;