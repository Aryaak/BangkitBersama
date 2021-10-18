import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const SetHelpDetail = (help_id, token) => async dispatch => {
    await Axios.get(BASE_API_URL + 'help/get-detail/' + help_id, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                dispatch({ type: 'SET_HELP_DETAIL', value: data })
                dispatch({ type: 'SET_HELP_REQUEST_FORM', input: 'help_id', value: data.id })
                dispatch({ type: 'SET_HELP_REVIEW_FORM', input: 'help_id', value: data.id })
                if (data['my-review']) {
                    dispatch({ type: 'SET_HELP_REVIEW_ID', value: data['my-review'].id })
                }
                if (data['my-request']) {
                    dispatch({ type: 'SET_HELP_REQUEST_ID', value: data['my-request'].id })
                }

            }
        })
        .catch(err => console.log('GET HELP DETAIL ', err))
}

export default SetHelpDetail