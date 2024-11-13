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
import Profile from "./src/screens/Profile/ProfileScreen";
import GalleryScreen from "./src/screens/Gallery/GalleryScreen";
import { Image, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'forestgreen' }, 
      headerTintColor: '#fff',                   
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pet" component={PetScreen} />
      <Stack.Screen name="Activity" component={Activity}/>
      <Stack.Screen name="Reminders" component={Reminders}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Gallery" component={GalleryScreen}/>
    </Stack.Navigator>
  );
}

export function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
     screenOptions={({ route }) => ({       
        headerShown: false ,           
        tabBarIcon: ({ focused, color, size }) => {
            let iconSource;
            switch (route.name) {
                case 'Home':
                    iconSource = require('./public/assets/Tabs/homefilled.png')
                    break;
                case 'Services':
                    iconSource =  require('./public/assets/Tabs/services.jpg');
                    break;
                case 'Training':
                    iconSource = require('./public/assets/Tabs/traini.png')
                    break;
            }
            return (
                <View style={[focused ? { alignItems: 'center', backgroundColor:'darkgreen', width:50, borderRadius:10 }: { alignItems: 'center' }]}>
                    <Image
                        source={iconSource}
                        style={{ width: 30, height: 30, borderRadius:20 }}
                        resizeMode="cover"
                    />
                </View>
            );
        },
        tabBarLabel: route.name, 
        tabBarStyle: {
            backgroundColor: 'green', 
            height: 60,
            paddingBottom: 5,
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white', 
        },
      })}
    >
      <Tab.Screen name="Home" component={StackNavigator} options={{ headerShown: false }}/>
      <Tab.Screen name="Services" component={Services}  />
      <Tab.Screen name="Training" component={Training}  />
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

