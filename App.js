import React, {useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=683042a2';
  const [state, setState] = useState({
    s: 'Enter a movie',
    results: [],
    selected: {}
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        value={state.s}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 40
  }
});
