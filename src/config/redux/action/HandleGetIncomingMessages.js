import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleGetIncomingMessages = (token) => async dispatch => {
    await Axios.get(BASE_API_URL + `message/incoming`, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                dispatch({ type: 'SET_INCOMING_MESSAGES', value: data })
            }
        })
        .catch(err => console.log('INCOMING MESSAGE GET ', err))
}

export default HandleGetIncomingMessages