import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {API_URL} from '../../API';
import { fetchAndScheduleReminders } from './Notifications';

const AddReminder = ({
  visible,
  pet,
  closeFn,
}: {
  visible: boolean;
  pet: any;
  closeFn: any;
}) => {
  const [activity, setActivity] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const options = ['Daily', 'Weekly', 'Monthly'];

  useEffect(() => {
    const handleFrequencySelect = (option: string) => {
      setFrequency(option);
      setShowDatePicker(option !== 'Daily');
    };
    handleFrequencySelect(frequency);
  }, [frequency]);

  const handleDateDone = () => {
    setShowDatePicker(false);
  };
  const handleStartTimeDone = () => {
    setShowStartTimePicker(false);
  };

  const handleEndTimeDone = () => {
    setShowEndTimePicker(false);
  };

  const handleAdd = async () => {
    try {
      const utcStartTime = new Date(startTime.getTime() - startTime.getTimezoneOffset() * 60000).toISOString();
      const utcEndTime = new Date(endTime.getTime() - endTime.getTimezoneOffset() * 60000).toISOString();
      const utcDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString();
  
      const response = await fetch(`${API_URL}pets/reminders/${pet.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: activity,
          startTime:utcStartTime,
          endTime:utcEndTime,
          type: frequency,
          petName: pet.name,
          date: utcDate,
        }),
      });
      if (response.status === 201) {
        console.log("sucess")
        fetchAndScheduleReminders()
        Alert.alert('Reminder created');
        setActivity('');
        setFrequency('Daily');
        closeFn();
      } else {
        Alert.alert('Something went wrong.');
      }
    } catch (e) {
      Alert.alert(`Unable to add reminder : ${e}`);
    }
  };

  const formattedStartTime = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedEndTime = endTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeFn}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <View style={styles.titleHeader}>
              <Text testID="add-reminder-text" style={styles.header}>Add Reminder</Text>
              <Text onPress={closeFn} style={styles.close}>
                X
              </Text>
            </View>
            <Text style={styles.label}>Select Frequency:</Text>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.radioButtonContainer}
                onPress={() => setFrequency(option)}>
                <View style={styles.viewText}>
                  <View
                  testID={`${option}-type`}
                    style={[
                      styles.radioButton,
                      frequency === option && styles.radioButtonSelected,
                    ]}
                  />
                  <Text style={styles.radioText}>{option}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <Text style={styles.datePickerLabel}>
                  Select Date for {frequency} Reminder
                </Text>
                <DatePicker
                  date={selectedDate}
                  mode="date"
                  onDateChange={setSelectedDate}
                  style={styles.datePicker}
                  fadeToColor="white"
                  testID='date-picker'
                />
                <TouchableOpacity
                  onPress={handleDateDone}
                  style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text testID="selected-date"style={styles.selectedDate}>
              Selected Date: {selectedDate.toLocaleDateString()}
            </Text>
            <TextInput
              style={styles.activityInput}
              value={activity}
              testID='activity-input'
              onChangeText={setActivity}
              placeholder="Enter Activity"
              placeholderTextColor="#b2b2b2"
            />

            <Text testID="start-time" style={styles.label}>Start Time:</Text>
            <TouchableOpacity
            testID='select-start-time'
              onPress={() => setShowStartTimePicker(!showStartTimePicker)}
              style={styles.timeContainer}>
              <Text style={styles.timeText}>{formattedStartTime}</Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <TouchableOpacity testID='start-time-picker'>
                <DatePicker
                  date={startTime}
                  onDateChange={setStartTime}
                  mode="time"
                  textColor="black"
                  fadeToColor="white"
                  style={styles.datePicker}
                  is24hourSource="locale"
                  
                />
                <TouchableOpacity
                testID="startTimeDone"
                  onPress={handleStartTimeDone}
                  style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}

            <Text testID='end-time'style={styles.label}>End Time:</Text>
            <TouchableOpacity
            testID='select-end-time'
              onPress={() => setShowEndTimePicker(!showEndTimePicker)}
              style={styles.timeContainer}>
              <Text style={styles.timeText}>{formattedEndTime}</Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <TouchableOpacity testID='end-time-picker'>
                <DatePicker
                  date={endTime}
                  onDateChange={setEndTime}
                  mode="time"
                  textColor="black"
                  fadeToColor="white"
                  style={styles.datePicker}
                  is24hourSource="locale"
                />
                <TouchableOpacity
                testID='endTimeDone'
                  onPress={handleEndTimeDone}
                  style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}

            <TouchableOpacity testID="add-button" onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 400,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 20,
  },
  content: {
    paddingVertical: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  close: {
    fontSize: 18,
    color: '#888',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#388e3c',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  viewText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#388e3c',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#388e3c',
  },
  radioText: {
    fontSize: 15,
    color: '#388e3c',
  },
  datePickerContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  datePickerLabel: {
    color: '#388e3c',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedDate: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    marginVertical: 5,
  },
  activityInput: {
    borderBottomWidth: 1,
    borderColor: '#b2b2b2',
    paddingVertical: 8,
    marginTop: 15,
    color: '#388e3c',
    fontSize: 15,
  },
  timeContainer: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  timeText: {
    color: '#388e3c',
    fontSize: 16,
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#388e3c',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  datePicker: {
    width: 300,
    backgroundColor: '#E0F2E9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#006400',
  },
  doneButton: {
    backgroundColor: '#32CD32',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 90,
    marginTop: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddReminder;
