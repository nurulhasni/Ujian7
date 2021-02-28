/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation'
import database from '@react-native-firebase/database';
import moment from 'moment';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
  super(props)
   this.state = {
    fd: true,
    lati : '',
    long : '',
    date : moment().format('MMMM Do YYYY, h:mm:ss a'),
    masuk : ''
   }
  }

  

    componentDidMount() {
    if(this.hasLocationPermission){
     Geolocation.getCurrentPosition(
      (info) => {
      const {coords} = info;

    
      this.setState({
      lati : info.coords.latitude,
      long : info.coords.longitude,
      masuk : this.state.date
      })


      database()
      .ref('hadir/')
      .push({
        
        lati : this.state.lati,
        long: this.state.long,
        masuk: this.state.date,
        
      })
      .then((data) => {
        
        Alert.alert('Sukses', 'Mengirim Data');
      })
      .catch((error) => {
        console.log('error', error);
      });
            
    },
      (error) => console.log(error),
     {
       enableHighAccuracy: false,
       timeout: 2000,
       maximumAge: 3600000,
      },
      );
     }
    } 
 
 
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          type={RNCamera.Constants.Type.front}
          style={StyleSheet.absoluteFill}
          faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          onFacesDetected={face => {
            if(this.state.fd) {
              this.setState({ fd: face.faces.length === 0 });
              this.props.navigation.navigate('Dashboard');
              Alert.alert("Sukses",`titik geolocation anda ` + this.state.lati + ' dan '+ this.state.long + this.state.masuk);
            }
          }}
        />
      </View>
    );
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});