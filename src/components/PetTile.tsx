import React from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';

const Pet = ({pet,navigation}:{pet:any,navigation:any}) => {
  return (
    <TouchableOpacity testID="pet-details" style={styles.container} onPress={()=>navigation.navigate('Pet',{pet})}>
        <View style={styles.leftView}>
            <Image testID="pet-image" style={styles.petImage} source={require('../../public/assets/Home/dog.png')}/>
      </View>
      <View style={styles.rightView}>
            <Text style={styles.petName}>
                {pet.name}
            </Text>
            <Text style={styles.petName}>
                {pet.breed}
            </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
    padding:10,
  },
  leftView:{

  },
  rightView:{
    width:'50%',
    height:'60%',
    flexDirection:'column',
    justifyContent:'center',
    gap:20,
    backgroundColor:'white',
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    padding:10
  },
  petImage:{
    height:180,
    width:140,
    resizeMode:'cover',
    borderRadius:10,
  },
  petName:{
    color:'black',
    fontSize:20,
    fontWeight:'bold'
  }

});

export default Pet;