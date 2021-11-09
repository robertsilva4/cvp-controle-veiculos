import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Radiobutton(props: any) {
    const select = (value: any) => {
        props.onSelecting(value)
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => select(props.value)}
            >
                {props.selected === props.value ? (<View style={styles.buttonSelected}><Text style={styles.buttonTextSelected}>{props.label}</Text></View>) : (<View style={styles.button}><Text style={styles.buttonText}>{props.label}</Text></View>)}
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        margin: 14
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSelected: {
        height: 80,
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCDCDC'
    },
    buttonTextSelected: {
        color: 'green'
    },
    buttonText: {
        color: '#DCDCDC'
    },
})