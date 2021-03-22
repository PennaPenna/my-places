import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Button, Input, ListItem } from 'react-native-elements';


export default function SavedPlaces({navigation}) {
  const[address, setAddress] = useState('');
  const[list, setList] = useState([]);

  const db  = SQLite.openDatabase('placesdb.db');

  useEffect(() => {
    db.transaction(tx  => {
      tx.executeSql('create table if not exists list (id integer primary key not null, address text);');
    },  null, updateList);
  }, []); 

  const saveItem = () => {
    db.transaction(tx => {
      tx .executeSql('insert into list (address) values(?);',
        [address]);
    }, null, updateList
  )
}

  const deleteItem = (id) => {
      db.transaction(
        tx => { tx.executeSql('delete from list where id = ?;', [id]);}, null, updateList)
        alert('Address deleted!')
    }


const updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from list;', 
    [], (_, { rows }) => 
      setList(rows._array)
      ); 
  });
  setAddress('');
}

   return (
    <View style={styles.container}>
      <Input style={styles.input}
        name='PLACEFINDER'
        value={address}
        placeholder="Type in address"
        onChangeText={(address) => setAddress(address)}
      />
     <View style={styles.button}>
       <Button raised 
        titleStyle={{ fontSize: 14 }}
        title="SAVE" 
        icon={{ type:"material", name: "save", size: 20, color:'white' }} 
        onPress={saveItem}/>
       </View>
       <View style={styles.listcontainer}>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.address}</ListItem.Title>
        </ListItem.Content>
        <Button type="clear" 
                titleStyle={{fontSize: 10, color:'#bababa'}}
                icon={{ type:"material", name: "place", size: 20, color:'#bababa' }} 
                title="show on map" iconPlace 
                onPress={() => navigation.navigate('PlaceOnMap',  
                {address: l.address,
                })}
                onLongPress={()  =>  deleteItem(l.id) }/>
      </ListItem>
    ))
  }
</View>
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: 'center',
  width:'100%',
 },
 input: {
  fontSize: 14, 
  padding:5, 
  marginTop:10,
 }, 
 button: {
 width: '60%',
 margin:10,
 },
 listcontainer: { 
  width:'100%',
  marginTop:5,
},
});
