import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Navbar from "../../components/Navbar";
import { Vehicle } from "../../types";
import { RectButton } from "react-native-gesture-handler";
import { Card } from 'react-native-elements';
import { useNavigation } from "@react-navigation/core";
import Globais from "../../components/Globais";
import { desactiveCar } from "../../api";

type Props = {
    route: {
        params: {
            vehicle: Vehicle
        }
    }

}
export default function CarDetails({ route }: Props) {
    const { vehicle } = route.params;
    const apelido = Globais.apelido;
    const navigation = useNavigation()

    const handleUpdateCar = (placa: any) => {
        if (placa != '') {
            Alert.alert("Veículo atualizado com sucesso");

        } else {
            Alert.alert("Erro ao atuallizar veículo");
        }
    }

    function desactiveActiveCar(id: any) {
        if (id != '' && vehicle.ativo == "S") {
            desactiveCar(apelido, id)
                .then(() => Alert.alert("Veículo inativo"))
                .catch(() => Alert.alert("erro ao desativar veículo"))
                .finally(() => navigation.navigate("Home"))

        } else if (id != '' && vehicle.ativo == "N") {
            desactiveCar(apelido, id)
                .then(() => Alert.alert("Veículo ativo"))
                .catch(() => Alert.alert("erro ao ativar veículo"))
                .finally(() => navigation.navigate("Home"))
        } else {
            Alert.alert("Erro ao desativar veículo");
        }
    }

    return (
        <>
            <Navbar />
            <View style={styles.container}>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={styles.titleCard}>{vehicle.nomeVeiculo}</Card.Title>
                    <Card.Divider />
                    <Text style={styles.textCard}>Placa: {vehicle.placaVeiculo}</Text>
                    <Text style={styles.textCard}>Renavan: {vehicle.renavan}</Text>
                    <Text style={styles.textCard}>Situação Dcto.: {vehicle.sit_docto}</Text>
                    <Text style={styles.textCard}>Situação Finan.: {vehicle.sit_financeira}</Text>
                    <Text style={styles.textCard}>Km Atual: {vehicle.kmAtual}</Text>
                    <Text style={styles.textCard}>Km de Compra: {vehicle.kmCompra}</Text>
                    <Text style={styles.textCard}>Km de Venda: {vehicle.kmVenda}</Text>
                    <Text style={styles.textCard}>Obs Veículo: {vehicle.obsVeiculo}</Text>
                </Card>
                <View style={styles.containerBotao}>
                    {vehicle.ativo == "N" ? (<>
                        <RectButton
                            style={styles.botaoAtivar}
                            onPress={() => desactiveActiveCar(vehicle.id)}
                        >
                            <Text>Ativar</Text>
                        </RectButton>
                    </>)
                        :
                        (<>
                            <RectButton
                                style={styles.botaoDeletar}
                                onPress={() => desactiveActiveCar(vehicle.id)}
                            >
                                <Text>Desativar</Text>
                            </RectButton>
                        </>)}
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        borderRadius: 10,
        backgroundColor: "#003566"
    },
    titleCard: {
        fontSize: 20,
        color: "white"
    },
    textCard: {
        margin: 5,
        fontSize: 15,
        color: "white"
    },
    containerBotao: {
        alignItems: "center",
        flexDirection: "column",
        alignContent: "center"
    },
    botaoDeletar: {
        borderRadius: 20,
        margin: 20,
        padding: 20,
        width: "40%",
        backgroundColor: "red",
        alignItems: "center"
    },
    botaoAtualizar: {
        borderRadius: 20,
        margin: 20,
        padding: 20,
        width: "40%",
        backgroundColor: "blue",
        alignItems: "center"
    },
    botaoAtivar: {
        borderRadius: 20,
        margin: 20,
        padding: 20,
        width: "40%",
        backgroundColor: "green",
        alignItems: "center"
    }
})