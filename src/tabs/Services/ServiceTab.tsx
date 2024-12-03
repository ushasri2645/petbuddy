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
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        let data: any = [];
        if (response.status === 200) {
          data = await response.json();
          const res= data[0][current]
          if(!collapse){
            setServices(res.slice(0,2));
          }
          else{
            setServices(res)
          }
          
        } else {
          Alert.alert('Data not fetched');
        }
      } catch (e) {
        Alert.alert('ERROR FETCHING SERVICES');
      }
    };
    fetchServices();
  }, [current,collapse]);

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
              style={[current==='veternity' ? styles.selectedImage :styles.image]}
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
              style={[current==='boarding' ? styles.selectedImage :styles.image]}
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
              style={[current==='grooming' ? styles.selectedImage :styles.image]}
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
              style={[current==='training' ? styles.selectedImage :styles.image]}
              source={require('./../../../public/assets/Services/training.png')}
            />
            <Text style={[current === 'training' && styles.greenText]}>
              Training
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.nearbyHeadingSection}>
          <Text style={styles.nearByHeading}>
            Nearby {current === 'veternity' && 'Veterinarian'}
            {current === 'grooming' && 'Groomers'}
            {current === 'boarding' && 'Boardings'}
            {current === 'training' && 'Trainers'}
          </Text>
          <Text  onPress={()=>setCollapse(!collapse)} style={styles.seeAllText}>{!collapse? "See all " : "Collapse"}</Text>
        </View>
        <View style={styles.displaySection}>
          <ScrollView>
            {services.map((service,index) => (
              <Tile key={index} service={service} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center', 
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  topSection: {
    width: '90%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  topHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center', 
    color: '#333',
  },
  typesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  selectedImage:{
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'forestgreen'
 },
  greenText: {
    color: 'green',
    marginTop: 8,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 1, 
    width: '100%', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nearbyHeadingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  nearByHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007bff', 
    fontWeight: 'bold',
  },
  displaySection: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});


export default Services;
