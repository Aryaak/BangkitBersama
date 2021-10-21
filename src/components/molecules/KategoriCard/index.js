import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { H5, HelpEnded } from '../../../components'
import UsersIcon from '../../../assets/icon/users.svg'
import ClockIcon from '../../../assets/icon/clock.svg'
import VerifiedIcon from '../../../assets/icon/verified.svg'
import { CountDiffDate } from '../../../utils'

const KategoriCard = ({ navigation, item }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('HelpDetail', { help_id: item.id })} style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 15 }}>
                <Image source={{ uri: item.photo }} style={{ height: 115, width: 118, borderRadius: 15 }} />
                <View style={{ width: 170, paddingLeft: 10 }}>
                    <H5 style={{ fontFamily: 'Nunito-SemiBold' }} title={item.name.toUpperCase()} />
                    <Text style={{ color: 'gray', fontSize: 12, marginTop: 10 }}>{item.category.name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {item.help_status_id != 4 && (<>
                            <View style={{ flexDirection: 'row', marginRight: 8 }}>
                                <UsersIcon width={16} height={16} style={{ marginRight: 4 }} />
                                <H5 title={item.quota + ' Orang'} style={{ paddingLeft: 8 }} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <ClockIcon width={16} height={16} style={{ marginRight: 4 }} />
                                <H5 title={CountDiffDate(item.end_date)} style={{ paddingLeft: 8 }} />
                            </View></>)}

                        {item.help_status_id == 4 &&
                            <HelpEnded />}

                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <H5 title={item.user.name} />
                        <VerifiedIcon width={10} height={12} style={{ marginLeft: 7, marginTop: 3 }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default KategoriCard
