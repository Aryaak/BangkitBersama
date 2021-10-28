import Axios from 'axios'
import { BASE_API_URL } from '../..'
import { Async } from '../../../utils'

const HandleGetProfile = (token) => async dispatch => {

    await Axios.get(BASE_API_URL + 'profile', {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                Async.set('user', data)
                dispatch({ type: 'SET_STATUS', value: data.user_status_id })
            }
        })
        .catch(err => console.log('GET PROFILE ', err))

}

export default HandleGetProfile