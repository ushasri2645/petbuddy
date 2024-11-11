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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 10,
    width: 270,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 3,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  desig: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 12,
  },
  ratings: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  topBottomSection: {
    flexDirection: 'row',
  },
  star: {
    color: 'orange',
  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    marginTop: 5,
  },
  experience: {
    color: 'gray',
    fontSize: 13,
  },
  distance: {
    color: 'gray',
    fontSize: 13,
  },
  minFee: {
    color: 'gray',
    fontSize: 13,
  },
  bottomPage: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottomText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default Tile;
