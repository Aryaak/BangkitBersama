import React, { useEffect, useState } from 'react'
import { Router, store } from './config'
import { Notification } from './utils'
import { Provider } from 'react-redux'
import { useNetInfo } from "@react-native-community/netinfo";
import { NetworkError } from './containers/pages'
import { Loading } from './components'
import Firebase from '@react-native-firebase/app'

require('moment/locale/id.js');

const App = () => {

  const netInfo = useNetInfo();
  const [connection, setConnection] = useState(true);


  useEffect(() => {
    Firebase.initializeApp(this)
    Notification.configure()
    setConnection(netInfo.isConnected)

  })

  if (connection) {
    return (
      <Provider store={store}>
        <Loading />
        <Router />
      </Provider>
    )
  } else {
    return (<NetworkError />)
  }


}

export default App

