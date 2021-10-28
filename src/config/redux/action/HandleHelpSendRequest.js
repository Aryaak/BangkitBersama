import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleHelpSendRequest = (data, token) => async dispatch => {
    dispatch({ type: 'SET_LOADING', isLoading: true, text: 'Mengirim permintaan...' })
    await Axios.post(BASE_API_URL + 'help/send-request', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'RESET_HELP_REQUEST_FORM' })
                dispatch({ type: 'SET_HELP_REQUEST_SHOW', value: false })
            }
        })
        .catch(err => console.log('HELP SEND REQUEST ', err))
    dispatch({ type: 'SET_LOADING', isLoading: false })
}

export default HandleHelpSendRequest