import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleSendMessage = async (data, token) => {
    await Axios.post(BASE_API_URL + 'message/send', data, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {

        })
        .catch(err => console.log('MESSAGE SEND ', err))
}

export default HandleSendMessage