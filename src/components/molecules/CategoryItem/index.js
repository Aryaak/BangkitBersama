import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RoundedSquare, Small } from '../../../components'

const CategoryItem = ({ active, icon, title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <RoundedSquare active={active} content={icon} />
            <Small title={title} style={{ fontWeight: '400', marginTop: 8 }} />
        </TouchableOpacity>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    }
})
