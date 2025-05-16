import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UI1 = () => {
    const [name, setName] = useState('');

    return (

        <View>
            <View style={styles.lingkaran1} />
            <View style={styles.lingkaran2} />
            <Text style={styles.label}>input your name!</Text>


            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Type your name"
                placeholderTextColor="#999"
            />


            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextText}>next</Text>
            </TouchableOpacity>
        </View>

    );
};

export default UI1;

const styles = StyleSheet.create({
    circleContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    lingkaran1: {
        top: 130,
        left: 200,
        width: 100,
        height: 100,
        borderRadius: 40,
        backgroundColor: '#FAD2CF',
        marginRight: -30,
        zIndex: 1,
    },
    lingkaran2: {
        top: 50,
        left: 150,
        width: 100,
        height: 100,
        borderRadius: 40,
        backgroundColor: '#008B8B',
    },
    label: {
        fontSize: 16,
        fontFamily: 'monospace',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        left: 50,
        top: 300,
        width: '80%',
        height: 40,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    saveButton: {
        top: 300,
        left: 200,
        height: 40,
        width: 100,
        backgroundColor: '#90EE90',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 20,
    },
    saveText: {
        fontWeight: 'bold',
        color: '#000',
    },
    nextButton: {
        top: 400,
        left: 350,
        height: 40,
        width: 90,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    nextText: {
        fontFamily: 'monospace',
        color: '#000',
    },
});