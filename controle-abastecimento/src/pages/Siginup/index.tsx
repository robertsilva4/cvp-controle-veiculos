import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { postUser } from '../../api';
import Header from '../../components/Header';

export default function Siginup() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirm, setConfirm] = useState('')
    const [mail, setMail] = useState('')
    const [confirmail, setConfirmail] = useState('')
    const [name, setName] = useState('')
    const [cpfcnpj, setCpfCnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')

    const navigate = useNavigation();
    const handlecriarUser = (user: any, pwd: any, mail: any, name: any, telefone: any, cpf_cnpj: any, cep: any, cidade: any, uf: any) => {
        if (user != '' && name != '' && pwd != '' && mail != '' && telefone != '' && cpf_cnpj != '' && cep != '' && cidade != '' && uf != '') {
            postUser(user, name, pwd, mail, cpf_cnpj, telefone, cep, cidade, uf)
                .then(() => {
                    Alert.alert("Usuário Cadastrado com Sucesso", "Faça Login para acessar a plataforma", [
                        { text: "OK", onPress: () => navigate.navigate("Login") }
                    ])
                })
                .catch(() => Alert.alert("Erro ao Cadastrar usuário", "Tente Novamente mais tarde"))
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
                        placeholder="Digite o Usuário"
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
                        onChangeText={setConfirm}
                        placeholder="Digite a senha novamente"
                        secureTextEntry={true}
                        value={confirm}
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
                        onChangeText={setConfirmail}
                        placeholder="Digite seu e-mail novamente"
                        keyboardType="email-address"
                        value={confirmail}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        placeholder="Digite seu Nome"
                        value={name}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTelefone}
                        placeholder="Digite seu Telefone"
                        value={telefone}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCpfCnpj}
                        placeholder="Digite seu CPF ou CNPJ"
                        value={cpfcnpj}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCep}
                        placeholder="Digite seu cep"
                        value={cep}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCidade}
                        placeholder="Digite sua cidade"
                        value={cidade}
                    ></TextInput>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUf}
                        placeholder="Digite seu uf"
                        value={uf}
                    ></TextInput>
                    <RectButton
                        style={styles.button}
                        onPress={() => handlecriarUser(user, pwd, mail, name, telefone, cpfcnpj, cep, cidade, uf)}
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
        position: 'relative',
        backgroundColor: '#003566',
        margin: '5%',
        borderRadius: 43,
        padding: 40,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        marginTop: 25,
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
        width: '50%',
        marginLeft: 60,
        marginTop: 20,
        padding: '3%',
        borderRadius: 43,
    },
    buttonText: {
        textAlign: 'center',
    }
})

