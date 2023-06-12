import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView,StatusBar } from 'react-native';

//Les elements de notre Redux
import { Provider } from 'react-redux'
import { Store } from './redux/store';

import Navigation from './Navigation';

const App = () => {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="rgba(63,67,89,1)"
            barStyle="light-content"
            hidden={false}
          />
          <Navigation />
        </NavigationContainer>
      </Provider>
    );
}

export default App;
