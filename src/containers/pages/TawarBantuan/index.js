import React, { useEffect, useState } from 'react'
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { P, PrimaryButton, H4, OutlineButton, Small, AlertWarning, TextBoxWarning } from '../../../components'
import { Colors, Async, CountDiffDate } from '../../../utils'
import ArrowLeftIcon from '../../../assets/icon/arrow-left.svg'
import FeatureOne from '../../../assets/illustrations/saly.svg'

import CovidIcon from '../../../assets/icon/covid.svg'
import EkonomiIcon from '../../../assets/icon/ekonomi.svg'
import PanganIcon from '../../../assets/icon/pangan.svg'
import JasaIcon from '../../../assets/icon/jasa.svg'
import { useDispatch, useSelector } from 'react-redux'
import { SetMyHelps } from '../../../config/redux/action'

const TawarBantuan = ({ navigation }) => {
    const AuthReducer = useSelector(state => state.Auth)
    const MyHelpReducer = useSelector(state => state.MyHelp)
    const dispatch = useDispatch()

    const [category, setCategory] = useState(1)

    useEffect(() => {
        dispatch({ type: 'RESET_HELP_INPUT_STEP', value: 1 })
        dispatch({ type: 'RESET_HELP_EDIT_STEP', value: 1 })
        Async.get('token')
            .then(res => {
                dispatch(SetMyHelps(res))
            })
    }, [])

    const renderPendingButton = () => {
        if (category == 1) {
            return <PrimaryButton style={{ fontSize: 12, width: 100, marginHorizontal: 5 }} title="Tertunda" />
        } else {
            return <OutlineButton onPress={() => setCategory(1)} style={{ fontSize: 12, width: 100, marginHorizontal: 5 }} title="Tertunda" />
        }
    }


    const renderStartButton = () => {
        if (category == 2) {
            return <PrimaryButton style={{ fontSize: 10, width: 120, marginHorizontal: 5 }} title="Berlangsung" />

        } else {
            return <OutlineButton onPress={() => { setCategory(2) }} style={{ fontSize: 10, width: 120, marginHorizontal: 5, paddingHorizontal:10 }} title="Berlangsung" />
        }
    }


    const renderEndedButton = () => {
        if (category == 4) {
            return <PrimaryButton style={{ fontSize: 12, width: 85, marginHorizontal: 5 }} title="Berakhir" />

        } else {
            return <OutlineButton onPress={() => setCategory(4)} style={{ fontSize: 12, width: 85, marginHorizontal: 5 }} title="Berakhir" />
        }
    }


    const renderRejectButton = () => {
        if (category == 3) {
            return <PrimaryButton style={{ fontSize: 12, width: 85, marginHorizontal: 5 }} title="Ditolak" />

        } else {
            return <OutlineButton onPress={() => setCategory(3)} style={{ fontSize: 12, width: 85, marginHorizontal: 5 }} title="Ditolak" />

        }
    }

    const renderCategoryIcon = (category) => {
        switch (category) {
            case 1:
                return <CovidIcon />
            case 2:
                return <EkonomiIcon />
            case 3:
                return <PanganIcon />
            case 4:
                return <JasaIcon />

        }
    }

    const renderContent = (status, navigation) => {
        if (status == 3) {
            return (
                <>
                    <PrimaryButton onPress={() => navigation.navigate('HelpInput')} title="Tawarkan Sekarang" style={{ paddingVertical: 15 }} />
                    <H4 title="Bantuan Kamu" style={{ marginTop: 40 }} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
                        marginTop: 16
                    }}>
                        {renderPendingButton()}
                        {renderStartButton()}
                        {renderEndedButton()}
                        {renderRejectButton()}
                    </ScrollView>

                    {MyHelpReducer.helps.map(item => {
                        if (item.help_status_id == category) {
                            return (<TouchableOpacity onPress={() => navigation.navigate('HelpDetail', { help_id: item.id })} style={styles.card}>
                                {renderCategoryIcon(item.help_category_id)}
                                <View style={{ marginLeft: 16, width: 200 }}>
                                    <P title={item.name.toUpperCase()} />
                                    <Small color={Colors.grey} title={CountDiffDate(item.end_date)} style={{ marginTop: 8 }} />
                                </View>
                            </TouchableOpacity>)
                        }
                    })}



                </>
            )
        } else {
            return (
                <>
                    <AlertWarning text="Anda belum terverifikasi" style={{ marginBottom: 20 }} />
                    <TextBoxWarning text="Lakukan verifikasi pada menu edit profile, dengan menyertakan dokumen verifikasi seperti KTP/PASPOR/SIM." /></>
            )
        }
    }


    return (
        <ScrollView style={{ backgroundColor: Colors.overlay }}>
            <View style={{ margin: 30, backgroundColor: Colors.overlay, paddingBottom: 56 }}>
                <TouchableOpacity onPress={() => navigation.navigate('MainPages')}>
                    <ArrowLeftIcon />
                </TouchableOpacity>
                <FeatureOne style={{ alignSelf: 'center', marginTop: 40 }} />
                <P title="Tawarkan Bantuanmu dan Jadilah Inisiator Kebangkitan Bangsa!" style={{ alignSelf: 'center', textAlign: 'center', marginTop: 16, marginBottom: 24 }} />
                {renderContent(AuthReducer.status, navigation)}
            </View>

        </ScrollView >

    )
}

export default TawarBantuan

const styles = StyleSheet.create({
    card: {
        marginTop: 24,
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 87,
        alignItems: 'center',
        paddingLeft: 16,
        borderRadius: 15
    }


})