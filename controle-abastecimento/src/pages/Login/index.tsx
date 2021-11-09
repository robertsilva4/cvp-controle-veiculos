import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { fetchLogin, fetchUser } from '../../api';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
type Login = {
    data: string;
    status: string;
}

export default function Login() {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const navigation = useNavigation();

    const handleReset = () => {
        Alert.alert("Button onPres")
    }
    function handleData(login: Login) {
        fetchUser(login.data)
            .then(res => {
                let login = res.data
                navigation.navigate("Home", { login })
            })
    }
    const handleLogin = (user: string, pwd: string) => {

        fetchLogin(user, pwd)
            .then(res => { handleData(res.data) })
            .catch(() => Alert.alert("Erro de Login","Usuário ou senha inválida"))
    }
    const handleSiginup = () => {
        navigation.navigate('Siginup')
    }
    
    return (
        <>
            <Header />
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.input}
                    onChangeText={setUser}
                    placeholder="Digite o usuário"
                    value={user}
                ></TextInput>
                <TextInput
                    style={styles.input}
                    onChangeText={setPwd}
                    placeholder="Digite a Senha"
                    secureTextEntry={true}
                    value={pwd}
                ></TextInput>
                <RectButton
                    onPress={handleReset}
                >
                    <Text style={styles.linkReset}>ESQUECI A SENHA</Text>
                </RectButton>
                <View style={styles.containerButtons}>
                    <RectButton
                        style={styles.buttonSiginup}
                        onPress={handleSiginup}
                    >
                        <Text>CADASTRAR</Text>
                    </RectButton>
                    <RectButton
                        style={styles.buttonLogin}
                        onPress={() => handleLogin(user, pwd)}
                    >
                        <Text>ACESSAR</Text>
                    </RectButton>
                </View>
            </View>
            <Footer />
        </>
    )
}

const styles = StyleSheet.create({
    containerLogin: {
        height: '60%',
        backgroundColor: '#003566',
        alignItems: 'center',
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '13%',
        marginBottom: '13%',
        borderRadius: 43,
    },
    input: {
        width: '60%',
        backgroundColor: '#FFF',
        marginTop: 50,
        textAlign: 'center',
    },
    linkReset: {
        marginTop: 30,
        color: '#FFC300',
    },
    containerButtons: {
        marginTop: 30,
        flexDirection: 'row',
    },
    buttonLogin: {
        marginLeft: 10,
        padding: 15,
        borderRadius: 46,
        backgroundColor: '#0C9709',
    },
    buttonSiginup: {
        marginRight: 10,
        padding: 15,
        borderRadius: 46,
        backgroundColor: '#5448FF',
    }
})