import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AddreminderModal from '../../components/AddreminderModal';
import {API_URL} from '../../../API';

const Reminders = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [current, setCurrent] = useState<'Daily' | 'Weekly' | 'Monthly'>(
    'Daily',
  );
  const onHandleClose = () => {
    setIsVisible(false);
  };

  function formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();
    return `On ${day} ${month} ${year}`;
  }

  function formatTimeRange(startTimeString: any, endTimeString: any): string {
    const formatTime = (dateString: string) => {
      const date = new Date(dateString);
      const hours = date.getUTCHours(); 
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');; 
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;

      return formattedTime;
    };

    return `${formatTime(startTimeString)} - ${formatTime(endTimeString)}`;
  }

  const fetchReminders = async () => {
    try {
      const response = await fetch(`${API_URL}pets/reminders/${pet.name}`);
      if (response.status === 200) {
        const data = await response.json();
        const finaldata = data.filter((item: any) => item.type === current);
        setReminders(finaldata);
      } 
    } catch (e) {
      console.log('Error fetching data');
    }
  };
  useEffect(() => {
    fetchReminders();
  }, [current, onHandleClose]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>
          ⏱ Reminders
        </Text>
        {pet.image_uri ? (
          <Image style={styles.image} source={{uri: pet.image_uri}} />
        ) : (
          <Image
            style={styles.image}
            source={require('./../../../public/assets/Login/paw.png')}
          />
        )}
      </View>
      <View style={styles.typesDisplay}>
        <TouchableOpacity
        testID="daily-type" 
          style={current === 'Daily' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Daily')}>
          <Text>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
        testID="weekly-type" 
          style={current === 'Weekly' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Weekly')}>
          <Text>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
         testID="monthly-type" style={current === 'Monthly' ? styles.selectedType : styles.type}
          onPress={() => setCurrent('Monthly')}>
          <Text>Monthly</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.reminders}>
        {reminders && reminders.length > 0 ? (
          reminders.map((reminder: any, index: any) => (
            <View key={index} style={styles.reminderContent}>
              <View>
                <Text>🐾</Text>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text>
                  {formatDate(reminder.date)} -{' '}
                  {formatTimeRange(reminder.startTime, reminder.endTime)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.nodata}>
            <Text>No reminders found: Try adding</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.bottomSection}>
        <Text
          onPress={() => setIsVisible(!isVisible)}
          testID="+-icon"
          style={styles.add}>
          +
        </Text>
      </TouchableOpacity>
      <AddreminderModal visible={isVisible} closeFn={onHandleClose} pet={pet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reminderText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  add: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
  },
  bottomSection: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  typesDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  type: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
  },
  reminders: {
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  reminderContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  nodata: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  reminderTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedType: {
    padding: 10,
    backgroundColor: 'forestgreen',
    borderRadius: 10,
  },
});

export default Reminders;
