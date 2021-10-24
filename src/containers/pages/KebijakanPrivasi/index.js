import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import Colors from '../../../utils/Colors'
import {H4, P, H3} from '../../../components'
import VerifiedIcon from './../../../assets/icon/verified.svg'
import ArrowLeft from './../../../assets/icon/arrow-left-white.svg'
import OnBoard6 from './../../../assets/illustrations/onBoard-6.svg'
import { useNavigation } from '@react-navigation/native';



const KebijakanPrivasi = () => {
    const navigation = useNavigation(); 

    return (
        <ScrollView style={{flex:1, backgroundColor:Colors.primary}}>
           <View style={{height:180, backgroundColor: Colors.primary}}>
               <View style={{padding:20}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:16}}>
                        <View style={{width:180}}>
                                <H3 title="Kebijakan Privasi" style={{color:'white', marginLeft:15}}  />
                        </View>
                            <OnBoard6 width={90} height={90}/>
                    </View>
                </View>
              
           </View>
           <View style={{flex:1, backgroundColor:Colors.overlay, borderTopRightRadius:30, borderTopLeftRadius:30}}>
                    <View style={{padding:20}}>
                        <View style={{flexDirection:'row'}}>
                            <VerifiedIcon style={{marginRight:16}} width={30} height={30}/>
                            <View style={{width:250}}>
                                <H4 style={{fontFamily:'Nunito-Bold'}} title="Kebijakan Privasi Aplikasi Bangkit Bersama"/>
                                <P title="Di Bangkit Bersama, dapat diunduh di platform Play Store, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh Bangkit Bersama dan bagaimana kami menggunakannya."  style={{marginTop:16, fontFamily:'Nunito-Light'}}/>

                                <P title="Jika Anda memiliki pertanyaan tambahan atau memerlukan informasi lebih lanjut tentang Kebijakan Privasi kami, jangan ragu untuk menghubungi kami." style={{marginTop:16, fontFamily:'Nunito-Light'}} />
                            </View>
                        </View> 


                        <View style={{flexDirection:'row', marginTop:40}}>
                            <VerifiedIcon style={{marginRight:16}} width={30} height={30}/>
                            <View style={{width:250}}>
                                <H4 style={{fontFamily:'Nunito-Bold'}} title="Informasi Yang Kami Kumpulkan"/>
                                <P title="Bangkit Bersama mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung ketika mereka mengunjungi aplikasi. Semua perusahaan hosting melakukan ini dan merupakan bagian dari analisis layanan hosting. Informasi yang dikumpulkan oleh file log termasuk alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), tanggal dan waktu, halaman rujukan/keluar, dan mungkin jumlah klik. Ini tidak terkait dengan informasi apa pun yang dapat diidentifikasi secara pribadi. Tujuan informasi adalah untuk menganalisis tren, mengelola situs, melacak pergerakan pengguna di aplikasi, dan mengumpulkan informasi demografis."  style={{marginTop:16, fontFamily:'Nunito-Light'}}/>

                            </View>
                        </View>
                        

                        <View style={{flexDirection:'row', marginTop:40}}>
                            <VerifiedIcon style={{marginRight:16}} width={30} height={30}/>
                            <View style={{width:250}}>
                                <H4 style={{fontFamily:'Nunito-Bold'}} title="Kebijakan Privasi Pihak Ketiga"/>
                                <P title="Kebijakan Privasi Bangkit Bersama tidak berlaku untuk pengiklan atau situs web lain. Karena itu, kami menyarankan Anda untuk membaca seksama masing-masing Kebijakan Privasi dari pihak ketiga untuk informasi yang lebih rinci. Anda berhak untuk menonaktifkan cookies pada browser Anda." style={{marginTop:16, fontFamily:'Nunito-Light'}}/>

                            </View>
                        </View> 

                        <View style={{flexDirection:'row', marginTop:40}}>
                            <VerifiedIcon style={{marginRight:16}} width={30} height={30}/>
                            <View style={{width:250}}>
                                <H4 style={{fontFamily:'Nunito-Bold'}} title="Informasi Anak"/>
                                <P title="Salah satu prioritas kami adalah membantu perlindungan untuk anak-anak saat menggunakan internet. Kami mendorong orang tua dan wali untuk mengamati, berpartisipasi, memantau, dan membimbing aktivitas online mereka." style={{marginTop:16, fontFamily:'Nunito-Light'}}
                                />
                                 <P title="Bangkit Bersama tidak dengan sengaja mengumpulkan informasi identifikasi pribadi apa pun dari anak-anak di bawah umur. Jika menurut Anda anak Anda memberikan informasi semacam ini di situs web kami, kami sangat menganjurkan Anda untuk segera menghubungi kami dan kami akan melakukan upaya terbaik kami untuk segera hapus informasi tersebut dari catatan kami." style={{marginTop:16, fontFamily:'Nunito-Light'}} />
                            </View>
                        </View> 

                        <View style={{flexDirection:'row', marginTop:40}}>
                            <VerifiedIcon style={{marginRight:16}} width={30} height={30}/>
                            <View style={{width:250}}>
                                <H4 style={{fontFamily:''}} title="Persetujuan"/>
                                <P title="Dengan menggunakan aplikasi kami, berarti anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui syarat dan ketentuannya." style={{marginTop:16, fontFamily:'Nunito-Light'}}
                                />
                               
                            </View>
                        </View> 
        
                    </View>
           </View>
        </ScrollView>
    )
}

export default KebijakanPrivasi
