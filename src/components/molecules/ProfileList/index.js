import React from 'react'
import { View, Text, Image } from 'react-native'
import Online from '../../../assets/icon/Online.svg'
import {P, H5} from './../../../components'
import Colors from '../../../utils/Colors'

const PofileList = () => {
    return (
        <View>
            <View style={{marginTop:32, flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#EBEBEB', borderBottomWidth: 2, paddingBottom:10 }}>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width: 55, height: 55}} source={require('./../../../assets/logo/pp.png')} />
                    <View style={{marginLeft:24}}>
                        <P style={{color:'black'}} title="Arya Rizzky"/>
                        <H5 style={{color:'black'}} title="Baik pak terima kasih"/>
                    </View>
                </View>
                <View style={{width:50, paddingHorizontal:9}}>
                    <Text style={{color:Colors.primary, fontSize:9, paddingBottom:3}}>3 Menit</Text>
                    <Online style={{ marginLeft:18, marginTop:6 }}/>
                </View>
            </View>
        </View>
    )
}

export default PofileList
