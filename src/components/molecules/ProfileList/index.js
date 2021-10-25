import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Online from '../../../assets/icon/Online.svg'
import { P, H5, ProfilePicture } from './../../../components'
import { Colors } from '../../../utils'
import moment from 'moment'

const PofileList = ({ navigation, item }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { user: item })}>
            <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomColor: '#EBEBEB', borderBottomWidth: 2, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ProfilePicture img={item.photo} />
                    <View style={{ marginLeft: 24 }}>
                        <P style={{ color: 'black', marginBottom: 8 }} title={item.name} />
                        <H5 style={{ color: !item.last_message.read ? 'black' : Colors.grey }} title={item.last_message.message} />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: !item.last_message.read ? Colors.primary : Colors.grey, fontSize: 9, paddingBottom: 8 }}>{moment(item.last_message.created_at).fromNow()}</Text>
                    {!item.last_message.read && <Online style={{ marginLeft: 18, marginTop: 6 }} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PofileList
