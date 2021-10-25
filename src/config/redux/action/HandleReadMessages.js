import Axios from 'axios'
import { BASE_API_URL } from '../..'

const HandleReadMessages = async (data, token) => {
    await Axios.put(BASE_API_URL + `message/read`, data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {

        })
        .catch(err => console.log('READ MESSAGE ', err))
}

export default HandleReadMessages