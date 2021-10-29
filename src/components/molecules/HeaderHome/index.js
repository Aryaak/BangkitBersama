import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { H3, P, ProfilePicture } from '../../../components'
import { Colors, Async } from '../../../utils'

const HeaderHome = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        Async.get('user')
            .then(res => {
                setUser(res)
            })
    })

    return (
        <View style={styles.wrapper}>
            <View>
                <Text style={{ fontSize: 28, fontFamily: 'Nunito-Bold', color: Colors.background, width: 220 }} numberOfLines={1} ellipsizeMode='tail'>Halo, {user.username}</Text>
                <P title="Mari bangkit bersama hari ini!" color={Colors.background} />
            </View>
            <ProfilePicture img={user.photo} />
        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
