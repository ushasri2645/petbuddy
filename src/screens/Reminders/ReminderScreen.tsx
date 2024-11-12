import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';

const Reminders = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>⏱ Reminders</Text>
        <Image style={styles.image}source={require('./../../../public/assets/Login/paw.png')}/>
      </View>
      <ScrollView></ScrollView>
      <TouchableOpacity style={styles.bottomSection}>
        <Text testID="+-icon" style={styles.add}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    margin:'5%',
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
  },
  topSection:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  reminderText:{
    fontSize:20,
    fontWeight:'800',
    color:'black'
  },
  add:{
    color:'white',
    fontWeight:'700',
    fontSize:25
  },
  bottomSection:{
    alignSelf:'flex-end',
    backgroundColor:'lightgreen',
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:10,
  },
  image:{
    height:25,
    width:25,
    resizeMode:'stretch',
    borderRadius:10
  }


});

export default Reminders;
