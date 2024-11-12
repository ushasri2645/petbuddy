import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const Track = ({
  navigation,
  visible,
  closeFn,
  pet: any,
}: {
  navigation: any;
  visible: boolean;
  closeFn: any;
  pet: any;
}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeFn}>
      <TouchableWithoutFeedback onPress={closeFn}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.type}>
              <Text style={styles.text}>Activity</Text>
              <Text>{'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.type}>
              <Text style={styles.text}>Reminders</Text>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: '35%',
  },
  subContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
  },
  type: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
  },
});

export default Track;
