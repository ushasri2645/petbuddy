import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {UserContext} from '../../Context/Context';
import {API_URL} from '../../../API';
import Pet from '../../components/PetTile';
import AddPetModal from '../../components/AddPetModal';

const Home = ({navigation}: {navigation: any}) => {
  const [pets, setPets] = useState([]);
  const userContext = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  if (!userContext) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }
  const {user} = userContext;
  if (!user) {
    return <Text>Something went wrong.</Text>;
  }
  const onHandleClose = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_URL}pets/${user.name}`);
        if (response.status === 200) {
          const data = await response.json();
          setPets(data);
        }
      } catch (e) {
        throw new Error(`${e}`);
      }
    };
    fetchPets();
  }, [user, onHandleClose]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <Text style={styles.headerName}>{user.name}</Text>,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('./../../../public/assets/Register/profile2.png')}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.pawEmoji}>🐾</Text>
        <Text style={styles.headerText}>My Pets</Text>
      </View>
      <View style={styles.middleSection}>
        <View></View>
        {pets.length === 0 ? (
          <View>
            <Text>No pets found</Text>
          </View>
        ) : (
          <ScrollView style={styles.petsDisplaySection}>
            {pets.map((pet, index) => (
              <Pet pet={pet} key={index} navigation={navigation} />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.addPet}>
          <Image
            style={styles.image}
            source={require('../../../public/assets/Login/paw.png')}
          />
          <Text
            style={styles.addPetText}
            onPress={() => setIsVisible(!isVisible)}>
            Add Pet
          </Text>
        </TouchableOpacity>
      </View>
      <AddPetModal
        visible={isVisible}
        closeFn={onHandleClose}
        username={user.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerName:{
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headerSection: {
    flex: 0.1,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    margin:'3%',
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
    flex: 0.1,
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
  addPetText: {
    color: 'white',
  },
  middleSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 20,
    margin: '2%',
  },
  petsDisplaySection: {
    flexDirection: 'column',
    alignContent: 'center',
    gap: 10,
  },
});

export default Home;
