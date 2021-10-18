import Axios from 'axios'
import { BASE_API_URL } from '../..'
import { Async } from '../../../utils'

const HandleUpdateHelpReview = (data, token) => async dispatch => {
    await Axios.put(BASE_API_URL + 'help/update-review', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {

        })
        .catch(err => console.log('HELP UPDATE REVIEW ', err))
}

export default HandleUpdateHelpReview