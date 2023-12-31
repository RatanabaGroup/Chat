import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert,
         TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ModalGrupo({ setVisible, setUpdateScreen }) {
  const [room, setRoom] = useState('');
  const user = auth().currentUser.toJSON();

  function handleButtonCreate() {
    if (room === '') return;
    //1 usuario pode criar só 4 grupos
    firestore().collection('MESSAGE_THREADS')
      .get()
      .then((snapshot) => {
        let myThreads = 0;

        snapshot.docs.map(docItem => {
          if (docItem.data().owner === user.uid) {
            myThreads += 1;
          }
        })

        if (myThreads >= 4) {
          Alert.alert(
            "Atenção!",
            "Você já atingiu o limite de grupo por usuário.",
            [ { text: "OK", onPress: () => {}, style: "cancel" } ]
          )
        } else {
          createRoom();
        }
      })
  }

  function addAllUsersToParticipants(docRef) {
    firestore()
      .collection('USERS')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((userDoc) => {
          const userId = userDoc.id;
          const userData = userDoc.data();
  
          docRef.collection('PARTICIPANTS').doc(userId).set({
            name: userData.name,
            position: 'membro',
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao obter usuários:', error);
      });
  }

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: room,
        owner: user.uid,
        lastMessage: {
          text: `${user.displayName} criou o grupo "${room}"`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      })
      .then((docRef) => {
        docRef.collection('PARTICIPANTS').doc(user.uid).set({
          name: user.displayName,
          position: 'membro',
        });
  
        addAllUsersToParticipants(docRef);

        docRef.collection('MESSAGES').add({
          text: `${user.displayName} criou o grupo "${room}"`,
          createdAt: firestore.FieldValue.serverTimestamp(),
          system: true,
        })
          .then(() => {
            setVisible();
            setUpdateScreen();
          })

      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Text style={styles.title}>Criando novo grupo</Text>
        <TextInput
          value={room}
          onChangeText={(text) => setRoom(text)}
          placeholder="Nome da unidade"
          style={styles.input}
        />

        <TouchableOpacity style={styles.buttonCreate} onPress={handleButtonCreate}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={setVisible}>
          <Text style={{ color: '#000' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34, 34, 34, 0.4)'
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  title: {
    color: '#000',
    marginTop: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
  input: {
    borderRadius: 4,
    height: 45,
    backgroundColor: '#DDD',
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  buttonCreate: {
    borderRadius: 4,
    backgroundColor: '#2E54D4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF'
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})