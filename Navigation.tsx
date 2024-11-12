import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./src/screens/Main/MainScreen";
import Login from "./src/screens/Login/LoginScreen";
import Register from "./src/screens/Register/RegisterScreen";
import Home from "./src/screens/Home/HomeScreen";
import Services from "./src/tabs/Services/ServiceTab";
import Training from "./src/tabs/Training/TrainingTab";
import Activity from "./src/screens/Activity/ActivityScreen";
import Reminders from "./src/screens/Reminders/ReminderScreen";
import PetScreen from "./src/screens/PetScreen/PetScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pet" component={PetScreen} />
      <Stack.Screen name="Activity" component={Activity}/>
      <Stack.Screen name="Reminders" component={Reminders}/>
    </Stack.Navigator>
  );
}

export function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
    >
      <Tab.Screen name="Home" component={StackNavigator} options={{ headerShown: false }}/>
      <Tab.Screen name="Services" component={Services}  />
      <Tab.Screen name="Taining" component={Training}  />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
/>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
/>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

