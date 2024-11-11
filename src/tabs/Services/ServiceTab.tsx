import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {API_URL} from '../../../API';
import Tile from '../../components/Tile';

const Services = () => {
  const [current, setCurrent] = useState<
    'veternity' | 'grooming' | 'training' | 'boarding'
  >('veternity');
  const [services, setServices] = useState([]);
  const [collapse, setCollapse] = useState(false)
  

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.topHeading}>Hello, How may I help you?</Text>
        <View style={styles.typesSection}>
          <TouchableOpacity
            style={styles.type}
            onPress={() => setCurrent('veternity')}>
            <Image
              testID="vaternity-image"
              style={styles.image}
              source={require('./../../../public/assets/Services/veternity.png')}
            />
            <Text style={[current === 'veternity' && styles.greenText]}>
              Veternity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.type}
            onPress={() => setCurrent('boarding')}>
            <Image
              style={styles.image}
              source={require('./../../../public/assets/Services/boarding.png')}
            />
            <Text style={[current === 'boarding' && styles.greenText]}>
              Baording
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.type}
            onPress={() => setCurrent('grooming')}>
            <Image
              style={styles.image}
              source={require('./../../../public/assets/Services/grooming.png')}
            />
            <Text style={[current === 'grooming' && styles.greenText]}>
              Grooming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.type}
            onPress={() => setCurrent('training')}>
            <Image
              style={styles.image}
              source={require('./../../../public/assets/Services/training.png')}
            />
            <Text style={[current === 'training' && styles.greenText]}>
              Training
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topSection: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  topHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  typesSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  type: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  greenText: {
    color: 'green',
  },
  bottomSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 20,
  },
  nearbyHeadingSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  nearByHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'gray',
    // fontSize:20
  },
  displaySection:{
    flexDirection:'column',
    justifyContent:'flex-start',
    gap:40
  }
});

export default Services;
