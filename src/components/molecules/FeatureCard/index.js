import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../../../utils'
import { P, Xsmall } from '../../../components'
import ChevronRight from '../../../assets/icon/chevron-right1.svg'

const FeatureCard = ({ img, title, text, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
            {/* <Image source={img} style={{
                width: styles.wrapper.width - styles.sectionWrapper.width,
                alignSelf: 'center'
            }} /> */}
            <View style={{
                width: styles.wrapper.width - styles.sectionWrapper.width,
                alignSelf: 'center',
                position: 'relative'
            }}>
                {img}
            </View>


            <View style={styles.sectionWrapper}>
                <View>
                    <P title={title} style={{ fontWeight: '500', marginBottom: 8 }} />
                    <Xsmall title={text} color={Colors.grey} />
                </View>
                {/* <Sicon width={5} img={require('../../../assets/icon/left-arrow.png')} /> */}
                <ChevronRight />
            </View>
        </TouchableOpacity>
    )
}

export default FeatureCard

const styles = StyleSheet.create({
    wrapper: {
        shadowColor: Colors.grey,
        elevation: 50,
        flexDirection: 'row',
        width: 351,
        height: 100,
        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    sectionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 277,
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 16
    }
})
