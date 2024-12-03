import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const stars = (n: number) => {
  let i = 0;
  let s = '';
  for (i = 0; i < n; i++) {
    s += '⭑';
  }
  for (i = n; i <= 5; i++) {
    s += '⭒';
  }
  return s;
};
const Tile = ({service}: {service: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image testID="service-image" style={styles.image} source={{uri: service.image_uri}} />
        <View style={styles.details}>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.desig}>{service.designation}</Text>
          <View style={styles.topBottomSection}>
            <View>
              <Text style={styles.star}>{stars(service.ratings)}</Text>
            </View>
            <Text style={styles.ratings}>{service.ratings}</Text>
            <Text style={styles.ratings}>
              {' '}
              {`{${service.no_of_reviews} reviews}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.experience}>
          {service.experience} years of experience
        </Text>
        <Text style={styles.distance}>
          📌
          {service.distance} k.m
        </Text>
        <Text style={styles.minFee}>💴{service.min_fee}₹</Text>
      </View>
      {service.startDay && (
        <View style={styles.bottomPage}>
          <Text
            style={
              styles.bottomText
            }>{`${service.startDay} -  ${service.endDay} at ${service.startTime} - ${service.endTime} `}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff', 
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  desig: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  topBottomSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    gap: 5,
  },
  star: {
    fontSize: 18,
    color: '#ffcc00', 
  },
  ratings: {
    fontSize: 12,
    color: '#888',
  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     marginVertical: 10,
  },
  experience: {
    fontSize: 14,
    color: '#555',
  },
  distance: {
    fontSize: 14,
    color: '#555',
  },
  minFee: {
    fontSize: 14,
    color: '#555',
  },
  bottomPage: {
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
  },
  bottomText: {
    fontSize: 12,
    color: '#888',
  },
});


export default Tile;
