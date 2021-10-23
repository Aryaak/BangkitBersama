import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { H4 } from '../../../components'
import { Colors } from '../../../utils';
import { useSelector } from 'react-redux';

const Loading = () => {

    const loadingReducer = useSelector(state => state.Loading)

    return (
        <Modal
            testID={'modal'}
            isVisible={loadingReducer.isLoading}
            backdropColor={Colors.darkGrey}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600} >
            <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 25, borderRadius: 15 }}>
                <LottieView
                    style={
                        { width: 100, alignSelf: 'center' }
                    }
                    autoPlay
                    loop
                    source={require('../../../assets/icon/loader.json')}
                />
                <H4 title={loadingReducer.text} />
            </View>
        </Modal >
    )
}

export default Loading

