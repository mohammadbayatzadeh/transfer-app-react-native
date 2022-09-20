import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

//services
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as Json from './package.json';
import {REACT_APP_URL} from '@env';

//components
import Main from './screens/Navigators/Main';
import {GeneralStatusBar} from './components/GeneralStatusBar';
import {navigationRef} from './RootNavigation';
import {ModalMessage} from './components/ModalMessage';

const App = () => {
  const [error, setError] = React.useState('Please Update your application');
  const [visible, setVisible] = React.useState(false);

  const ReactNative = require('react-native');
  try {
    ReactNative.I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }

  NetInfo.addEventListener(networkState => {
    networkState.isConnected &&
      axios
        .get(`${REACT_APP_URL}/advertise`)
        .then(value => {
          if (value.data.version !== Json.version) {
            setVisible(true);
          }
        })
        .catch(err => console.log(err));
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <GeneralStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
        func={() => null}
      />
      <Main />
    </NavigationContainer>
  );
};

export default App;
