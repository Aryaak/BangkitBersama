import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { CategoryItem,H3, H5, KategoriCard } from '../../../components'
import CovidIcon from '../../../assets/icon/covid.svg'
import EkonomiIcon from '../../../assets/icon/ekonomi.svg'
import PanganIcon from '../../../assets/icon/pangan.svg'
import JasaIcon from '../../../assets/icon/jasa.svg'
import ArrowLeftIcon from '../../../assets/icon/arrow-left.svg'
import CloseSquare from '../../../assets/icon/Close Square.svg'
import VerifiedIcon from '../../../assets/icon/verified.svg'

const Kategori = () => {
    return (
        <View style={{flex: 1}}>
             <View style={{paddingHorizontal:30, marginBottom:40,justifyContent: 'center'}}>
                <View style={{ flexDirection:'row', marginTop:30, alignItems: 'center'}}>
                    <View style={{width:30, height:30}}>
                        <ArrowLeftIcon width={30} height={30} />
                    </View>
                    <H3 title="Kategori" style={{marginLeft:40}}/>
                </View>
                <View style={[styles.wrapper]}>
                    <CategoryItem title="Covid 19"   icon={<CovidIcon />} />
                    <CategoryItem title="Ekonomi"  icon={<EkonomiIcon />} />
                    <CategoryItem title="Pangan"  icon={<PanganIcon />} />
                    <CategoryItem title="Jasa"  icon={<JasaIcon />} />
                </View>
            </View>
        <ScrollView>
            <KategoriCard/>
            <KategoriCard/>
            <View style={{paddingHorizontal:20, marginBottom:10}}>
              <View style={{flexDirection:'row', backgroundColor:'white', padding:10, borderRadius:15}}>
                    <Image source={require('../../../assets/illustrations/foto.jpg')} style={{height:115, width: 118, borderRadius:15}}/>
                    <View style={{width: 170, paddingLeft:10}}>
                     <H5 style={{fontFamily:'Nunito-SemiBold'}} title="BANTUAN BERUPA TUNAI UNTUK GOLONGAN MBR" />
                    <Text style={{color:'gray', fontSize:12, marginTop:10}}>Ekonomi</Text>
                    <View style={{flexDirection:'row', marginTop:10 }}>
                       <CloseSquare/>
                       <Text style={{fontSize:12, color:'red', marginLeft:5}}>Telah Berakhir</Text>
                    </View>
                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <H5 title="Arya" />
                        <VerifiedIcon width={10} height={12}  style={{marginLeft:7, marginTop:3}}/>
                    </View>
                 </View>
              </View>
            </View>
            <View style={{paddingHorizontal:20, marginBottom:10}}>
              <View style={{flexDirection:'row', backgroundColor:'white', padding:10, borderRadius:15}}>
                    <Image source={require('../../../assets/illustrations/foto.jpg')} style={{height:115, width: 118, borderRadius:15}}/>
                    <View style={{width: 170, paddingLeft:10}}>
                     <H5 style={{fontFamily:'Nunito-SemiBold'}} title="BANTUAN BERUPA TUNAI UNTUK GOLONGAN MBR" />
                    <Text style={{color:'gray', fontSize:12, marginTop:10}}>Ekonomi</Text>
                    <View style={{flexDirection:'row', marginTop:10 }}>
                       <CloseSquare/>
                       <Text style={{fontSize:12, color:'red', marginLeft:5}}>Telah Berakhir</Text>
                    </View>
                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <H5 title="Arya" />
                        <VerifiedIcon width={10} height={12}  style={{marginLeft:7, marginTop:3}}/>
                    </View>
                 </View>
              </View>
            </View>
           
        </ScrollView>
        </View>
       
       
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:40
    }
})

export default Kategori
