import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../../../utils'

const H2 = ({ title, color = Colors.primary, style }) => {
    return (
        <Text style={[styles.h2, { color: color }, style]}>{title}</Text>
    )
}

export default H2

const styles = StyleSheet.create({
    h2: {
        fontSize: 38,
        fontFamily: 'Nunito-SemiBold'
    }
})
