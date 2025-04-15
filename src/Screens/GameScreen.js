import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export function GameScreen({ navigation }) {
  return (
    <View style={styles.container}>

    <View style={styles.ArrowContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-left" size={20} style={styles.Arrow} />
      </TouchableOpacity>
    </View>

    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },
  ArrowContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: '80%'
  },
  Arrow: {
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});
