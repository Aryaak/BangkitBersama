import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleAcceptedRequest = (data, token) => async dispatch => {
    console.log('data', data)
    console.log('token', token)
    await Axios.put(BASE_API_URL + 'help/accepted-request', data, {
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'SET_RESPONSE_HELP_REQUEST_MODAL', value: false, selected: null })
            }
        })
        .catch(err => console.log('HELP REQUEST ACCEPTED', err))
}

export default HandleAcceptedRequest