const initialState = {
    messages: []
}


const Message = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.value
            }
    }
    return state
}

export default Message;