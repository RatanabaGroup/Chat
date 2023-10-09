import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
        Image, Modal } from 'react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AddButton from '../../components/AddButton';
import ModalGrupo from '../../components/ModalGrupo';

export default function Dashboard(){
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    // console.log(hasUser);
    setUser(hasUser);

  }, [isFocused]);

  function handleSignOut(){
    auth()
    .signOut()
    .then(()=>{
      setUser(null);
      navigation.navigate("SignIn")
    })
    .catch(()=>{
      console.log("Nao ha usuario logado")
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        { user ? (
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity/>
        )}

          <Image style={styles.logo} source={require('../SignIn/snow.png')} />

        <TouchableOpacity>
            <MaterialIcons name="search" size={28} color="#FFF" />
          </TouchableOpacity>
      </View>

      <AddButton setVisible={ () => setModalVisible(true) }  userStatus={user} />

      <Modal 
        visible={modalVisible} 
        animationType='fade'
        transparent={true}
      >
        <ModalGrupo setVisible={ () => setModalVisible(false) } />
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF'
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 34,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#2E54D4',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  logo:{
    width: 60,
    height: 60
  }
})