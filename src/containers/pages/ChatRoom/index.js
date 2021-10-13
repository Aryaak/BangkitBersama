import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { ProfilePicture, H4, P } from '../../../components'
import SendIcon from '../../../assets/icon/Send.svg'
import VerifiedIcon from '../../../assets/icon/verified.svg'
import ArrowLeftIcon from '../../../assets/icon/arrow-left.svg'
import Colors from '../../../utils/Colors'

const ChatRoom = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.overlay }}>
            <View style={{ backgroundColor: 'white', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, height: 89, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 }}>
                    <View style={{width:30, height:30, marginTop:10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainPages')}>
                        <ArrowLeftIcon height="100%" width="100%"/>
                    </TouchableOpacity>
                       
                    </View>
                    <ProfilePicture img={''} style={{ marginLeft: 24 }} />
                    <H4 title="Arya Rizky" style={{ fontFamily: 'Nunito-Bold' }} style={{ marginLeft: 24 }} />
                    <View style={{width:30, height:30, marginTop:10}}>
                        <VerifiedIcon style={{ marginLeft: 24 }} height="100%" width="100%"  />  
                    </View>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: Colors.overlay, flex: 1 }}>
                <View style={styles.whiteBuble}>
                    <P title="hi, ada yang bisa saya bantu?" style={{ padding: 10 }} />
                </View>
                <View style={styles.greenBuble}>
                    <Text style={styles.textBubleGreen}>Saya perlu uang buat spp anak saya pak</Text>
                </View>
                <View style={styles.whiteBuble}>
                    <P title="Baik pak / bu akan dikirim" style={{ padding: 10 }} />
                </View>
                <View style={styles.greenBuble}>
                    <Text style={styles.textBubleGreen}>Terima kasih banyak pak</Text>
                </View>
                <View style={styles.whiteBuble}>
                    <P title="Ok tolong segera di kirim" style={{ padding: 10 }} />
                </View>
            </ScrollView>
            <View style={{ backgroundColor: 'transparent', paddingHorizontal: 30, flexDirection: 'row' }}>
                <TextInput placeholder="Masukkan Pesan" placeholderTextColor="gray" style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, height: 54, marginRight: 20, padding: 16 }} />
                <View style={{ height: 54, width: 54, backgroundColor: 'rgba(41, 104, 112, 0.3);', borderRadius: 10, justifyContent: 'center' }}>
                    <SendIcon style={{ width: 26, height: 26, alignSelf: 'center' }}/>
                </View>
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
        borderBottomRightRadius: 10
    },
    textBubleGreen: {
        padding: 10,
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: 'white',

    }
})