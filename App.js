import React, { Component } from 'react'
import { Text, View, StyleSheet, ImageBackground} from 'react-native'
import Login from './component/Login'
import BG from './assets/bg.jpg'
import auth from '@react-native-firebase/auth';
import Router from './component/Router'
import Loading from './component/Loading'
import { NavigationContainer } from '@react-navigation/native'

export default class App extends Component {

  state = {
    isLoggedIn: null
  }

componentDidMount() {
  auth().onAuthStateChanged((userdata) => {
      console.log("user" + JSON.stringify(userdata))
      if (userdata === null) {
        this.setState({ isLoggedIn: false })
      } else {
        this.setState({ user: userdata, isLoggedIn: true })
      }
    });
}

renderlogin =()=>{
  switch(this.state.isLoggedIn){
      case false:
        return <ImageBackground style={styles.container} source={BG} >
                  <Login/>
               </ImageBackground>

        
      case true:
           return <NavigationContainer>
                    <Router />
                  </NavigationContainer>
           
            default:
             return <Loading/>
           


    }
}




  render() {
    return (
      <View style={styles.container}>
       {this.renderlogin()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height:'100%',
    width:'100%'
 
  
  },
})