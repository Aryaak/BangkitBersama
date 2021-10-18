import Axios from 'axios'
import { BASE_API_URL } from '../..'

const HandleDeleteHelpRequest = (dataRequest, token) => async dispatch => {
    await Axios.delete(BASE_API_URL + 'help/delete-request', {
        headers: {
            Authorization: token
        },
        data: dataRequest
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'SET_HELP_REQUEST_MODAL', value: false })
            }
        })
        .catch(err => console.log('HELP DELETE REQUEST ', err))
}

export default HandleDeleteHelpRequest