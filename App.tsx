import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './Navigation';
import {UserContextProvider} from './src/Context/Context';
import {fetchAndScheduleReminders, setupNotificationChannel } from './src/components/Notifications';

function App(): React.JSX.Element {
  useEffect(()=>{
    // setupNotificationChannel(),
    fetchAndScheduleReminders();
  },[])
  return (
    <NavigationContainer>
      <UserContextProvider>
        <AppNavigator />
      </UserContextProvider>
    </NavigationContainer>
  );
}

export default App;
