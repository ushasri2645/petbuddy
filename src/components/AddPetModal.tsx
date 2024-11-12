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

const AddPetModal = ({visible, closeFn,username}: {visible: boolean; closeFn: any,username:string}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [remarks, setRemarks] = useState('');

 
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeFn}>
      <TouchableWithoutFeedback onPress={closeFn}>
        <View style={styles.container}>
          <Text style={styles.header}>Enter Pet Details</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require('./../../public/assets/Register/profile.png')}
            />
            <Text>Upload Profile Pic</Text>
          </View>
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
          </View>
          <TouchableOpacity onPress={()=>addPet()} style={styles.submit}>
            <Text style={styles.addPet}> Add pet</Text>
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
