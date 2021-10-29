import React, { useState } from 'react'
import { StackActions } from '@react-navigation/native'
import { StyleSheet, View, Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Colors, Slides, Async } from '../../../utils'
import { CircleLinearButton, LinearButton } from '../../../components'
import { OnBoard } from '../../templates';
import BrokenArrow from '../../../assets/icon/left-broken.svg'

const renderContent = ({ item, index }) => {
    return (
        <OnBoard item={item} />
    );
}

const pagination = ({ activeSlide }) => {
    return (
        <Pagination
            dotsLength={Slides.length}
            activeDotIndex={activeSlide}
            containerStyle={{
                position: 'absolute',
                bottom: 90
            }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 100,
                marginHorizontal: 3,
                backgroundColor: Colors.secondary
            }}
            inactiveDotStyle={{
                width: 5,
                height: 5,
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
        />
    );
}



const OnBoarding = ({ navigation }) => {

    const setButton = ({ navigation, activeSlide, setActiveSlide }) => {
        if (activeSlide != (Slides.length - 1)) {
            return <CircleLinearButton onPress={() => {
                if (activeSlide <= (Slides.length - 1)) {
                    carousel.snapToNext()
                }
            }} icons={<BrokenArrow style={{ marginRight: 10 }} />} />

        } else {
            return <LinearButton onPress={() => {
                Async.set('isFirtsLaunch', 'true')
                navigation.dispatch(StackActions.replace('Auth'))
            }} style={{ marginBottom: 40 }} nextLabel={false} width={206} paddingVertical={15} title="Selanjutnya" />
        }
    }

    const [activeSlide, setActiveSlide] = useState(0)
    const [carousel, setCarousel] = useState(0)
    return (
        <View style={styles.wrapper}>
            <Carousel
                data={Slides}
                firstItem={activeSlide}
                renderItem={renderContent}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                onSnapToItem={(index) => setActiveSlide(index)}
                ref={(c) => { setCarousel(c) }}
            />
            {pagination({ activeSlide })}
            {setButton({ navigation, activeSlide, setActiveSlide })}
        </View>
    );
}

export default OnBoarding

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primary

    }
})