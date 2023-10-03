import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

export default function Dashboard(){
  return (
    <View style={styles.container}>
      <Text>DASHBOARD</Text>
      <Text>Nome: AAA</Text>
      <Text>Mensagem: aaa</Text>
      <Text>Nome: BBB</Text>
      <Text>Mensagem: bbb</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});