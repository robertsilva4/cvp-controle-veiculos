import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Pressable, Modal } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { fetchLogin, fetchUser, updatePwd } from '../../api';
import { Icon } from "react-native-elements/dist/icons/Icon";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
type Login = {
    data: string;
    status: string;
}

export default function Login() {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userReset, setUserReset] = useState('')
    const [email, setEmail] = useState('')
    const [pwdReset, setPwdReset] = useState('')
    const navigation = useNavigation();

    function handleData(login: Login) {
        fetchUser(login.data)
            .then(res => {
                let login = res.data
                navigation.navigate("Home", { login })
            })
    }
    const handleLogin = (user: string, pwd: string) => {
        let usuario = user.toLowerCase();
        if (usuario != '' && pwd.length > 8) {
            fetchLogin(usuario, pwd)
                .then(res => { handleData(res.data) })
                .catch(() => Alert.alert("Erro de Login", "Usuário ou senha inválida"))
        } else {
            Alert.alert("Preencha os campos corretamente")
        }
    }
    const handleSiginup = () => {
        navigation.navigate('Siginup')
    }

    const resetPwd = (userReset: string, emailReset: string, newPwdReset: string) => {
        let email = emailReset.toLowerCase();
        let usuario = userReset.toLowerCase();
        var emailvalido = email.search("@")
        if (emailvalido != -1 && usuario != '' && newPwdReset.length > 8) {
            updatePwd(usuario, email, newPwdReset)
                .then(() => {
                    Alert.alert("Senha alterada com Sucesso", "Faça o Login para acessar a plataforma")
                    setModalVisible(false)
                })
                .catch(() => {
                    Alert.alert("Erro ao alterar a senha", "usuário ou e-mail inválidos")
                });
        } else {
            Alert.alert("Erro ao alterar a senha", "Preencha os campos corretamente")
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.cardLogin}>
                    <Text style={styles.title}>Entre ou Cadastre-se</Text>
                    <Text style={styles.modalText}>Usuário:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUser}
                        placeholder="Exemplo"
                        value={user}
                    ></TextInput>
                    <Text style={styles.modalText}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPwd}
                        placeholder="********"
                        secureTextEntry={true}
                        value={pwd}
                    ></TextInput>
                    <RectButton
                        style={styles.butonRefreshPwd}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textRefreshPwd}>ESQUECI A SENHA</Text>
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
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.containerCloseModal}>
                                <Pressable
                                    style={styles.closeModal}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Icon name="close"></Icon>
                                </Pressable>
                            </View>
                            <Text style={styles.modalTitle}>Atualize sua Senha</Text>
                            <Text style={styles.modalText}>Usuário:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={userReset}
                                onChangeText={setUserReset}
                                placeholder="Exemplo"
                            />
                            <Text style={styles.modalText}>e-mail:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="exemplo@gmail.com"
                            />
                            <Text style={styles.modalText}>Nova Senha:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={pwdReset}
                                onChangeText={setPwdReset}
                                secureTextEntry={true}
                                placeholder="Min. 8 Caracteres"
                            />

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => resetPwd(userReset, email, pwdReset)}
                            >
                                <Text style={styles.textStyle}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            <Footer />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    cardLogin: {
        position: "relative",
        height: '80%',
        width: "90%",
        borderRadius: 15,
        marginTop: "10%",
        marginBottom: "10%",
        backgroundColor: '#003566',
        alignItems: 'center',
    },
    title: {
        color: "#fff",
        marginTop: "3%",
        fontSize: 20
    },
    input: {
        borderRadius: 5,
        width: '70%',
        backgroundColor: '#FFF',
        marginBottom: "2%",
        padding: 5,
        textAlign: 'center',
    },
    containerButtons: {
        marginTop: 10,
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
    },
    textRefreshPwd: {
        color: "#FFC300"
    },
    butonRefreshPwd: {
        margin: 25,
        padding: 2,
    },

    //modal
    containerCloseModal: {
        width: "100%",
        height: "25%",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    closeModal: {
        width: "20%",
        padding: "5%",
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "#003566",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        width: "80%",
        height: "90%",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        color: "#FFF",
        fontSize: 20,
        marginTop: "-15%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        marginTop: "5%",
        padding: "7%",
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalInput: {
        width: "75%",
        backgroundColor: '#FFF',
        color: '#000000',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
    },
    modalText: {
        color: "#FFF",
        marginTop: 10,
    }
})