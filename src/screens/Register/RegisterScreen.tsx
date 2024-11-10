import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Register = ({navigation}:{navigation:any}) => {
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
            source={require('../../../public/assets/Register/profile.png')}
            style={styles.pawImg}
          />
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.inputElement}
            testID="username-input"
            placeholder="User name"
          />
          <TextInput
            style={styles.inputElement}
            testID="password-input"
            placeholder="Password"
          />
          <TextInput
            style={styles.inputElement}
            testID="confirm-password-input"
            placeholder="Confirm Password"
          />
           <TextInput
            style={styles.inputElement}
            testID="email"
            placeholder="Email"
          />
          <TextInput
            style={styles.inputElement}
            testID="contact"
            placeholder="Contact"
          />
          <TextInput
            style={styles.inputElement}
            testID="about-me"
            placeholder="About you"
          />
          <TextInput
            style={styles.inputElement}
            testID="address"
            placeholder="Adress"
          />
        </View>
        <View style={styles.loginSection}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>
          <Text style={styles.noAccountText} onPress={() => navigation.replace("Login")}>
            Already have an account? Login
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.petBuddyTitle}>
          <Text style={styles.petText}>Pet</Text>
          <Text style={styles.buddyText}>Buddy!</Text>
        </View>
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
    width:  400,
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
    // alignItems: 'center',
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

export default Register;
