import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { postVehicle } from '../../api';
import Globais from '../../components/Globais';
import Radiobutton from '../../components/Radiobutton';
import Navbar from '../../components/Navbar';

export default function Siginup() {
    const [nomecar, setNomeCar] = useState('')
    const [placacar, setPlacaCar] = useState('')
    const [anocar, setAnoCar] = useState('')
    const [chassiscar, setChassisCar] = useState('')
    const [renavancar, setRenavanCar] = useState('')
    const [radiocar, setRadioCar] = useState('')
    const navigate = useNavigation()
    const user = Globais.apelido
    const data = [
        {
            label: 'CARRO',
            value: 1
        },
        {
            label: 'MOTO',
            value: 2
        },
        {
            label: 'CAMIHÃO',
            value: 3
        },
        {
            label: 'OUTROS',
            value: 4
        },
    ]
    const checkRadio = (value: any) => {
        setRadioCar(value)
    }
    function messageSuccess() {
        Alert.alert("Veículo Cadastrado com sucesso")
        navigate.navigate("Home")
    }
    const handlecriaCar = (nomecar: any, placacar: any, anocar: any, chassiscar: any, renavancar: any, radiocar: any) => {
        postVehicle(user, nomecar, placacar, anocar, chassiscar, renavancar, radiocar)
            .then(() => {
                messageSuccess()
            })
            .catch(() => Alert.alert("Erro ao Cadastrar veículo"))
    }

    return (
        <>
            <Navbar />
            <ScrollView >
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Cadastrar Veículo</Text>
                    <View style={styles.containerVehicle}>
                        {data.map((q: any) => {
                            return (<Radiobutton
                                key={q.label}
                                label={q.label}
                                value={q.value}
                                onSelecting={checkRadio}
                                selected={radiocar}
                            />)
                        })}
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNomeCar}
                            placeholder="Digite o nome do veículo"
                            value={nomecar}
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPlacaCar}
                            placeholder="Placa"
                            value={placacar}
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAnoCar}
                            placeholder="Ano de Fabricação"
                            value={anocar}
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            onChangeText={setChassisCar}
                            placeholder="Chassis"
                            value={chassiscar}
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            onChangeText={setRenavanCar}
                            placeholder="Renavam"
                            value={renavancar}
                        ></TextInput>
                        <RectButton
                            style={styles.button}
                            onPress={() => handlecriaCar(nomecar, placacar, anocar, chassiscar, renavancar, radiocar)}
                        >
                            <Text style={styles.buttonText}>CADASTRAR</Text>
                        </RectButton>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003566',
        margin: 30,
        padding: 40,
        borderRadius: 30,
    },
    textTitle: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 10
    },
    containerVehicle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerInput: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: 200,
        height: 50,
        textAlign: 'center',
        margin: 5
    },
    button: {
        width: 120,
        height: 50,
        margin: 5,
        padding: 5,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#05B742'
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
    }
})