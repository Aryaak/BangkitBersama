import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { H4, CardTwoSide } from '../../../components'
import { useSelector } from 'react-redux'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const HomeScrollContentOne = ({ navigation, style }) => {

    const HelpForHomeReducer = useSelector(state => state.HelpForHome)
    const skeletonCardHelp = useState(5)

    return (
        <View style={style}>
            <H4 title="Orang-Orang Berhati Baik" style={{ marginBottom: 16, paddingHorizontal: 30 }} />
            <ScrollView
                horizontal
                style={{
                    flexDirection: 'row'
                }}
                showsHorizontalScrollIndicator={false}>
                {HelpForHomeReducer.loading && skeletonCardHelp.map(item => {
                    return <SkeletonPlaceholder>
                        <View style={{ width: 277, height: 390, borderRadius: 15, marginLeft: 30 }}>
                        </View>
                    </SkeletonPlaceholder>
                })}



                {HelpForHomeReducer.helps.map(item => {
                    return (<CardTwoSide
                        onPress={() => navigation.navigate('HelpDetail', { help_id: item.id })}
                        onPressChat={() => navigation.navigate('ChatRoom', { user: item.user })}
                        imgTop={item.photo}
                        sumUsers={item.quota}
                        sumDate={item.end_date}
                        titleCategory={item.category.name}
                        titleTop={item.name.toUpperCase()}
                        textTop="Setiap hari. Pukul 10.00 - 13.00 WIB"
                        imgBottom={item.user.photo}
                        titleBottom={item.user.name}
                        textBottom={item.user.profession}
                        ended={item.help_status_id == 4 ? true : false}
                        style={{ marginLeft: 30 }} />
                    )
                })}

            </ScrollView>
        </View>

    )
}

export default HomeScrollContentOne

