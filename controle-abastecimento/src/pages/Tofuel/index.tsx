import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, StyleSheet, Text, View } from "react-native";
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { postFuelVehicle, searchVehicle } from '../../api';
import Globais from '../../components/Globais';
import Navbar from '../../components/Navbar';
import { Vehicle } from '../../types';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Icon } from 'react-native-elements/dist/icons/Icon';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export default function Tofuel() {
    const [search, setSearch] = useState('');
    const [fuel, setFuel] = useState<Vehicle[]>([]);
    const [kmatual, setKmatual] = useState('');
    const [qtde, setQtde] = useState('');
    const [pr_unit, setPr_unit] = useState('');
    const navigation = useNavigation();
    let user = Globais.apelido
    const handleSerch = (search: any) => {
        if (search != null && search != '') {
            searchVehicle(search)
                .then(res => setFuel(res.data.data))
                .catch(() => {
                    Alert.alert("Digite uma placa ou apelido válido")
                })
        } else {
            Alert.alert("Digite uma placa ou apelido")
        }
    }
    const fuelVehicle = (user: any, placa: any, pr_unit: any, qtde: any, kmatual: any) => {
        if (placa != '' && pr_unit != '' && qtde != '' && kmatual != '') {
            let data = dayjs().format("YYYY-MM-DD HH:ss")
            let prdouble = pr_unit.split(',').join(".")
            let pr_unitario = parseFloat(prdouble);
            let vlabastecido = pr_unitario * qtde;
            postFuelVehicle(user, placa, pr_unitario, qtde, kmatual, vlabastecido, data)
                .then(() => {
                    Alert.alert("Abastecimento registrado com sucesso")
                    navigation.navigate("Home")
                })
                .catch(() => Alert.alert("Erro ao Registrar abastecimento"))
        } else {
            Alert.alert("Preencha os Campos")
        }
    }

    return (
        <>
            <Navbar />
            <View style={styles.containerSearch}>
                <TextInput
                    placeholder="Digite a placa ou apelido"
                    style={[styles.inputSearch, { color: "white" }]}
                    onChangeText={setSearch}
                    value={search}
                ></TextInput>
                <RectButton
                    onPress={() => handleSerch(search)}
                >
                    <Icon name="search" size={30} />
                </RectButton>
            </View>
            <View style={styles.lineSearch}></View>
            <View style={styles.containerResuts}>
                {fuel.map(dados => (
                    <View key={dados.id} style={styles.containerCard}>
                        <Text style={styles.titleCard}>{dados.placaVeiculo}</Text>
                        <TextInput
                            style={styles.inputCard}
                            placeholder="Digite o valor da gasolina"
                            value={pr_unit}
                            onChangeText={setPr_unit}
                        />
                        <TextInput
                            style={styles.inputCard}
                            placeholder="Digite a quantidade de gasolina"
                            value={qtde}
                            onChangeText={setQtde}
                        />
                        <TextInput
                            style={styles.inputCard}
                            placeholder="Digite o km Atual"
                            value={kmatual}
                            onChangeText={setKmatual}
                        />
                        <RectButton
                            style={styles.buttonCard}
                            onPress={() => fuelVehicle(user, dados.placaVeiculo, pr_unit, qtde, kmatual)}
                        >
                            <Text>Abastecer</Text>
                        </RectButton>
                    </View>
                ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputSearch: {
        width: '70%',
        padding: 5,
        margin: 20,
        backgroundColor: 'rgba(0, 53, 102, 0.7)',
        borderRadius: 8,
        color: "#FFF"
    },
    inputCard: {
        width: '70%',
        height: 30,
        marginBottom: "10%",
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    },
    titleCard: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        margin: "5%"
    },
    stylePlaca: {
        margin: 10,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    lineSearch: {
        width: '100%',
        height: 3,
        backgroundColor: '#000000'
    },
    buttonCard: {
        margin: 5,
        alignContent: 'center',
        backgroundColor: '#05B742',
        width: '50%',
        padding: '3%',
        borderRadius: 43,
        alignItems: "center"
    },
    resultSearch: {
        margin: '5%',
        width: '100%',
        textAlign: 'center'
    },
    containerResuts: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerCard: {
        width: '90%',
        height: '90%',
        margin: 15,
        backgroundColor: '#003566',
        alignItems: 'center',
        borderRadius: 8
    }
})