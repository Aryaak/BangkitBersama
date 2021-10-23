const initialState = {
    loading: true,
    help: {
        id: '',
        category: {
            name: ''
        },
        user: {
            photo: ''
        },
        end_date: '',
        reviews: []
    }
}


const HelpDetail = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HELP_DETAIL_LOADING':
            return {
                ...state,
                loading: action.value
            }
        case 'SET_HELP_DETAIL':
            return {
                ...state,
                help: action.value
            }
        case 'RESET_HELP_DETAIL':
            return {
                ...state,
                help: {
                    ...state.help,
                    id: '',
                    category: {
                        name: ''
                    },
                    user: {
                        photo: ''
                    },
                    end_date: ''
                }
            }
    }
    return state
}

export default HelpDetail;