import Axios from 'axios'
import { BASE_API_URL } from '../..'
import { Async } from '../../../utils'

const HandleUpdateHelpRequest = (data, token) => async dispatch => {
    await Axios.put(BASE_API_URL + 'help/update-request', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {

        })
        .catch(err => console.log('HELP Update REQUEST ', err))
}

export default HandleUpdateHelpRequest