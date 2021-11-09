import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function Header() {
    const navigate = useNavigation();

    const turnPageLogin = () => {
        navigate.navigate('Login');
    }
    return (
        <TouchableWithoutFeedback onPress={turnPageLogin}>
            <View style={styles.container}>
                <Image source={require('../../assets/logoCVP-70.png')}></Image>
                <Text style={styles.text}>Controle de Abastecimento</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFC300",
        height: 90,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: 15,
        letterSpacing: -0.24
    }
})