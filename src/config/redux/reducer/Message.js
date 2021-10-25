const initialState = {
    messages: [],
    incoming: []
}


const Message = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.value
            }
        case 'SET_INCOMING_MESSAGES':
            return {
                ...state,
                incoming: action.value
            }
    }
    return state
}

export default Message;