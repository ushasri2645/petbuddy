import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { API_URL } from '../../API';
import { requestPhotoLibraryPermission } from './Permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

const AddPetModal = ({visible, closeFn,username}: {visible: boolean; closeFn: any,username:string}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [remarks, setRemarks] = useState('');
  const [photo,setPhoto] = useState('');
  const [emergencyContact,setEmergencyContact] = useState('')
 

  const handleImage = async () => {
    try {
      if (await requestPhotoLibraryPermission()) {
        ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(async image => {
            const source = image.path;
            const base64Image = await RNFS.readFile(source, 'base64');
            setPhoto(`data:image/jpeg;base64,${base64Image}`);
          })
          .catch(error => {
            if (error.code === 'E_PICKER_CANCELLED') {
              console.log('User cancelled image picker');
            } else {
              console.log('Error: ', error.message);
            }
          });
      } else {
        Alert.alert('Permission Not Granted');
      }
    } catch (Error: any) {}
  };

  const addPet = async() => {
    try{
        const petDetails = {
            name,breed,gender,age,weight,height,color,remarks,image_uri:photo,emergencyContact
        }
        const response = await fetch(`${API_URL}pets/${username}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(petDetails),
        })
        if (response.status === 404) {
            Alert.alert("User Not Found")
        }
        if(response.status===201){
            Alert.alert("Pet added succesfully");
            closeFn();
        }
    }
    catch(e){
        Alert.alert(`${e}`)
    }
    setName('');
    setAge('');
    setGender('');
    setColor('');
    setHeight('');
    setWeight('');
    setBreed('');
    setRemarks('');
    setEmergencyContact('');
  }
  
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeFn}>
      <TouchableWithoutFeedback onPress={closeFn}>
        <View style={styles.container}>
          <Text style={styles.header}>Enter Pet Details</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={()=>handleImage()}>
            {!photo?
            <Image
              style={styles.profileImage}
              source={require('./../../public/assets/Register/profile.png')}
            />:<Image style={styles.profileImage} source={{uri:photo}} />}
            <Text>Upload Profile Pic</Text>
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.inputElement}
                testID="name-input"
                placeholder="Pet Name"
                value={name}
                onChangeText={text => setName(text)}
              />
              <TextInput
                style={styles.inputElement}
                testID="breed-input"
                placeholder="Breed"
                value={breed}
                onChangeText={text => setBreed(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.inputElement}
                testID="age-input"
                placeholder="Age"
                value={age}
                onChangeText={text => setAge(text)}
              />
              <TextInput
                style={styles.inputElement}
                testID="height-input"
                placeholder="Height"
                value={height}
                onChangeText={text => setHeight(text)}
              />
            </View>

            <View style={styles.inputSection}>
              <TextInput
                style={styles.inputElement}
                testID="weight-input"
                placeholder="Weight"
                value={weight}
                onChangeText={text => setWeight(text)}
              />
              <TextInput
                style={styles.inputElement}
                testID="color-input"
                placeholder="Colour"
                value={color}
                onChangeText={text => setColor(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <View style={styles.radioContainer}>
                {['Male', 'Female'].map(option => (
                  <TouchableOpacity
                    key={option}
                    testID={`gender-input-${option}`}
                    style={styles.radioButtonContainer}
                    onPress={() => setGender(option)}>
                    <View
                      style={[
                        styles.radioButton,
                        gender === option && styles.radioButtonSelected,
                      ]}
                    />
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.inputElement}
                testID="remarks-input"
                placeholder="Remarks(Optional)"
                multiline={true}
                value={remarks}
                onChangeText={text => setRemarks(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.inputElement}
                testID="contact-input"
                placeholder="Contact"
                value={emergencyContact}
                onChangeText={text => setEmergencyContact(text)}
              />
            </View>
          </View>
          <TouchableOpacity testID='add-pet' onPress={()=>addPet()} style={styles.submit}>
            <Text style={styles.addPet}>Add pet</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 40,
    alignItems: 'center',
    marginVertical: '40%',
    marginHorizontal: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  profileImage: {
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  inputElement: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    width: '40%',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 2,
  },
  radioButtonSelected: {
    backgroundColor: 'gray',
  },
  radioText: {
    fontSize: 16,
    color: 'gray',
    marginRight: 9,
  },
  addPet: {
    color: 'black',
    fontWeight: 'bold',
  },
  submit: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 10,
  },
});

export default AddPetModal;
