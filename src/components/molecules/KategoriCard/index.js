import React from 'react'
import { View, Text, Image } from 'react-native'
import { H5 } from '../../../components'
import UsersIcon from '../../../assets/icon/users.svg'
import ClockIcon from '../../../assets/icon/clock.svg'
import VerifiedIcon from '../../../assets/icon/verified.svg'

const KategoriCard = () => {
    return (
        <View style={{paddingHorizontal:20, marginBottom:10}}>
              <View style={{flexDirection:'row', backgroundColor:'white', padding:10, borderRadius:15}}>
                    <Image source={require('../../../assets/illustrations/foto.jpg')} style={{height:115, width: 118, borderRadius:15}}/>
                    <View style={{width: 170, paddingLeft:10}}>
                     <H5 style={{fontFamily:'Nunito-SemiBold'}} title="BANTUAN BERUPA TUNAI UNTUK GOLONGAN MBR" />
                    <Text style={{color:'gray', fontSize:12, marginTop:10}}>Ekonomi</Text>
                    <View style={{flexDirection:'row', marginTop:10 }}>
                        <View style={{flexDirection:'row', marginRight:8}}>
                            <UsersIcon width={16} height={16} style={{marginRight:4}} />
                            <H5 title="3 Orang" style={{paddingLeft:8}} />
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <ClockIcon width={16} height={16} style={{marginRight:4}}/>
                            <H5 title="21 Hari Lagi" style={{paddingLeft:8}} />
                        </View>
                    </View>
                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <H5 title="Arya" />
                        <VerifiedIcon width={10} height={12}  style={{marginLeft:7, marginTop:3}}/>
                    </View>
                 </View>
              </View>
            </View>
    )
}

export default KategoriCard
