import React from 'react'
import { StyleSheet, View } from 'react-native'
import { P } from '../..'

const TextBoxDanger = ({ text }) => {
    return (
        <View style={styles.wrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <P color="#F03D3E" title={text} />
            </View>
        </View>
    )

}

export default TextBoxDanger

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(240, 61, 62, 0.1)',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8
    }
})