import React, { Component } from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Body =(navigation)=>{
    return (
           <View></View> 
        )
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

export default Body