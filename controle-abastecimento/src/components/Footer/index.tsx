import React from 'react';
import { Image, StyleSheet, View } from "react-native";

export default function Footer() {
    return (
        <View style={styles.container}>
            <View style={styles.iconsContainer}>
                <Image style={styles.icons} source={require("../../assets/logo-facebook.png")}></Image>
                <Image style={styles.icons} source={require("../../assets/logo-linkedin.png")}></Image>
                <Image style={styles.icons} source={require("../../assets/logo-twitter.png")}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        height: '9%',
        paddingTop: 10,
        backgroundColor: '#FFC300',
        alignItems: 'center',
    },
    icons: {
        marginRight: 20
    }
})