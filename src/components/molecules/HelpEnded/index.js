import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../../utils'
import { Small } from '../../../components'
import CloseIcon from '../../../assets/icon/close-square.svg'

const HelpEnded = ({ style }) => {
    return (
        <View style={[styles.wrapper, style]}>
            <CloseIcon />
            <Small title="Telah Berakhir" color={Colors.red} style={{ marginLeft: 5 }} />
        </View>
    )
}

export default HelpEnded

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
