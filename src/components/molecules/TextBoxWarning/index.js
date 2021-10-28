import React from 'react'
import { StyleSheet, View } from 'react-native'
import { P } from '../..'

const TextBoxWarning = ({ text, style }) => {
    return (
        <View style={[styles.wrapper, style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <P color="#D84910" title={text} />
            </View>
        </View>
    )
}

export default TextBoxWarning

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(216, 73, 16, 0.1)',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8
    }
})