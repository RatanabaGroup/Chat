import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView,
  Platform, Image
} from 'react-native';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false); 

  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo}
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
      />
      )}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#99999B"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        placeholderTextColor="#99999B"
      />

      <TouchableOpacity 
        style={[styles.buttonLogin, { backgroundColor: type ? "#EEA262" : "#2E54D4" } ]}
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
    marginRight: 12,
    width: 150, 
    height: 150
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