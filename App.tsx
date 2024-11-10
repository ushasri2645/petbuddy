import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from './Navigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
       <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
