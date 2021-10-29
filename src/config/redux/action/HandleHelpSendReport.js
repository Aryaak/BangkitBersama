import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleHelpSendReport = (data, token) => async dispatch => {
    console.log(data)
    dispatch({ type: 'SET_LOADING', isLoading: true, text: 'Mengirim laporan...' })
    await Axios.post(BASE_API_URL + 'help/send-report', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {

        })
        .catch(err => console.log('HELP SEND REPORT ', err))
    dispatch({ type: 'SET_LOADING', isLoading: false })
}

export default HandleHelpSendReport