import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import {API_URL} from '../../../API';

const Activity = ({route}: {route: any}) => {
  const {pet} = route.params;
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${API_URL}pets/activities/${pet.name}`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        Alert.alert('Failed to fetch');
      }
    } catch (e) {
      Alert.alert(`Something Went Wrong`);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);

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
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${period}`;
      return formattedTime;
    };
    return `${formatTime(startTimeString)} - ${formatTime(endTimeString)}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text testID="reminder-header" style={styles.reminderText}>
          ⏱ Activities
        </Text>
        {pet.image_uri ? (
          <Image testID="custom-image" style={styles.image} source={{uri: pet.image_uri}} />
        ) : (
          <Image testID='default-image'
            style={styles.image}
            source={require('./../../../public/assets/Login/paw.png')}
          />
        )}
      </View>
      <ScrollView style={styles.reminders}>
        {activities && activities.length > 0 ? (
          activities.map((activity: any, index: any) => (
            <View key={index} style={styles.reminderContent}>
              <View>
                <Text>🐾</Text>
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{activity.title}</Text>
                <Text>
                  {formatDate(activity.date)} -{' '}
                  {formatTimeRange(activity.startTime, activity.endTime)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.nodata}>
            <Text>No Activities found</Text>
          </View>
        )}
      </ScrollView>
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

export default Activity;
