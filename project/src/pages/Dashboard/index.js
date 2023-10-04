import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import SignIn from '../SignIn';

export default function Dashboard(){
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>DASHBOARD = ChatRoom</Text>
      <Button title="Login" 
      onPress={ () => navigation.navigate(SignIn)}/>
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