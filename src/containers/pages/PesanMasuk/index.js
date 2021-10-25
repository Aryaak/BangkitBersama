import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import ArrowLeft from '../../../assets/icon/arrow-left.svg'
import { H4, ProfileList } from '../../../components'
import { Colors, Async } from '../../../utils'
import Search from '../../../assets/icon/search.svg'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { HandleGetIncomingMessages } from '../../../config/redux/action'


const PesanMasuk = () => {

    const MessageReducer = useSelector(state => state.Message)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    const navigation = useNavigation();

    const searchSender = (key) => {
        const data = key.toLowerCase();
        let keyword = search.toLowerCase();

        return data.includes(keyword)
    }

    useEffect(() => {


        Async.get('token')
            .then(res => {
                dispatch(HandleGetIncomingMessages(res))
            })
    }, [MessageReducer])


    return (
        <View style={{ padding: 20, backgroundColor: Colors.overlay, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <H4 title="Pesan Masuk" style={{ fontFamily: 'Nunito-Bold', alignSelf: 'center', marginLeft: 40 }} />
            </View>
            <View style={styles.searchSection}>
                <Search style={styles.searchIcon} size={20} color="#000" />
                <TextInput
                    style={styles.input}
                    placeholder="Cari Pengirim"
                    value={search}
                    onChangeText={value => setSearch(value)}
                    underlineColorAndroid="transparent"
                />
            </View>

            {MessageReducer.incoming.map(item => {
                if (searchSender(item.name)) {

                    return (<ProfileList item={item} navigation={navigation} />)
                }
            })}


        </View>
    )
}

export default PesanMasuk

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 59,
        marginTop: 48,
        borderRadius: 15
    },
    searchIcon: {
        padding: 10,
        marginLeft: 22
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 24,
        backgroundColor: '#fff',
        color: '#424242',
    },
})

