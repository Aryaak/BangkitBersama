import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { H4, CardCoverTop, PrimaryButton } from '../../../components'
import { Colors } from '../../../utils'
import Modal from 'react-native-modal';

const HomeScrollContentTwo = ({ style }) => {
    const [commingSoon, setCommingSoon] = useState(false);
    return (
        <View style={style}>
            <Modal
                testID={'modal'}
                isVisible={commingSoon}
                backdropColor={Colors.darkGrey}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600} >
                <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 25, borderRadius: 15 }}>
                    <H4 title="Fitur ini akan segera datang!" />
                    <PrimaryButton onPress={() => setCommingSoon(false)} title="Tutup" style={{ paddingHorizontal: 10, marginTop: 20, alignSelf: 'flex-end' }} />
                </View>
            </Modal >
            <H4 title="Bantu Mereka Bangkit" style={{ marginBottom: 16, paddingHorizontal: 30 }} />
            <ScrollView
                horizontal
                style={{
                    flexDirection: 'row'
                }}
                showsHorizontalScrollIndicator={false}>
                <CardCoverTop
                    onPress={() => setCommingSoon(true)}
                    img={require('../../../assets/picture/bantu-bangkit.png')}
                    title="GALANG DANA UNTUK MEMBANTU MEREKA YANG MEMBUTUHKAN"
                    price="RP. 120.000.000,-"
                    date="/ 20 Hari tersisa"
                    percentage={75}
                    style={{ marginLeft: 30, marginRight: 20 }}
                />

            </ScrollView>

        </View>

    )
}

export default HomeScrollContentTwo

