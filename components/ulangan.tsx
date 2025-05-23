import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [judulBuku, setJudulBuku] = useState('');
  const [penulis, setPenulis] = useState('');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = () => {
    axios
      .get('http://192.168.0.34/ulangan/get.php')
      .then((response) => {
        setData(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => Alert.alert('Error', 'Gagal mengambil data dari server'));
  };

  const handleTambah = () => {
    if (judulBuku === '' || penulis === '') {
      Alert.alert('Error', 'Harap isi semua field!');
      return;
    }

    axios
      .post('http://192.168.0.34/ulangan/add.php', {
        judul: judulBuku,
        penulis: penulis,
      })
      .then(() => {
        Alert.alert('Sukses', 'Buku berhasil ditambahkan!');
        setJudulBuku('');
        setPenulis('');
        fetchData();
      })
      .catch(() => Alert.alert('Error', 'Gagal menambah buku'));
  };

  const handleDelete = (id_buku) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus buku ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          axios
            .post('http://192.168.0.34/ulangan/delete.php', { id_buku })
            .then(() => {
              Alert.alert('Sukses', 'Buku berhasil dihapus');
              fetchData();
            })
            .catch(() => Alert.alert('Error', 'Gagal menghapus buku'));
        },
      },
    ]);
  };

  const handleUpdate = () => {
    if (selectedItem) {
      axios
        .post('http://192.168.0.34/ulangan/update.php', {
          id_buku: selectedItem.id_buku,
          judul: selectedItem.judul,
          penulis: selectedItem.penulis,
        })
        .then(() => {
          Alert.alert('Sukses', 'Data berhasil diperbarui!');
          setModalVisible(false);
          fetchData();
        })
        .catch(() => Alert.alert('Error', 'Gagal memperbarui data'));
    }
  };

  const openModal = (item) => {
    setSelectedItem({ ...item });
    setModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <Text style={styles.judul}>📚 Daftar Buku</Text>
        <TextInput
          style={styles.input1}
          placeholder="Judul Buku"
          value={judulBuku}
          onChangeText={setJudulBuku}
        />
        <TextInput
          style={styles.input2}
          placeholder="Nama Penulis"
          value={penulis}
          onChangeText={setPenulis}
        />
        <TouchableOpacity style={styles.Button} onPress={handleTambah}>
          <Text style={styles.buttonText}>Tambah Buku</Text>
        </TouchableOpacity>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id_buku.toString()}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.containerTeks}>
              <Text style={styles.itemText}>📓Judul  : {item.judul}</Text>
              <Text style={styles.itemText}>✏️Penulis : {item.penulis}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openModal(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id_buku)}>
                  <Text style={styles.deleteText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input1}
                value={selectedItem?.judul}
                onChangeText={(text) =>
                  setSelectedItem({ ...selectedItem, judul: text })
                }
              />
              <TextInput
                style={styles.input2}
                value={selectedItem?.penulis}
                onChangeText={(text) =>
                  setSelectedItem({ ...selectedItem, penulis: text })
                }
              />
              <Button title="UPDATE" onPress={handleUpdate} />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.iconClose}>
                <Text style={{ fontSize: 20 }}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default App;
const styles = StyleSheet.create({
  judul: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 20,
    marginLeft: '5%',
  },
  input1: {
    borderColor: 'grey',
    borderWidth: 1.5,
    width: '90%',
    maxWidth: 500,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  input2: {
    borderColor: 'grey',
    borderWidth: 1.5,
    width: '90%',
    maxWidth: 500,
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  Button: {
    backgroundColor: '#348feb',
    width: '90%',
    maxWidth: 500,
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  containerTeks: {
    borderWidth: 1,
    borderColor: '#348feb',
    padding: 15,
    width: '90%',
    maxWidth: 500,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  iconClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
