import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard/Dashboard'
import CheckIn from '../component/CheckIn'
import CheckOut from '../component/CheckOut'
import Izin from '../component/Izin'
import History from '../component/History'
import Login from '../component/Login'
import FaceDetection from '../component/FaceDetection'


const Stack = createStackNavigator();

const Router = () => {
    return (
      <Stack.Navigator>
       
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" component={CheckIn}   options={{ title: 'Check In' }}/>
        <Stack.Screen name="CheckOut" component={CheckOut}  options={{ title: 'Check Out' }} />
        <Stack.Screen name="Izin" component={Izin}  options={{ title: 'Izin' }}/>
        <Stack.Screen name="History" component={History}  options={{ title: 'History' }}/>
        <Stack.Screen name="FaceDetection" component={FaceDetection}  options={{ title: 'Face' }}/>
      </Stack.Navigator>
    )
}

export default Router