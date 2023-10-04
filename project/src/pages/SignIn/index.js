import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView,
  Platform, Image
} from 'react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation }  from '@react-navigation/native'

export default function SignIn() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false); 

  const [imageSize, setImageSize] = useState(150); 
  const [inputFocused, setInputFocused] = useState(false); 
  
  const handleInputFocus = () => {
    setImageSize(0);
    setInputFocused(true);
  }
  const handleInputBlur = () => {
    setImageSize(150);
    setInputFocused(false);
  }

  function handleLogin(){
    if (type) {
      // Cadastrar
      if (name === '' || email === '' || password === '') return;

      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name
        })
        .then(()=>{
          navigation.goBack();
        })

      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
    
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email já em uso!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Senha inválida!');
        }
      })

    } else {

      // Login
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        navigation.goBack();
      })
      .catch((error)=>{
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Senha inválida!');
        }
      })

    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image
        style={{
          ...styles.logo,
          width: inputFocused ? 0 : imageSize,
          height: inputFocused ? 0 : imageSize,
        }}
        source={require('./snow.png')}
      />
      <Text style={styles.title}>Ratanaba</Text>
      <Text style={{ marginBottom: 20, color: '#121212', }}>
        Fale na mesma língua de seus amigos!
      </Text>

      { type && (
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nome"
        placeholderTextColor="#99999B"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      )}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#99999B"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <TextInput
        style={styles.input}
        value={password}
        type="password"
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        placeholderTextColor="#99999B"
        secureTextEntry={true}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <TouchableOpacity 
        style={[styles.buttonLogin, { backgroundColor: type ? "#EEA262" : "#2E54D4" } ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {type ? "Cadastrar" : "Acessar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => setType(!type) }>
        <Text style={{ color: '#121212' }}>
          {type ? "Já possuo uma conta" : "Criar uma nova conta"}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    marginRight: 12
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
  },
  input: {
    color: '#121212',
    backgroundColor: '#EBEBEB',
    width: '90%',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50,
  },
  buttonLogin:{
    width: '90%',
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 19
  }
});