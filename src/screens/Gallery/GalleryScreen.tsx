import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {requestPhotoLibraryPermission} from '../../components/Permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import {API_URL} from '../../../API';

const GalleryScreen = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [photo, setPhoto] = useState('');
  const [gallery, setGallery] = useState([]);

  const updatePic = async (path:string) => {
    if (path) {
      try {
        const response = await fetch(`${API_URL}pets/gallery/${pet.name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"path": path}),
        });
        console.log(response);
        if (response.status === 200) {
          Alert.alert('Pic uploaded succesffully');
          fetchImages();
        } else {
          Alert.alert('Something went wrong, Try again later');
        }
      } catch (e) {
        Alert.alert(`${e}`);
      }
    }
  };

  const fetchImages = async () => {
    try {
      const resposne = await fetch(`${API_URL}pets/gallery/${pet.name}`);
      if (resposne.status === 200) {
        const data = await resposne.json();
        setGallery(data);
        console.log(data);
      }
    } catch (e: any) {
      console.log(`Error fetching images:${e}`);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
            updatePic(`data:image/jpeg;base64,${base64Image}`);
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

  const renderImage = ({item}: {item: string}) => (
    <Image style={styles.image} source={{uri: item}} />
  );

  return (
    <View style={styles.container}>
      {gallery && gallery.length > 0 ? (
        <FlatList
          data={gallery}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.imageContainer}
        />
      ) : (
        <Text>No Images Found. Please Add</Text>
      )}

      <TouchableOpacity  style={styles.button} onPress={() => handleImage()}>
        <Text style={styles.buttonText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
    margin: 10,
    borderRadius: 10,
  },
  scroll: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'forestgreen',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GalleryScreen;
