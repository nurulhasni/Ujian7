import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image,View, Button,ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker'
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'react-native-image-picker'
import database from '@react-native-firebase/database';



export default class Izin extends Component {

    constructor(props){
    super(props);
        this.state = {
            kategori : '',
            hal: '',
            date : new Date(),
            fileImage :null,
            uri : '',
            tanggalawal: '',
            tanggalakhir : '',
            ketertangan : ''

        }
    }







    requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );
  };

  captureCamera = () =>
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );
    

    kirimdata = () => {
    database()
      .ref('users/')
      .push({
        kategori: this.state.kategori,
        tanggalawal: this.state.date,
        tanggalakhir: this.state.date,
        hal: this.state.hal,
        ketertangan: this.state.keterangan,
        uri: this.state.uri,
      })
      .then((data) => {
        
        Alert.alert('Sukses', 'Mengirim Data');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };




    render() {
        return (
           
           <View style={styles.container}>
            <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%'}}
              keyboardShouldPersistTaps="always">
              <Text style={{fontSize : 15, marginBottom:10, marginTop:10,}}>Kategori</Text>
              <Picker
                selectedValue={this.state.kategori}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ kategori: itemValue })
                }>
                <Picker.Item label="Pilih Kategori" value=" " color="#aaaaaa"/>
                <Picker.Item label="Izin Bencana" value="bencana" />
                <Picker.Item label="Izin Sakit" value="sakit" />   
                <Picker.Item label="Izin Anak Sakit" value="anaksakit" />   
              </Picker>
              <Text style={{fontSize : 15, marginBottom:10, marginTop:10,}}>Dari Tanggal</Text>
              <DatePicker
                style={styles.datePickerStyle}
               placeholder="select date"
               date = {this.state.date} onDateChange={(date) =>this.setState({date})}/>
               <Text style={{fontSize : 15, marginBottom:10, marginTop:10,}}>Sampai Tanggal</Text>
              <DatePicker
                style={styles.datePickerStyle}
               placeholder="select date"
               date = {this.state.date} onDateChange={(date) =>this.setState({date})}/>
                    <Text style={{fontSize : 15, marginBottom:10, marginTop:10,}}>Perihal</Text>
                <TextInput
                    placeholder="Perihal" 
                    style={styles.input} 
                    value={this.state.hal}
                    onChangeText={hal=> this.setState({hal})}/>
                <Text style={{fontSize : 15, marginBottom:10, marginTop:10,}}>Keterangan</Text>
              <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onChange}
              defaultValue={this.state.text}
              maxLength={120}
              placeholder='Keterangan'
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              onChangeText={keterangan => this.setState({keterangan})}/>


            {/* <View style={{flexDirection: 'row', flexWrap: 'wrap', width:'100%', height:'85%', padding:5}}>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.inner} >
                            
                            <Text>History</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.inner} >
                            
                            <Text>History</Text>
                        </TouchableOpacity>
                </View>
               



            </View> */}

            <View style={{justifyContent: 'center', alignItems: 'center', padding:5}}>
            <Image source={this.state.fileImage} />
          </View>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={this.captureCamera}>
            <Text style={styles.buttonTitle}>Ambil Gambar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={this.pickImage}>
            <Text style={styles.buttonTitle}>Pilih Galeri</Text>
          </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress={this.kirimdata} >
                     <Text style={styles.buttonText}>Kirim</Text>
              </TouchableOpacity>
                


        
            </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
       flex : 1,
        padding : 20
    },
       input:{
        height:40,
        backgroundColor: '#F5FCFF',
        paddingLeft:10,
        marginBottom:15,
        borderRadius:5,
        fontSize:15,
        
    
    },
    datePickerStyle: {
    height:40,
        backgroundColor: '#F5FCFF',
        paddingLeft:10,
        marginBottom:15,
        borderRadius:5,
        width: 350
  },
   textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
   buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    buttonContainer:{
        backgroundColor:'#3B3B98',
        padding:15,
        borderRadius:8,
        marginTop:15,
    },

     box: {
        width:'40%',
        height:'10%',
        padding: 5,
    } ,
    inner: {
        flex : 2,
        backgroundColor : '#eee',
        alignItems: 'center',
        justifyContent: 'center'

    }

})



