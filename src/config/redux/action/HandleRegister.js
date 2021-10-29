import Axios from 'axios'
import { BASE_API_URL } from '../../../config'
import { Async } from '../../../utils'
import { StackActions } from '@react-navigation/native'

const HandleRegister = (dataForm, device_token, navigation) => async dispatch => {
    dispatch({ type: 'SET_LOADING', isLoading: true })
    dataForm.device_token = device_token
    console.log('FORM', dataForm)
    await Axios.post(BASE_API_URL + 'register', dataForm)
        .then(res => {
            const meta = res.data.meta;
            const data = res.data.data;
            if (meta.code == 200) {
                Async.set('user', data);
                Async.set('token', 'Bearer ' + data.token);
                Async.set('isLogged', 'true');
                dispatch({ type: 'RESET_REGISTER_FORM' })

                navigation.dispatch(StackActions.replace('MainPages'))
            } else if (meta.code == 409) {
                dispatch({ type: 'SET_ALERT_TEXT_REGISTER', value: 'Email/Username telah digunakan' })
                dispatch({ type: 'SET_ALERT_REGISTER', value: true })
            }
        })
        .catch(err => console.log('REGISTER ', err))

    dispatch({ type: 'SET_LOADING', isLoading: false })

}

export default HandleRegister