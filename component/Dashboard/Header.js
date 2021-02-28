import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={{padding:20 }} onPress={()=> auth().signOut()} >
                     <Text style={{color:'#1B9CFC'}} >Logout</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#eee'
    }  
});
