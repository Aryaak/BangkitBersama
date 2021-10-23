import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { PrimaryButton, H3, Small, HelpEnded, P, AlertDanger, AlertWarning, H4, AlertSuccess } from '../../../components'
import { DetailHelpTabView } from '../../templates'
import { Colors, Async, CountDiffDate } from '../../../utils'
import ChatIcon from '../../../assets/icon/chat-2.svg'
import UsersIcon from '../../../assets/icon/users.svg'
import ClockIcon from '../../../assets/icon/clock.svg'
import { HelpDetailContent } from '../../organisms'
import ArrowLeftIcon from '../../../assets/icon/arrow-left-white.svg'
import CrossIcon from '../../../assets/icon/cross-2.svg'
import EditIcon from '../../../assets/icon/edit.svg'
import { useDispatch, useSelector } from 'react-redux'
import { SetHelpDetail } from '../../../config/redux/action'
import { HandleHelpSendRequest, HandleUpdateHelpRequest, HandleDeleteHelpRequest, HandleAcceptedRequest, SetHelpsForHome } from '../../../config/redux/action'
import Modal from "react-native-modal";
import OutlineButton from '../../../components/molecules/OutlineButton'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HelpDetail = ({ route, navigation }) => {

    const [user, setUser] = useState(null)
    const [editRequest, setEditRequest] = useState(false)
    const [token, setToken] = useState('')
    const HelpSendRequestReducer = useSelector(state => state.HelpSendRequest)
    const HelpResponseRequestReducer = useSelector(state => state.HelpResponseRequest)
    const dispatch = useDispatch();
    const HelpDetailReducer = useSelector(state => state.HelpDetail)

    const changeInputValue = (input, value) => {
        dispatch({ type: 'SET_HELP_REQUEST_FORM', input, value })
    }

    useEffect(() => {
        dispatch({ type: 'SET_HELP_DETAIL_LOADING', value: true })
        Async.get('token')
            .then(res => {
                setToken(res)
                dispatch(SetHelpDetail(route.params.help_id, res))
            })


        return () => {
            dispatch({ type: 'SET_HELP_REQUEST_SHOW', value: false })
            dispatch({ type: 'RESET_HELP_DETAIL' })
        }
    }, [])



    const submitHelpRequest = () => {
        dispatch({ type: 'SET_ALERT_HELP_INPUT', value: false })
        for (let item in HelpSendRequestReducer.form) {
            if (!HelpSendRequestReducer.form[item]) {
                dispatch({ type: 'SET_ALERT_TEXT_HELP_REQUEST', value: 'Isi alasan anda' })
                dispatch({ type: 'SET_ALERT_HELP_REQUEST', value: true })
                return;
            }
        }
        dispatch(HandleHelpSendRequest(HelpSendRequestReducer.form, token))
        dispatch(SetHelpDetail(route.params.help_id, token))
    }

    const submitUpdateHelpRequest = () => {

        const data = {
            id: HelpSendRequestReducer.id,
            reason: HelpSendRequestReducer.form.reason
        }

        for (let item in data) {
            if (!data[item]) {
                return;
            }
        }
        setEditRequest(false)
        dispatch(HandleUpdateHelpRequest(data, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
    }

    const submitDeleteRequest = () => {
        const data = {
            id: HelpSendRequestReducer.id,
        }

        for (let item in data) {
            if (!data[item]) {
                return;
            }
        }
        dispatch(HandleDeleteHelpRequest(data, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
    }


    const renderButton = () => {
        if (!HelpDetailReducer.help.isInisiator) {
            if (HelpDetailReducer.help['my-request']) {
                switch (HelpDetailReducer.help['my-request'].help_request_status_id) {
                    case 1:
                        return (<View>
                            <AlertWarning style={{ marginBottom: 40 }} text="Permintaan anda sedang diproses" />
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between'
                            }}>
                                <H4 style={{ marginBottom: 16 }} title="Alasan anda" />
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity onPress={() => {
                                        changeInputValue('reason', HelpDetailReducer.help['my-request'].reason)
                                        setEditRequest(editRequest ? false : true)
                                    }}>
                                        <EditIcon />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => dispatch({ type: 'SET_HELP_REQUEST_MODAL', value: true })} style={{ marginLeft: 20 }}>
                                        <CrossIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {!editRequest && <View>

                                <View>
                                    <View style={{
                                        position: 'relative',
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        padding: 16,
                                        marginBottom: 40
                                    }}>
                                        <P color={Colors.darkGrey} title={HelpDetailReducer.help['my-request'].reason} />
                                    </View>
                                </View>
                            </View>}
                            {editRequest && <View>
                                <TextInput value={HelpSendRequestReducer.form.reason} onChangeText={value => changeInputValue('reason', value)} multiline={true} numberOfLines={4} placeholder="Beri alasan anda untuk menerima bantuan ini" style={[styles.InputDesc, { marginBottom: 15 }]} />
                                <PrimaryButton onPress={() => {
                                    submitUpdateHelpRequest()
                                }} style={{ marginBottom: 40 }} title="Perbarui Permintaan" paddingVertical={15} />
                            </View>}
                        </View>)
                    case 2: return <AlertSuccess style={{ marginBottom: 40 }} text="Permintaan anda disetujui" />
                }
            } else {
                return (
                    <View>
                        {renderRequestForm()}
                        {!HelpSendRequestReducer.show && (<PrimaryButton onPress={() => dispatch({ type: 'SET_HELP_REQUEST_SHOW', value: true })} style={{ marginBottom: 40 }} title="Ajukan Permintaan" paddingVertical={15} />)}

                    </View>

                )
            }
        }

    }
    const renderChatButton = () => {
        if (!HelpDetailReducer.help.isInisiator) {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { user: HelpDetailReducer.help.user })}>
                    <ChatIcon width={30} height={30} />
                </TouchableOpacity>
            )
        }

    }

    const renderDetail = () => {
        if (!HelpDetailReducer.help.isInisiator) {
            return (
                <HelpDetailContent />
            )
        } else {
            return (
                <DetailHelpTabView />
            )
        }
    }
    const submitAccepted = () => {
        const data = {
            help_id: HelpDetailReducer.help.id,
            help_request_id: HelpResponseRequestReducer.selected
        }
        dispatch(HandleAcceptedRequest(data, token))
        dispatch(SetHelpDetail(HelpDetailReducer.help.id, token))
        dispatch(SetHelpsForHome(token))
    }

    const renderRequestForm = () => {
        if (HelpSendRequestReducer.show) {
            return (
                <View style={styles.requestForm}>
                    {/* input alasan */}
                    <AlertDanger text={HelpSendRequestReducer.alertText} set={HelpSendRequestReducer.setAlert} onPress={() => { dispatch({ type: 'SET_ALERT_HELP_REQUEST', value: false }) }} />

                    < View style={{ marginBottom: 25, marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <P title="Alasan anda" style={{ color: Colors.darkGrey }} />
                            <TouchableOpacity onPress={() => dispatch({ type: 'SET_HELP_REQUEST_SHOW', value: false })}>
                                <CrossIcon />
                            </TouchableOpacity>
                        </View>
                        <TextInput value={HelpSendRequestReducer.form.reason} onChangeText={value => changeInputValue('reason', value)} multiline={true} numberOfLines={4} placeholder="Beri alasan anda untuk menerima bantuan ini" style={styles.InputDesc} />
                    </View >
                    <PrimaryButton onPress={() => submitHelpRequest()} style={{ marginBottom: 40 }} title="Kirim Permintaan" paddingVertical={15} />
                </View>
            )
        }
    }

    if (HelpDetailReducer.loading) {
        return (<View>
            <TouchableOpacity style={{ position: 'absolute', top: 30, left: 30, zIndex: 50 }} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon />
            </TouchableOpacity>
            <ScrollView>

                <SkeletonPlaceholder >
                    <View style={styles.cover}>
                        <View style={styles.overlay}></View>
                        <View style={{ width: '100%', height: '100%', resizeMode: 'cover' }} ></View>
                    </View>

                    <View style={{ paddingHorizontal: 30 }}>
                        <View style={{ width: 75, height: 35, marginTop: 30, borderRadius: 8 }}>
                        </View>

                        <View style={{ height: 75, width: 272, borderRadius: 8, marginTop: 24 }}>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <View style={{ width: 24, height: 24, borderRadius: 12 }}></View>
                                <View style={{ width: 41, height: 15, borderRadius: 8, marginLeft: 16 }}></View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ width: 24, height: 24, borderRadius: 12 }}></View>
                                <View style={{ width: 41, height: 15, borderRadius: 8, marginLeft: 16 }}></View>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: 59, borderRadius: 8, marginVertical: 40 }}></View>

                        <View style={{ width: 77, height: 29, borderRadius: 8 }}></View>
                        <View style={{ width: '100%', height: 87, borderRadius: 8, marginTop: 16 }}></View>

                        <View style={{ width: 77, height: 29, borderRadius: 8, marginTop: 40 }}></View>
                        <View style={{ width: '100%', height: 172, borderRadius: 8, marginTop: 16 }}></View>

                        <View style={{ width: 77, height: 29, borderRadius: 8, marginTop: 40 }}></View>
                        <View style={{ width: '100%', height: 87, borderRadius: 8, marginTop: 16, marginBottom: 70 }}></View>
                    </View>
                </SkeletonPlaceholder>
            </ScrollView>


        </View>)
    } else {
        return (<ScrollView style={styles.wrapper} backdropColor="white">
            <Modal
                testID={'modal'}
                isVisible={HelpResponseRequestReducer.showModal}
                style={styles.modal}
                animationOut="slideOutDown">

                <View style={styles.modalContent}>
                    <P title="Apakah anda yakin ingin menyetujui permintaan pengguna berikut?" />
                    <View style={{ marginTop: 20 }}>
                        <PrimaryButton onPress={() => submitAccepted()} style={{ marginBottom: 10 }} title="Setujui" />
                        <OutlineButton onPress={() => dispatch({ type: 'SET_RESPONSE_HELP_REQUEST_MODAL', value: false })} title="Batal" />
                    </View>
                </View>
            </Modal>
            <Modal
                testID={'modal'}
                isVisible={HelpSendRequestReducer.showModal}
                style={styles.modal}
                animationOut="slideOutDown">

                <View style={styles.modalContent}>
                    <P title="Apakah anda yakin ingin menghapus permintaan berikut?" />
                    <View style={{ marginTop: 20 }}>
                        <PrimaryButton onPress={() => submitDeleteRequest()} style={{ marginBottom: 10 }} title="Hapus" />
                        <OutlineButton onPress={() => dispatch({ type: 'SET_HELP_REQUEST_MODAL', value: false })} title="Batal" />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={{ position: 'absolute', top: 30, left: 30, zIndex: 50 }} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon />
            </TouchableOpacity>
            <View style={styles.cover}>
                <View style={styles.overlay}></View>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: HelpDetailReducer.help.photo }} />
            </View>

            <View style={styles.content}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <PrimaryButton style={{ width: 75, height: 35, marginBottom: 24 }} title={HelpDetailReducer.help.category.name} />
                    {renderChatButton()}
                </View>
                <H3 title={HelpDetailReducer.help.name} style={{ marginBottom: 16 }} />
                {HelpDetailReducer.help.help_status_id != 4 && <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <UsersIcon />
                        <Small style={{ marginLeft: 16 }} title={HelpDetailReducer.help.quota + " Orang"} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
                        <ClockIcon />
                        <Small style={{ marginLeft: 16 }} title={CountDiffDate(HelpDetailReducer.help.end_date)} />
                    </View>
                </View>}

                {HelpDetailReducer.help.help_status_id == 4 && <HelpEnded style={{ marginBottom: 40 }} />}

                {HelpDetailReducer.help.help_status_id != 4 && renderButton()}
                {renderDetail()}


            </View>
        </ScrollView >)
    }



}

export default HelpDetail

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
        height: '100%',
        backgroundColor: Colors.overlay
    },
    cover: {
        position: 'relative',
        width: '100%',
        height: 230,
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.2,
        zIndex: 40
    },
    content: {
        marginTop: -50,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.overlay,
        zIndex: 50
    },
    InputDesc: {
        color: Colors.primary,
        height: 151,
        backgroundColor: 'white',
        marginTop: 10,
        width: '100%',
        borderRadius: 15,
        paddingHorizontal: 20
    },
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
