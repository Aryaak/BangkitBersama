import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ProfilePicture, P, Small } from '../../../components'
import ChatIcon from '../../../assets/icon/chat-2.svg'
import CheckIcon from '../../../assets/icon/check.svg'
import { Colors } from '../../../utils'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import SuccessIcon from '../../../assets/icon/success.svg'

const HelpRequests = () => {
    const navigation = useNavigation();

    const HelpDetailReducer = useSelector(state => state.HelpDetail)
    const dispatch = useDispatch()

    return (
        <View>
            {HelpDetailReducer.help.requests && HelpDetailReducer.help.requests.map(item => (<View style={{
                position: 'relative',
                borderRadius: 10,
                backgroundColor: 'white',
                padding: 16,
                marginBottom: 16
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 20
                }}>
                    <ProfilePicture img={item.user.photo} />
                    <View style={{ marginLeft: 16 }}>
                        <Small title={item.user.name} style={{ marginBottom: 8 }} />
                        <Small title={moment(item.created_at).fromNow()} color={Colors.grey} />
                    </View>
                    <View style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        right: 16
                    }}>

                        {(item.help_request_status_id == 1 && HelpDetailReducer.help.help_status_id != 4) && <TouchableOpacity onPress={() => dispatch({ type: 'SET_RESPONSE_HELP_REQUEST_MODAL', value: true, selected: item.id })}>
                            <CheckIcon />
                        </TouchableOpacity>}

                        {item.help_request_status_id == 2 && <SuccessIcon />}


                        {HelpDetailReducer.help.help_status_id != 4 && <TouchableOpacity onPress={() => navigation.navigate('ChatRoom', { user: item.user })}>
                            <ChatIcon style={{ marginLeft: 24 }} />
                        </TouchableOpacity>}

                    </View>
                </View>
                <P color={Colors.darkGrey} title={item.reason} />
            </View>))}


        </View>

    )
}

export default HelpRequests

