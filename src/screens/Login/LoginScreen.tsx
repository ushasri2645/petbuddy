import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {API_URL} from '../../../API';

const Login = ({navigation}: {navigation: any}) => {
  const [name, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, password}),
      });

      if(response.status===200){
        navigation.replace("Home")
      }
      else if(response.status===404){
        Alert.alert("User Details not found")
      }
      else if(response.status===401){
        Alert.alert("Invalid Credentials")
      }
    } catch (e) {
      Alert.alert(`Something went wrong: ${e}`)
    }
    setUserName("");
    setpassword("");
  };
  return (
    <View style={styles.container}>
      <Image
        testID="top-image"
        source={require('../../../public/assets/Login/topbg.png')}
        style={styles.topImage}
      />
      <View style={styles.middleSection}>
        <View style={styles.imageAndTitle}>
          <Image
            testID="petbuddy-image"
            source={require('../../../public/assets/Login/paw.png')}
            style={styles.pawImg}
          />
          <View style={styles.petBuddyTitle}>
            <Text style={styles.petText}>Pet</Text>
            <Text style={styles.buddyText}>Buddy!</Text>
          </View>
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.inputElement}
            testID="username-input"
            value={name}
            onChangeText={text => setUserName(text)}
            placeholder="User name"
          />
          <TextInput
            style={styles.inputElement}
            value={password}
            testID="password-input"
            onChangeText={text => setpassword(text)}
            placeholder="Password"
          />
        </View>
        <View style={styles.loginSection}>
          <TouchableOpacity onPress ={handleLogin}style={styles.loginButton}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={styles.noAccountText}
            onPress={() => navigation.replace('Register')}>
            Don't have an account? Register
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.rightsText}>
          ©️All Rights Reserved to PetBuddy - 2024
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    backgroundColor: 'white',
  },
  topImage: {
    resizeMode: 'stretch',
    height: 100,
    width: 400,
  },
  pawImg: {
    borderRadius: 50,
    height: 90,
    width: 90,
  },
  middleSection: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 40,
  },
  petText: {
    color: 'forestgreen',
    fontWeight: 'bold',
    fontSize: 25,
  },
  buddyText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black'
  },
  petBuddyTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAndTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputElement: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 60,
    borderRadius: 10,
  },
  inputSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },
  loginButton: {
    backgroundColor: 'forestgreen',
    padding: 10,
    marginHorizontal: 80,
    borderRadius: 10,
  },
  loginSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAccountText: {
    color: 'green',
    textAlign: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightsText: {
    color: 'white',
    backgroundColor: 'green',
    paddingVertical: 20,
    width: Platform.OS === 'android' ? 500 : 400,
    textAlign: 'center',
  },
});

export default Login;
