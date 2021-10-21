import React, { useEffect, useState } from 'react'
import { Router, store } from './config'
import { Provider } from 'react-redux'
import { useNetInfo } from "@react-native-community/netinfo";
import { NetworkError } from './containers/pages'
require('moment/locale/id.js');
const App = () => {

  const netInfo = useNetInfo();
  const [connection, setConnection] = useState(true);

  useEffect(() => {
    setConnection(netInfo.isConnected)
  })

  if (connection) {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  } else {
    return (<NetworkError />)
  }


}

export default App

