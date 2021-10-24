import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Colors from '../../../utils/Colors'
import ArrowLeft from './../../../assets/icon/arrow-left-white.svg'
import {H4} from '../../../components'
import { useNavigation } from '@react-navigation/native';


const TentangAplikasi = () => {
    const navigation = useNavigation(); 
    return (
        <View style={{backgroundColor:Colors.primary, height:'100%', padding:30}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft/>
            </TouchableOpacity>
            <View>
                <Text style={{color:'white', fontSize:34, fontFamily:'Nunito-Bold', textAlign:'center', marginTop:119}}>BangkitBersama</Text>
                <H4 title="versi 0.0.1" style={{textAlign:'center' ,color:'white', marginTop:16}}/>
                <Image source={require('../../../assets/logo/bangkitbersama.png')} style={{alignSelf:'center', marginTop:48}}/>
                <H4 title="©2021 Ampersand" style={{textAlign:'center' ,color:'white', marginTop:48}}/>
            </View>
        </View>
    )
}

export default TentangAplikasi
