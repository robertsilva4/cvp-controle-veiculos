import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Siginup from './pages/Siginup';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Tofuel from './pages/Tofuel';
import SiginupCar from './pages/SiginupCar';
import Profile from './pages/Profile';
import History from './pages/History';
import CarDetails from './pages/CarDetails';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: "#FFF"
                    }
                }}
            >
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Tofuel" component={Tofuel}></Stack.Screen>
                <Stack.Screen name="Siginup" component={Siginup}></Stack.Screen>
                <Stack.Screen name="SiginupCar" component={SiginupCar}></Stack.Screen>
                <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
                <Stack.Screen name="History" component={History}></Stack.Screen>
                <Stack.Screen name="Menu" component={Menu}></Stack.Screen>
                <Stack.Screen name="CarDetails" component={CarDetails}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;