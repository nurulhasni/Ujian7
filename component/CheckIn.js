import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'

export default class CheckIn extends Component {
  constructor(props){
      super(props)
      this.state = {
          uri : '',
          
      }
  }


   


    render() {
        return (
            <View>
                <Text> Check In </Text>
            </View>
        )
    }
}
