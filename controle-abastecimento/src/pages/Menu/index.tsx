import React from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { RectButton } from "react-native-gesture-handler";
import Navbar from "../../components/Navbar";
import Globais from "../../components/Globais";

export default function Menu() {
    const navigation = useNavigation()
    const returnHome = () => {
        navigation.navigate("Home")
    }
    const signupCar = () => {
        navigation.navigate("SiginupCar")
    }
    const signupProfile = () => {
        navigation.navigate("Profile")
    }
    const abastecer = () => {
        navigation.navigate("Tofuel")
    }
    const history = () => {
        navigation.navigate("History")
    }
    const closeApp = () => {
        navigation.navigate("Login")
        Globais.id = "";
        Globais.apelido = "";
    }

    return (
        <>
            <Navbar />
            <View style={styles.container}>
                <RectButton
                    style={styles.menuButton}
                    onPress={returnHome}
                >
                    <Icon name="home" size={70} />
                    <Text style={styles.textButton}>Home</Text>
                </RectButton>
                <RectButton
                    style={styles.menuButton}
                    onPress={signupCar}
                >
                    <Icon name="add" size={70} />
                    <Text style={styles.textButton}>Veículos</Text>
                </RectButton>
                <RectButton
                    style={styles.menuButton}
                    onPress={abastecer}
                >
                    <Icon name="dashboard" size={70} />
                    <Text style={styles.textButton}>Abastecer</Text>
                </RectButton>
                <RectButton
                    style={styles.menuButton}
                    onPress={history}
                >
                    <Icon name="history" size={70} />
                    <Text style={styles.textButton}>Histórico</Text>
                </RectButton>
                <RectButton
                    style={styles.menuButton}
                    onPress={signupProfile}
                >
                    <Icon name="info" size={70} />
                    <Text style={styles.textButton}>Perfil</Text>
                </RectButton>
                <RectButton
                    style={styles.menuButton}
                    onPress={closeApp}
                >
                    <Icon name="close" size={70} />
                    <Text style={styles.textButton}>Sair</Text>
                </RectButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuButton: {
        borderRadius: 20,
        backgroundColor: 'rgba(0, 53, 102, 0.8)',
        width: 140,
        height: 110,
        padding: 5,
        margin: 20,
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    imageButton: {
        margin: "7%",
    },
    textButton: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
})