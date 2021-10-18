import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleGetMessages = (data, token) => async dispatch => {
    await Axios.get(BASE_API_URL + `message/get/${data.sender}/${data.recipient}`, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                dispatch({ type: 'SET_MESSAGES', value: data })
            }
        })
        .catch(err => console.log('MESSAGE GET ', err))
}

export default HandleGetMessages