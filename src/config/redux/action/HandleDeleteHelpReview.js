import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleDeleteHelpReview = (dataReview, token) => async dispatch => {
    await Axios.delete(BASE_API_URL + 'help/delete-review', {
        headers: {
            Authorization: token
        },
        data: dataReview
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'SET_HELP_REVIEW_MODAL', value: false })
            }
        })
        .catch(err => console.log('HELP DELETE REVIEW ', err))
}

export default HandleDeleteHelpReview