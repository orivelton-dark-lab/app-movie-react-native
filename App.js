import React, { useState  } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

export default function App() {
  const apiUrl = 'http://www.omdbapi.com/?apikey=683042a2';
  const [state, setState] = useState({
    s: 'Enter a movie',
    results: [],
    selected: {}
  });

  const search = () => {
    state.s && axios(`${apiUrl}&s=${state.s}`).then(({data}) => {
      const { Search: results, Error: error } = data;
      
      !error && setState(prevState => {
        return {...prevState, results }
      });
    });
  };

  const openPopup = id => {
    axios(`${apiUrl}&i=${id}`).then(({data}) => {
      let result = data;
      setState(prevState => {
        return {...prevState, selected: result }
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      
      <TextInput 
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {
          state.results.map(result => (
            <TouchableHighlight
              key={result.imdbID}
              onPress={() => openPopup(result.imdbID)}
            > 
              <View style={styles.result}>
                <Image 
                  source={{ uri: result.Poster }}
                  style={{ width: '100%', height: 300, marginHorizontal: 'auto' }}
                  resizeMode="cover"
                />
                <Text style={styles.heading}> 
                  {result.Title}
                </Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
        <View style={styles.popup}>
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
          <Text style={{marginBottom: 20}}>Plot: {state.selected.Plot}</Text>
          <TouchableHighlight
            onPress={() => setState(prevState => {
              return {...prevState, selected: {}}
            })}
          >
            <Text style={styles.closeBtn}>{'< Back'}</Text>
          </TouchableHighlight>
        </View>
      </Modal>
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
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  popup: {
    padding: 20,
    paddingTop: 100
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    backgroundColor: '#2484c4'
  }
});
