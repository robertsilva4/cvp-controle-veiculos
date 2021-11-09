import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { Card } from 'react-native-elements';
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getVehicleByUser } from '../../api';
import Navbar from '../../components/Navbar';
import { User } from '../../types';
import { Vehicle } from '../../types';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import Globais from '../../components/Globais';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type Props = {
    route: {
        params: {
            login: User;
        }
    }
}

export default function Home({ route }: Props) {
    const { login } = route.params;
    const [cars, setCars] = useState<Vehicle[]>([])
    const [err, setError] = useState(false)
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    Globais.apelido = login.data.apelido
    Globais.id = login.data.id

    function formatDate(date: Date) {
        return dayjs(date).format('DD/MM/YYYY HH:mm')
    }

    function loadCars() {
        getVehicleByUser(login.data.apelido)
            .then(res => setCars(res.data.data))
            .catch(() => setError(true))
    }

    const handleOnPress = (vehicle: Vehicle) => {
        navigation.navigate('CarDetails', {
            vehicle
        });
    }

    useEffect(() => {
        loadCars()
    }, [isFocused])

    return (
        <>
            <Navbar />
            <ScrollView>
                <View style={styles.containerProfile}>
                    <Text style={styles.textProfile}>Bem Vindo {login.data.apelido}</Text>
                    {err ?
                        (
                            <View style={styles.containerError}>
                                <Text style={styles.textError}>Nenhum Veículo Cadastrado</Text>
                            </View>)
                        :
                        (
                            <>
                                {cars.map(car => (
                                    <TouchableWithoutFeedback
                                        key={car.id}
                                        onPress={() => handleOnPress(car)}
                                    >
                                        {car.ativo == "S" ?
                                            (<>
                                                <Card key={car.id} containerStyle={styles.containerCard}>
                                                    <Card.Title style={styles.titleCard}>{car.nomeVeiculo}</Card.Title>
                                                    <Card.Divider />
                                                    <View style={styles.containerHistory}>
                                                        <Text style={styles.dateCard}>{car.placaVeiculo}</Text>
                                                        <Text style={styles.dateCard}>{formatDate(car.dtRegistro)}</Text>
                                                    </View>
                                                </Card>
                                            </>)
                                            : (<>
                                                <Card key={car.id} containerStyle={styles.containerCardRed}>
                                                    <Card.Title style={styles.titleCard}>{car.nomeVeiculo}</Card.Title>
                                                    <Card.Divider />
                                                    <View style={styles.containerHistory}>
                                                    <Text style={styles.dateCard}>{car.placaVeiculo}</Text>
                                                        <Text style={styles.dateCard}>{formatDate(car.dtRegistro)}</Text>
                                                    </View>
                                                </Card>
                                            </>)}
                                    </TouchableWithoutFeedback>
                                ))}
                            </>
                        )}
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    containerProfile: {
        flex: 1,
        flexDirection: "column"
    },
    textProfile: {
        textTransform: "capitalize",
        fontSize: 20,
        marginTop: 20,
        textAlign: "center"
    },
    containerError: {
        backgroundColor: 'red',
        margin:"8%",
        padding: "5%",
        borderRadius: 10,
        alignItems:"center"
    },
    textError: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    containerCard: {
        margin: '5%',
        backgroundColor: '#003566',
        borderRadius: 10
    },
    containerCardRed: {
        margin: '5%',
        backgroundColor: 'rgba(0, 53, 102, 0.2)',
        borderRadius: 10
    },
    containerHistory: {
        flexDirection: 'row',
    },
    titleCard: {
        color: '#FFFFFF',
        marginBottom: '5%',
    },
    dateCard: {
        color: '#FFFFFF',
    }
})