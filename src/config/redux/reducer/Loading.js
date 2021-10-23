const initialState = {
    isLoading: false,
    text: 'Tunggu Sebentar...'
}

const Loading = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
                text: action.text ? action.text : state.text
            }
    }

    return state
}

export default Loading