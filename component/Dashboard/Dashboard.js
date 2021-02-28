import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Image, Alert} from 'react-native';
import Header from './Header';
import Body from './Body';
import moment from 'moment';



let  time = "08:00"
let keluar = "19:00"
// let formatted = moment(time, "HH:mm").format("hh:mm");
// console.log(formatted); 
let datenow = moment().format('HH:mm');

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state ={
            buttonEnabled: false,
            currentdate : '',
            masuk : '',
            
            
        }
    }


    // componentDidMount(){
    // let date = moment().format('HH:mm');
    // let datemasuk = moment().add(1, 'minutes').format('hh:mm')
    
    // this.setState({
    //         currentdate: date,
    //         masuk : datemasuk
           
            
    // })
    //     console.log(formatted);
    
    // }


onCheckin = () => {
    if (datenow == time) {
      this.props.navigation.navigate('FaceDetection')  
    }
    else{
        Alert.alert('Check In Gagal', 'Harus dilakukan pada jam 08:00 pagi')
    }
}

onCheckout = () => {
   
    if (datenow == keluar) {
      Alert.alert('Anda Berhasil Check Out')  
    }
    else{
        Alert.alert('Check Out Gagal', 'Harus dilakukan pada jam 19:00')
    }
}




    render(){
        
        return(
            <View style={styles.container}>

                    <Header/>
                    
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.inner} onPress={this.onCheckin} 
                        disabled={this.state.buttonEnabled}>
                            <Image  source={require('../../assets/checkin.png')}/>
                            <Text>Check In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                        <TouchableOpacity style={styles.inner} onPress={this.onCheckout}>
                            <Image  source={require('../../assets/checkout.png')}/>
                            <Text>Check Out</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                        <TouchableOpacity style={styles.inner} onPress={()=>this.props.navigation.navigate('Izin')}>
                            <Image  source={require('../../assets/izin.png')}/>
                            <Text>Izin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.box}>
                        <TouchableOpacity style={styles.inner} onPress={()=>this.props.navigation.navigate('History')}>
                            <Image  source={require('../../assets/history.png')}/>
                            <Text>History</Text>
                        </TouchableOpacity>
                    </View>

                    
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    } ,
    box: {
        width:'50%',
        height:'40%',
        padding: 5,
    } ,
    inner: {
        flex : 1,
        backgroundColor : '#eee',
        alignItems: 'center',
        justifyContent: 'center'

    }

});


export default Dashboard;