import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ProfilePicture, H3, SecondaryButton } from '../../../components'
import { Colors, Async } from '../../../utils'
import { useNavigation } from '@react-navigation/native';
import VerifiedIcon from '../../../assets/icon/verified-white.svg'
import { useSelector } from 'react-redux';


const HeaderProfile = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState({})
    const AuthReducer = useSelector(state => state.Auth)

    useEffect(() => {
        Async.get('user')
            .then(res => {
                setUser(res)
            })
    })

    const renderVerifiedIcon = () => {
        if (AuthReducer.status == 3) {
            return <VerifiedIcon style={{ position: 'absolute', bottom: 0, right: 5 }} />
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={{ position: 'relative' }}>
                <ProfilePicture width={100} height={100} img={user.photo} />
                {renderVerifiedIcon()}
            </View>

            <View style={styles.rightWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={{ color: Colors.background, fontSize: 28, marginBottom: 8, marginRight: 5, fontFamily: 'Nunito-Bold', width: 120 }} numberOfLines={1} ellipsizeMode='tail'>
                        {user.username}
                    </Text>
                </View>
                <SecondaryButton onPress={() => navigation.navigate('EditProfile')} title="Edit Profile" />
            </View>
        </View>
    )
}

export default HeaderProfile

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 30,
        paddingVertical: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightWrapper: {
        marginLeft: 20
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5
    }
})
