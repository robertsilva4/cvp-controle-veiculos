import React from 'react';
import { useState } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import { StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { searchHistory } from '../../api';
import Globais from '../../components/Globais';
import Navbar from '../../components/Navbar';
import { Histories } from '../../types';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export default function History() {
    const user = Globais.apelido
    const date = new Date();
    const [showDe, setShowDe] = useState(false);
    const [showAte, setShowAte] = useState(false);
    const [textDe, setTextDe] = useState(dayjs().format("DD/MM/YYYY"));
    const [textAte, setTextAte] = useState(dayjs().format("DD/MM/YYYY"));
    const [dataDe, setdataDe] = useState(dayjs().format("DD-MM-YYYY"));
    const [dataAte, setdataAte] = useState(dayjs().format("DD-MM-YYYY"));
    const [search, setSearch] = useState("")
    const [history, setHistory] = useState<Histories[]>([]);

    const onChangeDe = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowDe(Platform.OS === 'ios');
        setTextDe(dayjs(currentDate).format('DD/MM/YYYY'))
        setdataDe(dayjs(currentDate).format('DD-MM-YYYY'))
    };

    const onChangeAte = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowAte(Platform.OS === 'ios');
        setTextAte(dayjs(currentDate).format('DD/MM/YYYY'))
        setdataAte(dayjs(currentDate).format('DD-MM-YYYY'))
    };

    const showModeDe = () => {
        setShowDe(true);
    };

    const showModeAte = () => {
        setShowAte(true);
    };

    function handleSerch(user: string, search: string, start: any, end: any) {
        let startDate = new Date(start.split('-').reverse().join('-'));
        let endData = new Date(end.split('-').reverse().join('-'));

        if (search != '' && startDate <= endData) {
            searchHistory(user, search, start, end)
                .then(res => setHistory(res.data.data))
                .catch(() => Alert.alert("Não encontramos registros"))
        } else {
            Alert.alert("Digite um período ou placa válidos")
        }
    }
    return (
        <>
            <Navbar />
            <View style={styles.containerSearch}>
                <TextInput
                    style={styles.inputSearch}
                    onChangeText={setSearch}
                    value={search}
                    placeholder="Digite a placa ou apelido"
                ></TextInput>
                <RectButton
                    onPress={() => handleSerch(user, search, dataDe, dataAte)}
                >
                    <Icon name="search" size={30} />
                </RectButton>
            </View>
            <View style={styles.line}></View>
            <View style={styles.dataBetween}>
                <Text style={styles.textDate}>De:</Text>
                <RectButton onPress={() => showModeDe()}>
                    <Text>{textDe}</Text>
                </RectButton>
                {showDe && (
                    <DateTimePicker
                        style={styles.dateComponent}
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDe}
                    />
                )}
                <Text style={styles.textDate}>Até:</Text>
                <RectButton onPress={() => showModeAte()}>
                    <Text>{textAte}</Text>
                </RectButton>
                {showAte && (
                    <DateTimePicker
                        style={styles.dateComponent}
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeAte}
                    />
                )}
            </View>
            <ScrollView style={styles.containerResults}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Data</DataTable.Title>
                        <DataTable.Title>Hora</DataTable.Title>
                        <DataTable.Title>Preço</DataTable.Title>
                        <DataTable.Title>Kilometragem</DataTable.Title>
                    </DataTable.Header>
                    {history.map(dados => (
                        <DataTable.Row key={dados.ID}>
                            <DataTable.Cell>{dayjs(dados.DTMovto).format("DD/MM/YYYY")}</DataTable.Cell>
                            <DataTable.Cell>{dayjs(dados.DTMovto).format("HH:mm")}</DataTable.Cell>
                            <DataTable.Cell>{dados.PRTOTAL}</DataTable.Cell>
                            <DataTable.Cell>{dados.Percorrido}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerResults: {
        flex: 1,
    },
    line: {
        width: '100%',
        height: 3,
        backgroundColor: '#000000'
    },
    dateComponent: {
        width: "40%",
        marginLeft: "5%"
    },
    textDate: {
        marginLeft: "10%",
        marginRight: "2%",
        fontSize: 15
    },
    inputSearch: {
        color: '#FFFFFF',
        width: '70%',
        padding: 5,
        margin: 20,
        backgroundColor: 'rgba(0, 53, 102, 0.7)',
        borderRadius: 8
    },
    dataBetween: {
        flexDirection: "row",
        margin: 15,
        alignItems: "center"
    },
    resultText: {
        padding: 10,
        textAlign: 'center'
    }
})