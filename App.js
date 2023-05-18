import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Les elements de notre Redux
import { Provider } from 'react-redux'
import { Store } from './redux/store';

import Navigation from './Navigation';

const App = () => {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    );
}

export default App;
