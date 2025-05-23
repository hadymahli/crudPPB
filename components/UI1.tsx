import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, StyleSheet,  Alert, Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const App = () => {
    return (
        <ScrollView>
            <View>
                <Text style={styles.judul}>📚 Daftar buku</Text>
            </View>
            <TextInput
                style={styles.input1}
                placeholder="Judul Buku"
            />
            <TextInput
                style={styles.input2}
                placeholder="Nama Pengarang"
            />

        <TouchableOpacity style={styles.Button}>
            <Text style={styles.buttonText}>Tambah Buku</Text>
        </TouchableOpacity>

        </ScrollView>
    );
};

export default App;

const styles = StyleSheet.create({
    judul: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },

    input1: {
        borderColor: 'grey',
        borderWidth: 2,
        width: 400,
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },

    input2: {
        borderColor: 'grey',
        borderWidth: 2,
        width: 400,
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },

    Button: {
    backgroundColor: '#348feb',
    width: 400,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    },

    buttonText :{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    top: '15'
    }

})