import Axios from 'axios'
import { BASE_API_URL } from '../../../config'

const HandleHelpEdit = (data, token) => async dispatch => {
    dispatch({ type: 'SET_LOADING', isLoading: true, text: 'Memperbarui bantuan...' })

    if (data.newPhoto) {
        let formData = new FormData();
        formData.append('file', data.newPhoto);

        await Axios
            .post(BASE_API_URL + 'iofile/upload-photo-help', formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(async res => {
                console.log('HELP PHOTO: ', res)
                data.form.photo = res.data.data.file
            })
            .catch(err => {
                console.log('UPLOAD PHOTO HELP EDIT', err)
                delete data.form.photo
            });
    } else {
        delete data.form.photo
    }



    await Axios.put(BASE_API_URL + 'help/update', data.form, {
        headers: {
            Authorization: token
        },
    })
        .then(res => {
            const meta = res.data.meta;
            if (meta.code == 200) {
                dispatch({ type: 'RESET_HELP_EDIT_FORM' })
                dispatch({ type: 'RESET_HELP_EDIT_STEP', value: 2 })
            }
        })
        .catch(err => console.log('HELP EDIT ', err))

    dispatch({ type: 'SET_LOADING', isLoading: false })

}

export default HandleHelpEdit