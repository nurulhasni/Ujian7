import React, { Component } from 'react'
import { Text, View } from 'react-native'
import database from '@react-native-firebase/database';

export default class History extends Component {
    constructor(props) {
    super(props);
    this.state = {
      tes : {},
      userkey : [],
      
    };
  }

 
componentDidMount(){
   database()
  .ref('hadir')
  .once('value', (snapshot) => {
    let data = snapshot.val() ? snapshot.val() : {};
    let usertes = {...data};

    this.setState({
        tes : usertes,
        userkey : Object.keys(usertes)
    })
  })
}

    render() {
        const {tes, userkey} = this.state

        return (
            <View >
            {userkey.length > 0 ? (
             userkey.map((key) => (
            
            <View >
                
             
              <View >
                <Text key={key} >{tes[key].masuk}</Text>
               
              </View>
                 </View>
                    ))
                ) :(<Text>Kosong</Text>)}
            </View>  
        )
    }
}
