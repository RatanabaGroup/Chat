import React, { useState, useEffect } from 'react';

import {
  View, StyleSheet, SafeAreaView, FlatList,
  KeyboardAvoidingView, Platform, TextInput, TouchableOpacity,
  PermissionsAndroid, Dimensions, Alert
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import ChatMessage from '../../components/ChatMessage';

import Feather from 'react-native-vector-icons/Feather';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function Chat({ route }) {

  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const user = auth().currentUser.toJSON();

  const { width, height } = Dimensions.get('screen');
  const [region, setRegion] = useState(null);
  // const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const unsubscribeListener = firestore().collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data()
          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData
          }
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName
            }
          }
          return data;
        })
        setMessages(messages)
      })
    return () => unsubscribeListener()

    getLocation()

  }, []);

  async function handleSend() {
    if (input === '') return;

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName
        }
      })

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set({
        lastMessage: {
          text: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      }, { merge: true }
      )
    setInput('');
  }

  function alertMap(){
    Alert.alert( 
      "Atenção!", "Deseja compartilhar sua localização?",
        [ { text: "Cancelar", onPress: () => {}, style: "cancel" }, 
          { text: "Sim", onPress: () => getLocation() } ]
    )
  }

  function getLocation() {
    Geolocation.getCurrentPosition(info => {
      // console.log("LAT", info.coords.latitude)
      // console.log("LONG ", info.coords.longitude)
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    },
      () => { console.log("DEU ALGUM ERRO") }, {
      enableHighAccuracy: true,
      timeout: 2000,
    })
  }

  // function newMarker(e) {
  //   let dates = {
  //     key: markers.length,
  //     coords: {
  //       latitude: e.nativeEvent.coordinate.latitude,
  //       longitude: e.nativeEvent.coordinate.longitude
  //     },
  //     pinColor: '#ff0000'
  //   }
  //   setRegion({
  //     latitude: e.nativeEvent.coordinate.latitude,
  //     longitude: e.nativeEvent.coordinate.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421
  //   })
  //   setMarkers(oldArray => [...oldArray, dates])
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatMessage data={item} thread={thread?._id} />}
        inverted={true}
      />

      {region && (
        <MapView
          onMapReady={() => {
            Platform.OS === 'android' ?
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then(() => {
                  console.log("USUARIO ACEITOU")
                })
              : ''
          }}
          style={{ width: width, height: height }}
          region={region}
          zoomEnabled={true}
          minZoomLevel={18}
          showsUserLocation={true}
          LoadingEnabLed={true}
          // onPress={(e) => newMarker(e)}
        >
          {/* {markers.map(marker => {
            return (
              <Marker key={marker.key} coordinate={marker.coords} pinColor={marker.pinColor} />
            )
          })} */}
          <Marker coordinate={region} />
        </MapView>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={-100}
      >
        <View style={styles.containerInput}>

          <TouchableOpacity onPress={alertMap}>
            <View style={styles.buttonMap}>
              <Feather name="map" size={22} color="#808080" />
            </View>
          </TouchableOpacity>

          <View style={styles.mainContainerInput}>
            <TextInput
              placeholder="Hable..."
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
              multiline={true}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity onPress={handleSend}>
            <View style={styles.buttonContainer}>
              <Feather name="send" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerInput: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end'
  },
  mainContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 130,
    minHeight: 48,
  },
  buttonContainer: {
    backgroundColor: '#51c880',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonMap: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  }
})