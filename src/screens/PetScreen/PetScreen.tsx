import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';

const PetScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {pet} = route.params;
  const CustomBackButton = () => (
    <TouchableOpacity
        testID="back-button"
        onPress={() => navigation.goBack()}
      style={{
        padding: 4,
        backgroundColor: 'green',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Text  style={{fontSize: 18, color: 'white'}}>{'<'}</Text>
    </TouchableOpacity>
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => <CustomBackButton />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          testID="dog-image"
          style={styles.dogImage}
          source={require('./../../../public/assets/Home/dog.png')}></ImageBackground>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.topDisplay}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.gender}>
            <View>
              <Text style={styles.breed}>{pet.breed}</Text>
              <Text style={styles.phn}>+{91123456789}</Text>
            </View>
            <View style={styles.genderDisplay}>
                <Text >{pet.gender==="Male"?"♂":"♀"}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.about}>🐾About {pet.name}</Text>
          <View style={styles.petinfo}>
            <TouchableOpacity style={styles.info}>
              <Text>Age</Text>
              <Text style={styles.value}>{pet.age}y</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Weight</Text>
              <Text style={styles.value}>{pet.weight}kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Height</Text>
              <Text style={styles.value}>{pet.height}cm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info}>
              <Text>Color</Text>
              <Text style={styles.value}>{pet.color}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.remark}>
          <Text style={styles.remarkText}>Remarks</Text>
          <Text>{pet.remarks}</Text>
        </View>
        <TouchableOpacity style={styles.gallery}>
          <Text style={styles.galleryText}>{'Gallery    >'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.track}>
          <Text style={styles.trackText}>Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dogImage: {
    width: Platform.OS==="android" ?500 : 400,
    height: Platform.OS==="android" ?500 : 400,
    resizeMode: 'contain',
  },
  topSection:{
    flex:1
  },
  bottomSection: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  topDisplay: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
    marginHorizontal: '10%',
    borderRadius: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  breed: {
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  phn: {
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  about: {
    marginLeft: '5%',
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'gray',
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  petinfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '3%',
  },
  value: {
    fontWeight: '900',
    textAlign: 'center',
    color: '#054B1D',
  },
  remark: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 5,
  },
  remarkText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  gallery: {
    flexDirection: 'column',
    marginLeft: '5%',
    marginRight: '70%',
    marginTop: 10,
    justifyContent: 'flex-start',
    gap: 5,
    padding: 10,
    backgroundColor: 'forestgreen',
    borderRadius: 10,
  },
  galleryText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  track: {
    backgroundColor: 'green',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  trackText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  gender:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  genderDisplay:{
    color:'white',
    backgroundColor:'pink',
    borderRadius:10,
    fontSize:20,
    alignSelf:'center',
    padding:8

  }
});

export default PetScreen;
