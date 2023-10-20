import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import auth from '@react-native-firebase/auth';

export default function ChatMessage({ data }){
  const user = auth().currentUser.toJSON();

  const date = format(data.createdAt.toDate(), "dd 'de' MMMM 'de' yyyy");

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid
  }, [data])

  async function editMessage(ownerId, uid){

    console.log('oi');

    // edita só ser for o dono
    if(ownerId !== user?.uid) return;

    await firestore()
    .collection('MESSAGES')
    .doc(uid)
    .update();

    console.log('tchau');
  }
  
  return(
    <View style={styles.container}>

      { data.system && <Text style={styles.date}>{date}</Text> }
      
      {/* <Text style={styles.data}>{data.createdAt.toDate().toDateString()}</Text> */}
        
      <TouchableOpacity onPress={editMessage}
        style={[ styles.messageBox, {
          backgroundColor: data.system === true ? 'transparent' : isMyMessage ? '#DCF8C5' : '#FFF',
          marginLeft: isMyMessage ? 50 : 0,
          marginRight: isMyMessage ? 0 : 50 ,
          borderBottomWidth: 1,
          borderBottomColor: data.system === true ? '#000' : 'transparent' }
        ]}
      >        
      
        { !isMyMessage && 
          <Text style={styles.name} >
            {data?.user?.displayName}
          </Text>  
        }

        <Text style={styles.message}>{data.text}</Text>

        { !data.system &&
          <Text style={styles.hour}>
            {data.createdAt.toDate().toJSON().substring(11,16)}
          </Text>
        }
        
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  date:{
    marginLeft: 120,
  },
  container:{
    padding: 10,
  },
  messageBox:{
    borderRadius: 5,
    padding: 10,
  },
  name:{
    color: '#F53745',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hour:{
    marginLeft: 280,
    fontSize: 10
  }
  
})