import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { postUser, viaCep } from '../../api';
import Header from '../../components/Header';

export default function Siginup() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [cpfcnpj, setCpfCnpj] = useState('')

    const navigate = useNavigation();

    const handlecriarUser = (user: string, pwd: string, mail: string, cpf_cnpj: string, name: string) => {
        let cpforcnpj = cpf_cnpj.replace(/[,/.*-]+/g, "").trim()
        let nome = name.toUpperCase();
        let email = mail.toLowerCase();
        let usuario = user.toLowerCase();
        var cpforcnpjvalido = cpforcnpj.length == 11 || cpforcnpj.length == 14;
        var emailvalido = email.search("@");
        if (usuario != '' && pwd != '' && emailvalido != -1 && cpforcnpjvalido && nome != '') {
            postUser(usuario, pwd, email, nome, cpforcnpj)
                .then(() => {
                    Alert.alert("Usuário Cadastrado com Sucesso", "Faça Login para acessar a plataforma", [
                        { text: "OK", onPress: () => navigate.navigate("Login") }
                    ])
                })
                .catch(() => Alert.alert("Erro ao Cadastrar usuário", "usuário incorreto ou email inválido"))
        } else {
            Alert.alert(
                "Erro ao Cadastrar usuário",
                "Preencha os campos obrigatórios"
            );
        }
    }

    return (
        <>
            <Header />
            <ScrollView >
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastrar Usuário</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUser}
                        placeholder="Crie um Usuário"
                        value={user}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPwd}
                        placeholder="Crie uma Senha"
                        secureTextEntry={true}
                        value={pwd}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCpfCnpj}
                        placeholder="Digite seu CPF ou CNPJ"
                        value={cpfcnpj}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={setMail}
                        placeholder="Digite seu e-mail"
                        value={mail}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        placeholder="Digite seu Nome"
                        value={name}
                    ></TextInput>
                    <RectButton
                        style={styles.button}
                        onPress={() => handlecriarUser(user, pwd, mail, cpfcnpj, name)}
                    >
                        <Text style={styles.buttonText}>CADASTRAR</Text>
                    </RectButton>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#003566',
        margin: '5%',
        borderRadius: 15,
        padding: 40,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: 25,
        marginBottom: 5,
        padding: 5,
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 24,
        lineHeight: 28,
    },
    button: {
        backgroundColor: '#05B742',
        width: '60%',
        marginTop: 20,
        padding: '8%',
        borderRadius: 43,
    },
    buttonText: {
        textAlign: 'center',
    }
})

