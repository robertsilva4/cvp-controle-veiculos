import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { searchUserById, updateUser } from '../../api';
import Globais from "../../components/Globais";
import Navbar from '../../components/Navbar';
import { User } from '../../types';

export default function Profile() {
    const [user, setUser] = useState<User>();
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const idUser = Globais.id;
    const apelido = Globais.apelido;
    const handleUser = (id: any) => {
        searchUserById(id)
            .then(res => setUser(res.data))
            .catch(() => Alert.alert("Erro ao buscar por usuários"))
    }
    const handleSaveProfile = (name: any, telefone: any, cidade: any, uf: any, email: any) => {
        if (name != '' && telefone != '' && cidade != '' && uf != '' && email != '') {
            updateUser(idUser, apelido, name, telefone, cidade, uf, email)
                .then(() => Alert.alert("Usuário atualizado com suceso"))
                .catch(err => Alert.alert("Erro ao atualizar usuário"))
                .finally(() => {
                    setModalVisible(false)
                })
        } else {
            Alert.alert("Digite os campos necessários")
        }
    }
    useEffect(() => {
        let id = Globais.id
        handleUser(id)
    }, [user])

    return (
        <>
            <Navbar />
            <ScrollView>
                <Card containerStyle={styles.container}>
                    <Pressable
                        style={[styles.profileEdit, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Icon name="edit" size={30} />
                    </Pressable>
                    <Card.Title style={styles.titleContainer}>
                        <Text>{user?.data.usuario}</Text>
                    </Card.Title>
                    <Card.Divider />
                    <Text style={styles.profileInfo}>CPF:  {user?.data.cpf_cnpj}</Text>
                    <Text style={styles.profileInfo}>E-mail: {user?.data.email}</Text>
                    <Text style={styles.profileInfo}>Telefone: {user?.data.tel}</Text>
                    <Text style={styles.profileInfo}>Cidade: {user?.data.cid} - {user?.data.uf}</Text>
                </Card>
            </ScrollView>
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
                            <Text style={styles.modalTitle}>Atualize seus dados</Text>
                            <Text style={styles.modalText}>Nome:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={name}
                                onChangeText={setName}
                            />
                            <Text style={styles.modalText}>Telefone:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={telefone}
                                onChangeText={setTelefone}
                            />
                            <Text style={styles.modalText}>Email:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Text style={styles.modalText}>Digite a Cidade:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={cidade}
                                onChangeText={setCidade}
                            />
                            <Text style={styles.modalText}>UF:</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={uf}
                                onChangeText={setUf}
                            />

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleSaveProfile(name, telefone, cidade, uf, email)}
                            >
                                <Text style={styles.textStyle}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 53, 102, 0.8)',
        borderRadius: 8,
    },
    titleContainer: {
        fontSize: 30,
        color: "white"
    },
    profileEdit: {
        alignItems: "center",
        color: "white",
    },
    buttonOpen: {
        alignItems: "center",
        marginLeft: "90%",
        color: "white",
        backgroundColor: "green",
        borderRadius: 10,
        width: "11%",
        height: "12%"
    },
    profileInfo: {
        margin: '4%',
        color: "white",
    },
    buttonUpdateProfile: {
        alignContent: "center",
        backgroundColor: '#05B742',
        width: '50%',
        marginTop: 15,
        padding: '3%',
        borderRadius: 43,
    },
    textButtonUpdate: {
        textAlign: "center"
    },

    //modal

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        width: "80%",
        height: "80%",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        marginTop: "7%",
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
        borderColor: "#FFFFFF",
        backgroundColor: '#003566',
        color: '#000000',
        textAlign: 'center'
    },
    modalText: {
        marginTop: 10,
    }
})