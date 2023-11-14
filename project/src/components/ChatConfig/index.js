import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

export default function ChatConfig({ route }) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const participantsSnapshot = await firestore()
        .collection('MESSAGE_THREADS')
        .doc(route.params.thread.name)
        .collection('PARTICIPANTS')
        .get();

      const participantsData = participantsSnapshot.docs.map((doc) => doc.data());
      setParticipants(participantsData);
    };

    fetchParticipants();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.nameText}>Participantes</Text>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.row}>
              <View style={styles.content}>
                <Text style={styles.contentName}>{item.name}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.contentCargo}>{item.position}</Text>
              </View>
            </View>
            <View style={styles.bottomBorder} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  nameText: {
    fontSize: 24,
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
    marginHorizontal: 30
  },
  content: {
    flexDirection: 'row',
  },
  contentName: {
    color: '#000',
    fontSize: 18,
    marginTop: 2,
  },
  contentCargo: {
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
