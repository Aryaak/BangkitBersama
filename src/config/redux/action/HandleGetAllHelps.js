import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleGetAllHelps = (token) => async dispatch => {
    await Axios.get(BASE_API_URL + `help/get-all`, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta
            const data = res.data.data

            if (meta.code == 200) {
                dispatch({ type: 'SET_HELPS', value: data })
            }
        })
        .catch(err => console.log('GET ALL HELPS ', err))
}

export default HandleGetAllHelps