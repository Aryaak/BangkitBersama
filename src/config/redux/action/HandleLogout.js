import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleLogout = async (token) => {

    await Axios.put(BASE_API_URL + 'logout', {}, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
        })
        .catch(err => console.log('LOGOUT ', err))

}

export default HandleLogout