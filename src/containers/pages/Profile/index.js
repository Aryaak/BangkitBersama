import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors, Async } from '../../../utils'
import { StackActions } from '@react-navigation/native'
import { HeaderProfile, H3, OutlineButton, P, PrimaryButton } from '../../../components'
import { ProfileMenuList } from '../../organisms'
import Modal from "react-native-modal";
import LogOut from './../../../assets/icon/log-out.svg'

const Profile = ({ navigation }) => {
    const [willLogout, setWillLogout] = useState(false);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
            <Modal
                testID={'modal'}
                isVisible={willLogout}
                style={styles.modal}
                animationOut="slideOutDown">

                <View style={styles.modalContent}>
                    <P title="Apakah anda yakin ingin keluar?" />
                    <View style={{ marginTop: 20 }}>
                        <PrimaryButton onPress={() => {
                            navigation.dispatch(StackActions.replace('Auth'))
                            Async.remove('isLogged')
                        }} style={{ marginBottom: 10 }} title="Keluar" />
                        <OutlineButton onPress={() => setWillLogout(false)} title="Batal" />
                    </View>
                </View>
            </Modal>
            <HeaderProfile />
            <View style={styles.contentWrapper}>
                <H3 title="Pengaturan" style={{ marginBottom: 32 }} />
                <ProfileMenuList />
                <H3 title="Akun" style={{ marginBottom: 32 }} />
                <TouchableOpacity  onPress={() => {
                    setWillLogout(true)
                }}>
                    <View style={{flexDirection:'row'}}>
                        <LogOut/>
                        <P style={{color:'red', marginLeft:32}} title="Keluar"/>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        backgroundColor: Colors.primary
    },
    contentWrapper: {
        height: '80%',
        overflow: 'hidden',
        backgroundColor: Colors.overlay,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 40,
        paddingHorizontal: 30, 
        marginBottom : 35
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
