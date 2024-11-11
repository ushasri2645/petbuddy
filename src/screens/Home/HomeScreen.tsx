import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Home = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.pawEmoji}>🐾</Text>
        <Text style={styles.headerText}>My Pets</Text>
      </View>
      <View style={styles.middleSection}></View>
      <View style={styles.bottomSection}>
        <View style={styles.addPet}>
          <Image
            style={styles.image}
            source={require('../../../public/assets/Login/paw.png')}
          />
          <Text style={styles.addPetText}>Add Pet</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headerSection: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    width: '95%',
    height: '7%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 22,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pawEmoji: {
    color: 'black',
    fontSize: 20,
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    alignSelf: 'flex-end',
    height: '20%',
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  addPet: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    gap: 10,
    alignItems: 'center',
    
  },
  addPetText:{
    color:'white'
  },
  middleSection:{

  }
});

export default Home;
