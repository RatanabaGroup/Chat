import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatConfig({ data, deleteRoom, userStatus }) {
  
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.nameText}>Participantes</Text>
      </View>

      <TouchableOpacity onPress={() => deleteRoom && deleteRoom()}>
        <View style={styles.row}>

          <View style={styles.content}>
            <Text style={styles.contentText}>{data}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.contentText}>cargo</Text>
          </View>

        </View>

        <View style={styles.bottomBorder} />

      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    justifyContent: 'center'
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  content: {
    flexDirection: 'row',
  },
  contentText: {
    color: '#8B8B8B',
    fontSize: 16,
    marginTop: 2,
  },
  bottomBorder: {
    height: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  }
})
