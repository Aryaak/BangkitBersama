import React, { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Colors } from '../../../utils'
import { H4, FeatureCard, PrimaryButton } from '../../../components'
import Modal from 'react-native-modal';

const Features = ({ navigation }) => {
    const [commingSoon, setCommingSoon] = useState(false);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>

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
            <View style={{ alignItems: 'center' }}>
                <H4
                    title={"Sekecil Apapun Bantuan Kamu, Akan Membantu Mereka Untuk Bangkit"}
                    style={{ textAlign: 'center', marginBottom: 53 }} />
                <FeatureCard
                    onPress={() => navigation.navigate('TawarBantuan')}
                    img={require('../../../assets/illustrations/feature-1.png')}
                    title={"TAWARKAN BANTUAN \nDAN JASA"}
                    text={"Gabung jadi relawan untuk membantu masyarakat \nkita bangkit"}
                    style={{
                        marginBottom: 32
                    }}
                />
                <FeatureCard
                    onPress={() => setCommingSoon(true)}
                    img={require('../../../assets/illustrations/feature-2.png')}
                    title={"MULAI KAMPANYE \nGALANG DANA"}
                    text={"Bantu mereka untuk bangkit dengan menjadi inisiator \nkampanye galang dana"}
                    style={{
                        marginBottom: 32
                    }}
                />
                <FeatureCard
                    onPress={() => setCommingSoon(true)}
                    img={require('../../../assets/illustrations/feature-3.png')}
                    title={"PUNYA INFO AKURAT?"}
                    text={"Upload info kamu disini"}
                />
            </View>
        </ScrollView>
    )
}

export default Features

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 40,
        paddingVertical: 30,
        backgroundColor: Colors.overlay
    }
})
