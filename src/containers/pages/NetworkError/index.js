import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { H3, P, PrimaryButton } from '../../../components'
import NetworkIcon from '../../../assets/illustrations/network.svg'

const NetworkError = () => {
    return (
        <View style={styles.wrapper}>
            <H3 title="Oops, Error!" style={{ marginBottom: 50 }} />
            <NetworkIcon />
            <P color={'black'} title="Coba cek jaringan internet kamu,
lalu muat ulang aplikasi" style={{ textAlign: 'center', marginTop: 50 }} />
            <PrimaryButton style={{ marginTop: 50, width: 208 }} paddingVertical={15} title="Muat Ulang" />
        </View>
    )
}

export default NetworkError

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 100,
        alignItems: 'center',
        alignSelf: 'center'
    }
})
