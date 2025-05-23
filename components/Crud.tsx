import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Modal,
  Button
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Crud = () => {
  type Catatan = {
    id: number;
    nama: string;
    catatan: string;
    hobi: string;
    tanggal: string;
  };

  const navigation = useNavigation();
  const [nama, setNama] = useState('');
  const [catatan, setCatatan] = useState('');
  const [hobi, setHobi] = useState('');
  const [data, setData] = useState<Catatan[]>([]);
  const [selectedItem, setSelectedItem] = useState<Catatan | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: Catatan): void => {
    setSelectedItem({ ...item });
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleButton = () => {
    if (nama === '' || catatan === '' || hobi === '') {
      Alert.alert('Error', 'Data harus lengkap!');
      return;
    }

    axios
      .post('http://192.168.0.34/pbb_ilhamn/add.php', { nama, catatan, hobi })
      .then((response) => {
        Alert.alert('Data berhasil disimpan', response.data.message);
        setNama('');
        setCatatan('');
        setHobi('');
        fetchData();
      })
      .catch(() => {
        Alert.alert('Error', 'Gagal menyimpan data.');
      });
  };

  const fetchData = () => {
    axios
      .get('http://192.168.0.34/pbb_ilhamn/get.php')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Gagal mengambil data dari database');
      });
  };

  const handleUpdate = () => {
    if (selectedItem) {
      axios
        .post('http://192.168.0.34/pbb_ilhamn/update.php', {
          id: selectedItem.id,
          nama: selectedItem.nama,
          catatan: selectedItem.catatan,
          hobi: selectedItem.hobi,
        })
        .then(() => {
          Alert.alert('SUKSES', 'Catatan berhasil diperbaharui!');
          closeModal();
          fetchData();
        })
        .catch(() => {
          Alert.alert('ERROR', 'Catatan gagal diperbaharui');
        });
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert('KONFIRMASI', 'Apakah anda yakin ingin menghapus catatan ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          axios
            .post('http://192.168.0.34/pbb_ilhamn/delete.php', { id })
            .then(() => {
              Alert.alert('SUKSES', 'Catatan berhasil dihapus!');
              closeModal();
              fetchData();
            })
            .catch(() => {
              Alert.alert('ERROR', 'Catatan gagal dihapus!');
            });
        },
      },
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.teks}>NOTE</Text>
        <TextInput
          style={styles.input}
          value={nama}
          onChangeText={(text) => setNama(text)}
          placeholder="Masukkan nama Anda"
        />
        <TextInput
          style={styles.input1}
          value={catatan}
          onChangeText={(text) => setCatatan(text)}
          multiline={true}
          placeholder="Masukkan catatan Anda"
        />
        <TextInput
          style={styles.input}
          value={hobi}
          onChangeText={(text) => setHobi(text)}
          placeholder="Masukkan hobi Anda"
        />

        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>➣➣➣</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.containerFlatlist}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.containerTeks}>
                <Text>Nama    : {item.nama}</Text>
                <Text>Catatan : {item.catatan}</Text>
                <Text>Hobi    : {item.hobi}</Text>
                <Text>Tanggal : {item.tanggal}</Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedItem && (
                <>
                  <TextInput
                    style={styles.kolom1}
                    value={selectedItem.nama}
                    onChangeText={(text) =>
                      setSelectedItem({ ...selectedItem, nama: text })
                    }
                  />
                  <TextInput
                    style={styles.kolom2}
                    value={selectedItem.catatan}
                    onChangeText={(text) =>
                      setSelectedItem({ ...selectedItem, catatan: text })
                    }
                  />
                  <TextInput
                    style={styles.kolom3}
                    value={selectedItem.hobi}
                    onChangeText={(text) =>
                      setSelectedItem({ ...selectedItem, hobi: text })
                    }
                  />
                  <Button title="UPDATE" onPress={handleUpdate} />
                </>
              )}

              <TouchableOpacity onPress={closeModal} style={styles.iconClose}>
                <Text style={{ fontSize: 20 }}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Crud;

const styles = StyleSheet.create({
  teks: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    borderColor: '#3498db',
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
  input1: {
    borderColor: '#3498db',
    borderWidth: 2,
    width: 400,
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginRight: 35,
    width: 130,
    alignSelf: 'flex-end',
    marginTop: 30,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  containerFlatlist: {
    marginTop: 20,
  },
  containerTeks: {
    borderWidth: 1,
    borderColor: '#3498db',
    padding: 10,
    width: 400,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  iconClose: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#3498db',
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  kolom1: {
    width: '90%', 
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  kolom2: {
    width: '90%', // Menyesuaikan lebar sesuai dengan layar
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,  // Radius untuk sudut yang lebih halus
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  kolom3: {
    width: '90%', // Menyesuaikan lebar sesuai dengan layar
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },


});
