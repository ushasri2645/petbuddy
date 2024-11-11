import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './Navigation';
import {UserContextProvider} from './src/Context/Context';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <AppNavigator />
      </UserContextProvider>
    </NavigationContainer>
  );
}

export default App;
