import React, { useEffect } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    SplashScreen,
    Home,
    Features,
    Profile,
    Welcome,
    OnBoarding,
    Auth,
    Login,
    Register,
    HelpDetail,
    TawarBantuan,
    HelpInput,
    HelpEdit,
    ChatRoom,
    EditProfile,
    Kategori,
    TentangAplikasi,
    KebijakanPrivasi,
    PesanMasuk
} from '../../containers/pages'
import { TabIcon, FeaturesButton, TabItemActive } from '../../components'
import { Colors, Async } from '../../utils'
import HeartIcon from '../../assets/icon/heart.svg'
import { useDispatch } from 'react-redux';
import HomeIcon from '../../assets/icon/Home.svg'
import ProfileIcon from '../../assets/icon/User-black.svg'
import HomeGreenIcon from '../../assets/icon/Home-primary.svg'
import ProfileGreenIcon from '../../assets/icon/User-primary.svg'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainPages = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        Async.get('user')
            .then(res => {
                dispatch({ type: 'SET_STATUS', value: res.user_status_id })
            })
    }, [])

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.bottomNavigation
        }} >
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (<TabItemActive icon={<HomeGreenIcon/>} title="Home" />)
                    } else {
                        return (
                           <HomeIcon/>
                        )
                    }

                }
            }} name="Home" component={Home} />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (<FeaturesButton active top={-13} content={<HeartIcon />} />)
                    } else {
                        return (
                            <FeaturesButton top={-13} content={<HeartIcon />} />
                        )
                    }

                }
            }} name="Features" component={Features} />
            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return (<TabItemActive icon={<ProfileGreenIcon/>} title="Profile" textLeft />)
                    } else {
                        return (
                            <ProfileIcon/>
                        )
                    }

                }

            }} name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const Router = () => {
    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor={Colors.primary}
                barStyle='light-content'
            />
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen" >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="MainPages" component={MainPages} />
                <Stack.Screen name="HelpDetail" component={HelpDetail} />
                <Stack.Screen name="TawarBantuan" component={TawarBantuan} />
                <Stack.Screen name="HelpInput" component={HelpInput} />
                <Stack.Screen name="HelpEdit" component={HelpEdit} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Kategori" component={Kategori} />
                <Stack.Screen name="TentangAplikasi" component={TentangAplikasi} />
                <Stack.Screen name="KebijakanPrivasi" component={KebijakanPrivasi} />
                <Stack.Screen name="PesanMasuk" component={PesanMasuk} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router

const styles = StyleSheet.create({
    bottomNavigation: {
        height: 70,
        color: '#FFFFFF',
        paddingHorizontal: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
})
