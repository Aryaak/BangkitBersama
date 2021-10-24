import React from 'react'
import { TouchableOpacity, View, Linking, StyleSheet } from 'react-native'
import { IconLeftTextRight } from '../../../components'
import MessageIcon from '../../../assets/icon/message.svg'
import SettingIcon from '../../../assets/icon/setting.svg'
import AboutIcon from '../../../assets/icon/about.svg'
import RateIcon from '../../../assets/icon/rate.svg'
import ChevronRight from './../../../assets/icon/chevron-right.svg'
import { useNavigation } from '@react-navigation/native';


const ProfileMenuList = () => {
    const navigation = useNavigation(); 
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('PesanMasuk')} style={{ marginBottom: 24 }}>
                <View  style={styles.menu}>
                    <IconLeftTextRight
                        icon={<MessageIcon />}
                        title="Pesan"
                        />
                    <ChevronRight style={{marginTop:2}} width={20} height={20}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('KebijakanPrivasi')} style={{ marginBottom: 24 }}>
                <View style={styles.menu}>
                    <IconLeftTextRight
                        icon={<SettingIcon />}
                        title="Setelan Aplikasi" 
                         />
                        <ChevronRight style={{marginTop:2}} width={20} height={20}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('TentangAplikasi')} style={{ marginBottom: 24 }}>
                <View style={styles.menu}>
                    <IconLeftTextRight
                        icon={<AboutIcon />}
                        title="Tentang" 
                        />
                    <ChevronRight style={{marginTop:2}} width={20} height={20}/>
                    </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.bangkitbersama')} style={{ marginBottom: 24 }}>
                <View style={styles.menu}>
                    <IconLeftTextRight
                    icon={<RateIcon />}
                    title="Beri Rating" 
                    />
                    <ChevronRight style={{marginTop:2}} width={20} height={20} />
                </View>
            </TouchableOpacity>
        </View >
    )
}

export default ProfileMenuList

const styles = StyleSheet.create({
    menu : {
    flexDirection:'row', 
    justifyContent:'space-between', 
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2, 
    paddingBottom:22}
})
