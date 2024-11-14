import React from 'react';
import {StyleSheet, ImageBackground } from 'react-native';

const Loader = () => {
  return (
    <ImageBackground testID="bg-image" style={styles.container} source={require('./../../../public/assets/Loading/loading.jpg')}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;