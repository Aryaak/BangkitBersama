import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { H4, ProfilePicture, Small, P, InputText, PrimaryButton, OutlineButton } from '../../../components'
import { Colors, Async } from '../../../utils'
import VerifiedIcon from '../../../assets/icon/verified.svg'
import UserIcon from '../../../assets/icon/user.svg'
import EditIcon from '../../../assets/icon/edit.svg'
import CrossIcon from '../../../assets/icon/cross-2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { HandleHelpSendReview, HandleUpdateHelpReview, HandleDeleteHelpReview, SetHelpDetail } from '../../../config/redux/action'
import moment from "moment";
import Modal from 'react-native-modal'

const HelpDetailContent = () => {

    const [token, setToken] = useState('')
    const [editReview, setEditReview] = useState(false)
    const HelpDetailReducer = useSelector(state => state.HelpDetail)
    const HelpSendReviewReducer = useSelector(state => state.HelpSendReview)
    const dispatch = useDispatch();

    const changeInputValue = (input, value) => {
        dispatch({ type: 'SET_HELP_REVIEW_FORM', input, value })
    }

    useEffect(() => {
        Async.get('token')
            .then(res => {
                setToken(res)
            })
    }, [])

    const submitHelpSendReview = () => {
        for (let item in HelpSendReviewReducer.form) {
            if (!HelpSendReviewReducer.form[item]) {
                return;
            }
        }
        dispatch(HandleHelpSendReview(HelpSendReviewReducer.form, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
    }

    const submitUpdateHelpReview = () => {

        const data = {
            id: HelpSendReviewReducer.id,
            review: HelpSendReviewReducer.form.review
        }

        for (let item in data) {
            if (!data[item]) {
                return;
            }
        }
        setEditReview(false)
        dispatch(HandleUpdateHelpReview(data, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
    }

    const submitDeleteReview = () => {
        const data = {
            id: HelpSendReviewReducer.id,
        }

        for (let item in data) {
            if (!data[item]) {
                return;
            }
        }
        dispatch(HandleDeleteHelpReview(data, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
    }

    const renderInputReview = () => {
        if (HelpDetailReducer.help['my-review']) {
            return (
                <View style={{
                    position: 'relative',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    padding: 16,
                    marginBottom: 16
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center', marginBottom: 20
                        }}>
                            <ProfilePicture img={HelpDetailReducer.help['my-review'].user.photo} />
                            <View style={{ marginLeft: 16 }}>
                                <Small title={HelpDetailReducer.help['my-review'].user.name} style={{ marginBottom: 8 }} />
                                <Small title={moment(HelpDetailReducer.help['my-review'].created_at).fromNow()} color={Colors.grey} />
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => {
                                changeInputValue('review', HelpDetailReducer.help['my-review'].review)
                                setEditReview(editReview ? false : true)
                            }}>
                                <EditIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => dispatch({ type: 'SET_HELP_REVIEW_MODAL', value: true })} style={{ marginLeft: 20 }}>
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {!editReview &&
                        <P color={Colors.darkGrey} title={HelpDetailReducer.help['my-review'].review} />}


                    {editReview && <View View style={{ marginBottom: 16 }
                    }>
                        <InputText onSubmitEditing={() => {
                            submitUpdateHelpReview()
                        }} value={HelpSendReviewReducer.form.review} onChangeText={value => changeInputValue('review', value)} placeholder="Tulis sesuatu untuk bantuan ini..." />
                    </View >}
                </View>)
        } else {
            return (
                < View style={{ marginBottom: 16 }
                }>
                    <InputText onSubmitEditing={() => submitHelpSendReview()} value={HelpSendReviewReducer.form.review} onChangeText={value => changeInputValue('review', value)} placeholder="Tulis sesuatu untuk bantuan ini..." />
                </View >)
        }

    }


    return (
        <View>
            <Modal
                testID={'modal'}
                isVisible={HelpSendReviewReducer.showModal}
                style={styles.modal}
                animationOut="slideOutDown">

                <View style={styles.modalContent}>
                    <P title="Apakah anda yakin ingin menghapus ulasan berikut?" />
                    <View style={{ marginTop: 20 }}>
                        <PrimaryButton onPress={() => submitDeleteReview()} style={{ marginBottom: 10 }} title="Hapus" />
                        <OutlineButton onPress={() => dispatch({ type: 'SET_HELP_REVIEW_MODAL', value: false })} title="Batal" />
                    </View>
                </View>
            </Modal>
            <H4 style={{ marginBottom: 16 }} title="Inisiator" />
            <View style={{
                position: 'relative',
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 16,
                marginBottom: 40
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ProfilePicture img={HelpDetailReducer.help.user.photo} />
                        <View style={{ marginLeft: 16 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Small title={HelpDetailReducer.help.user.name} style={{ marginBottom: 8, marginRight: 9 }} />
                                <VerifiedIcon />
                            </View>
                            <Small title={HelpDetailReducer.help.user.profession} color={Colors.grey} />
                        </View>
                    </View>
                    <UserIcon />

                </View>
            </View>
            <H4 style={{ marginBottom: 16 }} title="Deskripsi" />
            <View>
                <View style={{
                    position: 'relative',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    padding: 16,
                    marginBottom: 40
                }}>
                    <P color={Colors.darkGrey} title={HelpDetailReducer.help.description} />
                </View>
            </View>
            <H4 style={{ marginBottom: 16 }} title="Mereka Yang Bangkit" />
            {renderInputReview()}
            {(HelpDetailReducer.help.reviews.length > 0) && HelpDetailReducer.help.reviews.map(item => {
                return (<View style={{
                    position: 'relative',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    padding: 16,
                    marginBottom: 16
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', marginBottom: 20
                    }}>
                        <ProfilePicture img={item.user.photo} />
                        <View style={{ marginLeft: 16 }}>
                            <Small title={item.user.name} style={{ marginBottom: 8 }} />
                            <Small title={moment(item.created_at).fromNow()} color={Colors.grey} />
                        </View>
                    </View>
                    <P color={Colors.darkGrey} title={item.review} />
                </View>)
            })}

        </View>
    )
}

export default HelpDetailContent

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        padding: 30,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    }
})
