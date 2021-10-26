import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { ProfilePicture, H4, P } from '../../../components'
import SendIcon from '../../../assets/icon/Send.svg'
import SendIcon2 from '../../../assets/icon/send-2.svg'
import VerifiedIcon from '../../../assets/icon/verified.svg'
import ArrowLeftIcon from '../../../assets/icon/arrow-left.svg'
import { Colors, Async } from '../../../utils'
import { HandleSendMessage, HandleGetMessages, HandleReadMessages } from '../../../config/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import Pusher from 'pusher-js/react-native'

const ChatRoom = ({ route, navigation }) => {

    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');

    const MessageReducer = useSelector(state => state.Message)
    const dispatch = useDispatch()

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('46080595e68f22356d9f', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('chat-room');
    channel.bind('message-send', function (data) {
        dispatch({ type: 'SET_MESSAGES', value: data.messages.original.data })
    });

    useEffect(() => {

        const data = {
            sender: null,
            recipient: route.params.user.id
        }
        Async.get('user')
            .then(res => {
                setUser(res)
                data.sender = res.id
            })
        Async.get('token')
            .then(res => {
                setToken(res)
                dispatch(HandleGetMessages(data, res))
                HandleReadMessages(data, res)
            })




    }, [])

    const submitMessage = () => {
        const data = {
            sender: user.id,
            recipient: route.params.user.id,
            message: message
        }
        setMessage('')
        HandleSendMessage(data, token)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.overlay }}>
            <View style={{ backgroundColor: 'white', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, height: 89, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <View style={{ width: 30, height: 30, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowLeftIcon height="100%" width="100%" />
                        </TouchableOpacity>

                    </View>
                    <ProfilePicture img={route.params.user.photo} style={{ marginLeft: 5 }} />
                    <Text style={{fontFamily: 'Nunito-Regular',color:Colors.primary, fontSize:21, marginLeft: 10, width:170}} numberOfLines={1} ellipsizeMode='tail'>
                        {route.params.user.name}
                    </Text>
                        <VerifiedIcon style={{ marginLeft: 5 }} height={30} width={30} />
                
                </View>
            </View>
            <ScrollView style={{ backgroundColor: Colors.overlay, flex: 1, paddingBottom: 100 }}>
                <View style={{ marginBottom: 32 }}>
                    {(MessageReducer.messages.length > 0) && MessageReducer.messages.map(item => {
                        if (item.sender == user.id) {
                            return (<View style={styles.greenBuble}>
                                <Text style={styles.textBubleGreen}>{item.message}</Text>
                            </View>)
                        } else {
                            return (<View style={styles.whiteBuble}>
                                <P title={item.message} style={{ padding: 10 }} />
                            </View>)
                        }

                    })}
                </View>


            </ScrollView>
            <View style={{ backgroundColor: 'transparent', paddingHorizontal: 30, flexDirection: 'row', marginBottom: 20 }}>
                <TextInput value={message} onSubmitEditing={() => submitMessage()} onChangeText={value => setMessage(value)} placeholder="Masukkan Pesan" placeholderTextColor="gray" style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, height: 54, marginRight: 20, padding: 16 }} />

                <TouchableOpacity onPress={() => submitMessage()} style={[styles.sendButton, { backgroundColor: !message ? 'rgba(41, 104, 112, 0.3);' : Colors.primary }]}>
                    {message == '' && <SendIcon style={{ width: 26, height: 26, alignSelf: 'center' }} />}
                    {message != '' && <SendIcon2 style={{ width: 26, height: 26, alignSelf: 'center' }} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    whiteBuble: {
        width: 235,
        backgroundColor: 'white',
        marginTop: 32,
        marginHorizontal: 30,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    greenBuble: {
        width: 205,
        backgroundColor: Colors.primary,
        alignSelf: 'flex-end',
        marginHorizontal: 30,
        marginTop: 32,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    textBubleGreen: {
        padding: 10,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: 'white',

    },
    sendButton: {
        height: 54,
        width: 54,
        borderRadius: 10,
        justifyContent: 'center'
    }
})