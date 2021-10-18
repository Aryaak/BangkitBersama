import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleHelpSendReview = (data, token) => async dispatch => {
    await Axios.post(BASE_API_URL + 'help/send-review', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'RESET_HELP_REVIEW_FORM' })
                dispatch({ type: 'SET_HELP_REVIEW_SHOW', value: false })
            }
        })
        .catch(err => console.log('HELP SEND REVIEW ', err))
}

export default HandleHelpSendReview