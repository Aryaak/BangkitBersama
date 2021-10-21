import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../../../utils'

const RoundedSquare = ({ active, content }) => {
    return (
        <View style={styles.wrapper, {
            borderWidth: active ? 1 : 0,
            borderColor: active ? Colors.primary : 'white',
            borderRadius: active ? 10 : 0,
        }}>
            {content}
        </View>
    )
}

export default RoundedSquare

const styles = StyleSheet.create({
    wrapper: {
        width: 70,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
