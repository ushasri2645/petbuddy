import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = ({navigation}:{navigation:any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.pawEmoji}>🐾</Text>
        <Text style={styles.headerText}>My Pets</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:10,
    alignItems: 'center',
  },
  headerText:{
    fontSize:20,
    color:'black',
    fontWeight:'bold'
  },
  headerSection:{
    flexDirection:'row',
    gap:10,
    backgroundColor:'white',
    width:'95%',
    height:'7%',
    alignItems:'center',
    padding:10,
    borderRadius:22,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation:4

  },
  pawEmoji:{
    color:'black',
    fontSize:20
  }
});

export default Home;