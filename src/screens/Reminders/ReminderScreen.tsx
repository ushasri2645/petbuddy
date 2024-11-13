import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ViewBase} from 'react-native';
import AddreminderModal from '../../components/AddreminderModal';

const Reminders = ({route}:{route:any}) => {
  const {pet} = route.params
  const [isVisible, setIsVisible] = useState(false);
  const onHandleClose=()=>{setIsVisible(false)}

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>⏱ Reminders</Text>
        <Image style={styles.image}source={require('./../../../public/assets/Login/paw.png')}/>
      </View>
      <ScrollView></ScrollView>
      <TouchableOpacity style={styles.bottomSection}>
        <Text onPress={()=>setIsVisible(!isVisible)} testID="+-icon" style={styles.add}>+</Text>
      </TouchableOpacity>
      <AddreminderModal visible={isVisible} closeFn={onHandleClose} pet={pet}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
