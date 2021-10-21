import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { PictureLeftTextRight, PrimaryButton, P, Small, HelpEnded } from '../../../components'
import { Colors, CountDiffDate } from '../../../utils'
import ChatIcon from '../../../assets/icon/chat.svg'
import UsersIcon from '../../../assets/icon/users.svg'
import ClockIcon from '../../../assets/icon/clock.svg'

const CardTwoSide = ({ sumUsers, sumDate, titleCategory, style, imgTop, titleTop, textTop, imgBottom, titleBottom, textBottom, onPress, onPressChat, ended }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
            <View style={styles.topCover}>
                <View style={styles.coverWrapper}>
                    <Image style={styles.imgCover} source={{ uri: imgTop }} />
                </View>
                <View style={{ padding: 16 }}>
                    <P style={{ marginBottom: 8 }} title={titleTop} />
                    <Small color={Colors.grey} title={titleCategory} />

                    {!ended && <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                            <UsersIcon />
                            <Small style={{ marginLeft: 8 }} title={sumUsers + " Orang"} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ClockIcon />
                            <Small style={{ marginLeft: 8 }} title={CountDiffDate(sumDate)} />
                        </View>
                    </View>}

                    {ended && <HelpEnded style={{ marginTop: 16 }} />}

                </View>
            </View>

            <View style={{ padding: 16 }}>
                <PictureLeftTextRight

                    img={imgBottom}
                    title={titleBottom}
                    text={textBottom}
                />
                <PrimaryButton onPress={onPressChat} title="Hubungi Sekarang" icon={<ChatIcon width={15} height={15} />} /></View>


        </TouchableOpacity>
    )
}

export default CardTwoSide

const styles = StyleSheet.create({
    wrapper: {
        width: 277,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 20
    },
    coverWrapper: {
        width: '100%',
        height: 130,
        marginBottom: 8
    },
    imgCover: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover'
    },
    topCover: {
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        paddingBottom: 24
    }
})
