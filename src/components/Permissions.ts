import {Alert, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const requestPhotoLibraryPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permissionStatus === RESULTS.DENIED || permissionStatus === RESULTS.LIMITED) {
        const requestStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (requestStatus !== RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Photo Library access is required.');
          return false;
        }
      }
    } else{
      const permissionStatus = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (permissionStatus === RESULTS.DENIED || RESULTS.BLOCKED) {
        const requestStatus = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES); 
        if (requestStatus !== RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Photo Library access is required.');
          return false;
        }
      }
    }
    return true; 
  } catch (e) {
    Alert.alert('Error', 'An error occurred while checking Photo Library permission.');
    return false;
  }
};

export const requestCallPermission = async () => {
  try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.CALL_PHONE);
      if (permissionStatus === RESULTS.DENIED) {
        const requestStatus = await request(PERMISSIONS.ANDROID.CALL_PHONE);
        if (requestStatus !== RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Call access is required.');
          return false;
        }
      }
    return true;
  } catch (e) {
    Alert.alert('Error', 'An error occurred while checking Call permission.');
    return false;
  }
};
