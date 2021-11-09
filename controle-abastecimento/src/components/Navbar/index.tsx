import React from "react";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback, View, Image, Text, StyleSheet } from "react-native";

export default function Navbar() {
    const navigation = useNavigation();
    const handlebar = () => {
        navigation.navigate("Menu")
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handlebar}>
                    <View style={styles.containerMenu}>
                        <View style={styles.lineMenu}></View>
                        <View style={styles.lineMenu}></View>
                        <View style={styles.lineMenu}></View>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.text}>Controle de Abastecimento</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFC300",
        height: "15%",
        paddingTop: "8%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 21,
        marginLeft: "5%",
        letterSpacing: -0.24
    },
    containerMenu: {
        padding: '2%',
        marginRight: 10,
        width: '15%',
        height: '70%',
        backgroundColor: "#000000",
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    lineMenu: {
        margin: '7%',
        width: '90%',
        height: '10%',
        backgroundColor: '#FFFFFF'
    }
})