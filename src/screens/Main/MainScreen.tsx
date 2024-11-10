import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

const Main = ({navigation}:{navigation:any}) => {
  return (
    <ImageBackground
      testID="image-background"
      source={require('../../../public/assets/Home/dog.png')}
      style={styles.container}
      >
      <View style={styles.bottomContainer}>
          <Text style={styles.welcomeHeading}>Hey! Welcome</Text>
          <Text style={styles.description}>While you sit and stay - we'll go out and play</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")}style={styles.getStartedButton}><Text style={styles.getStartedText}>Get Started</Text><Text  style={styles.getStartedText1}>➜</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-end'
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems:'center',
    gap:30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding:80
  },
  welcomeHeading:{
    color:Platform.OS === "android" ? 'black' : 'black',
    fontWeight:'bold',
    fontSize:25
  },
  description:{
    color:'gray',
    fontWeight:'bold',
    fontSize:Platform.OS === "android" ? 18 : 15,
    textAlign:'center',
  },
  getStartedButton:{
    backgroundColor:'forestgreen',
    borderRadius:10,
    padding:10,
    width:250,
    flexDirection:'row',
    paddingHorizontal:10
  },
  getStartedText:{
    flex:1,
    color:'white',
    fontWeight:'bold',
    textAlign:'center'
  },
  getStartedText1:{
    flexDirection:'row',
    justifyContent:'flex-end',
    color:'white',
    fontWeight:'bold'
  }
});

export default Main;
