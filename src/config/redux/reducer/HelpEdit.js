const initialState = {
    step: 1,
    alertTex: '',
    setAlert: false,
    newPhoto: '',
    form: {
        id: null,
        help_category_id: null,
        photo: '',
        name: '',
        description: '',
        quota: null,
        end_date: null
    }
}


const HelpEdit = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_EDIT_FORM':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.input]: action.value
                }
            }
        case 'SET_HELP_EDIT_NEW_PHOTO':
            return {
                ...state,
                newPhoto: action.value
            }
        case 'SET_ALERT_TEXT_HELP_EDIT':
            return {
                ...state,
                alertText: action.value
            }
        case 'SET_ALERT_HELP_EDIT':
            return {
                ...state,
                setAlert: action.value
            }

        case 'RESET_HELP_EDIT_STEP':
            return {
                ...state,
                step: action.value
            }

        case 'RESET_HELP_EDIT_FORM':
            return {
                ...state,
                newPhoto: '',
                form: {
                    ...state.form,
                    help_category_id: null,
                    photo: '',
                    name: '',
                    description: '',
                    quota: null,
                    end_date: null
                }
            }
    }
    return state
}

export default HelpEdit;