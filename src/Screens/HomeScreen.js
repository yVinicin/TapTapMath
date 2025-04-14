import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.GameTitleContainer}>
        <Text style={styles.GameTitle}>Tap Tap</Text>
        <Text style={styles.GameTitle}>Math</Text>
      </View>

      <TouchableOpacity
        style={styles.PlayButtonContainer}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.PlayButton}>Jogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '50%',
  },
  GameTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  GameTitle: {
    color: 'rgb(255, 255, 255)',
    fontSize: 60,
    fontWeight: 'bold',
  },
  PlayButtonContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: '40%',
  },
  PlayButton: {
    color: 'rgb(0, 0, 0)',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
