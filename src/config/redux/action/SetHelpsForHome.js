import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const SetHelpsForHome = (token) => async dispatch => {
    dispatch({ type: 'SET_HELPS_FOR_HOME_LOADING', value: true })
    await Axios.get(BASE_API_URL + 'help/get-for-home', {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                dispatch({ type: 'SET_HELPS_FOR_HOME', value: data })
            }
        })
        .catch(err => console.log('GET HELPS FOR HOME', err))
    dispatch({ type: 'SET_HELPS_FOR_HOME_LOADING', value: false })

}

export default SetHelpsForHome