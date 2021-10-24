import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ArrowLeft from '../../../assets/icon/arrow-left.svg'
import {H4, H5, P, ProfileList} from '../../../components'
import Colors from '../../../utils/Colors'
import Search from '../../../assets/icon/search.svg'
import Online from '../../../assets/icon/Online.svg'
import { useNavigation } from '@react-navigation/native';


const PesanMasuk = () => {
    const navigation = useNavigation(); 
    return (
        <View style={{padding:20, backgroundColor:Colors.overlay, flex:1}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft/>
                </TouchableOpacity>
                <H4 title="Pesan Masuk" style={{marginLeft:73, fontFamily:'Nunito-Bold'}}/>
            </View>
            <View style={styles.searchSection}>
                <Search style={styles.searchIcon} size={20} color="#000"/>
                <TextInput
                    style={styles.input}
                    placeholder="Cari Pesan / Pengirim"
                    onChangeText={(searchString) => {this.setState({searchString})}}
                    underlineColorAndroid="transparent"
                />
            </View>
           
            <ProfileList/>
            <ProfileList/>
            <ProfileList/>
            {/* sudah dibaca  */}
            <View>
                <View style={{marginTop:32, flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#EBEBEB', borderBottomWidth: 2, paddingBottom:10 }}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width: 55, height: 55}} source={require('./../../../assets/logo/pp.png')} />
                    <View style={{marginLeft:24}}>
                        <P style={{color:'black'}} title="Arya Rizzky"/>
                        <H5 style={{color:'black'}} title="Baik pak terima kasih"/>
                        </View>
                    </View>
                    <View style={{width:50, paddingHorizontal:9, marginTop:8}}>
                        <Text style={{color:Colors.primary, color:Colors.grey, fontSize:9, paddingBottom:3}}>19.45</Text>
                      
                    </View>
                </View>
            </View>
            <View>
                <View style={{marginTop:32, flexDirection:'row', justifyContent:'space-between', borderBottomColor:'#EBEBEB', borderBottomWidth: 2, paddingBottom:10 }}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width: 55, height: 55}} source={require('./../../../assets/logo/pp.png')} />
                    <View style={{marginLeft:24}}>
                        <P style={{color:'black'}} title="Arya Rizzky"/>
                        <H5 style={{color:'black'}} title="Baik pak terima kasih"/>
                        </View>
                    </View>
                    <View style={{width:50, paddingHorizontal:9, marginTop:8}}>
                        <Text style={{color:Colors.primary, color:Colors.grey, fontSize:9, paddingBottom:3}}>19.45</Text>
                      
                    </View>
                </View>
            </View>
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
        height:59,
        marginTop:48,
        borderRadius:15
    },
    searchIcon: {
        padding: 10,
        marginLeft:22
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

