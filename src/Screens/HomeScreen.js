import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Tela inicial do jogo
export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.gameTitleContainer}>
        <Text style={styles.gameTitle}>Tap Tap</Text>
        <Text style={styles.gameTitle}>Math</Text>
      </View>

      <TouchableOpacity
        style={styles.playButtonContainer}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.playButton}>Jogar</Text>
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
  gameTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  gameTitle: {
    color: 'rgb(255, 255, 255)',
    fontSize: 60,
    fontWeight: 'bold',
  },
  playButtonContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: '40%',
  },
  playButton: {
    color: 'rgb(0, 0, 0)',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
