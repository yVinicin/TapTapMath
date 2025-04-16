import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'

// Operadores que serão utilizados nas equações
let operators = ['+', '-', 'x'];

// Função para embaralhar o array de respostas
function shuffleArray(array) {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Tela principal do jogo
export function GameScreen({ navigation }) {
  
  // Inicializa o cronômetro assim que o jogador muda de tela
  useFocusEffect(
    React.useCallback(() => {
      setTempo(15);
      generateEquation();
  
      const timer = setInterval(() => {
        setTempo((prevTempo) => {
          if (prevTempo <= 1) {
            setStreak(0);
            generateEquation();
            return 15;
          }
          return prevTempo - 1;
        });
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, [])
  );  

  const [equation, setEquation] = useState();    // useState para atualizar a equação
  const [result, setResult] = useState();        // useState para atualizar os resultados
  const [answers, setAnswers] = useState([]);    // useState para atualizar as respostas
  const [tempo, setTempo] = useState(15);        // useState para atualizar o cronômetro
  const [rodando, setRodando] = useState(false); // useState para verificar se o cronômetro está em funcionamento
  const [streak, setStreak] = useState(0);       // useState para exibir a sequência de acertos do jogador

  // Função para gerar uma equação simples
  const generateEquation = () => {
    // Intervalo Minímo e Máximo
    let min = 0;
    let max = 100;

    // Seleciona dois números aleatórios
    let op1 = Math.floor(Math.random() * (max - min)) + min;
    let op2 = Math.floor(Math.random() * (max - min)) + min;

    // Soerteia um operador dentre aqueles que estão no vetor
    let operator = operators[Math.floor(Math.random() * operators.length)];
    if (operator == 'x') {
      op1 = Math.floor(Math.random() * (20 - min)) + min;
      op2 = Math.floor(Math.random() * (15 - min)) + min;
    }

    let eq = `${op1} ${operator} ${op2}`;

    setEquation(eq);

    generateResult(operator, op1, op2);
  };

  // Função para gerar o resultado da equação
  const generateResult = (operator, op1, op2) => {
    let res = 0;

    if (operator == '+') {
      res = op1 + op2;      
    } else if(operator == '-') {
      res = op1 - op2;
    } else {
      res = op1 * op2;
    }

    setResult(res);

    generateAnswers(res);
  };

  // Função para gerar repostas
  const generateAnswers = (res) => {

    // Gerar duas respostas erradas (diferentes da certa)
    let wrong1 = res + Math.floor(Math.random() * 10) + 1;
    let wrong2 = res - (Math.floor(Math.random() * 10) + 1);

    // Embaralhar as opções
    let options = shuffleArray([res, wrong1, wrong2]);

    setAnswers(options);
  };

  // Função para o resetar cronômetro
  const resetStopWatch = () => {
    setTempo(15);
  };

  // Função para incrementar ou decrementar a sequência de acertos
  const checkStreakCounter = (answer) => {
    if (answer == result) {
      setStreak((prevStreak) => prevStreak + 1);
    } else {
      setStreak(0);
    }
  };

  // Função para Verificar se a resposta está correta, Atualizar o streak, Gerar nova equação, Resetar o cronômetro
  const handleAnswer = (answer) => {
    checkStreakCounter(answer);
    generateEquation();
    resetStopWatch();
  };

  return (
    <View style={styles.container}>

    <View style={styles.arrowContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-left" size={20} style={styles.arrow} />
      </TouchableOpacity>
    </View>

    <View style={styles.stopWatchContainer}>
      <Icon name="clock-o" size={22} color={"white"}/>
      <Text style={styles.stopWatch}>{'\t'}{tempo}s</Text>
    </View>

    <Text style={styles.equation}>{equation}</Text>

    <View style={styles.streakCounterContainer}>
      <Icon name="fire" size={30} color={"orange"}/>
      <Text style={styles.streakCounter}>{'\t'}{streak}</Text>
    </View>

    <TouchableOpacity style={styles.responseContainer1} onPress={() => handleAnswer(answers[0])}>
      <Text style={styles.responseText1}>{answers[0]}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.responseContainer2} onPress={() => handleAnswer(answers[1])}>
      <Text style={styles.responseText2}>{answers[1]}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.responseContainer3} onPress={() => handleAnswer(answers[2])}>
      <Text style={styles.responseText3}>{answers[2]}</Text>
    </TouchableOpacity>

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
  arrowContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: '80%'
  },
  arrow: {
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    paddingHorizontal: '10%',
    paddingVertical: '7%',
  },
  stopWatchContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginTop: '15%',
    right: '8%',
    bottom: '96%',
    flexDirection: 'row',
  },
  stopWatch: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
  },
  equation: {
    color: 'rgb(255, 255, 255)',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: '30%'
  },
  streakCounterContainer: {
    marginTop: '20%',
    flexDirection: 'row',
  },
  streakCounter: {
    color: 'rgb(255, 255, 255)',
    fontSize: 23,
    fontWeight: 'bold',
  },
  responseContainer1: {
    numberOfLines: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '20%',
    width: '70%',
    height: '8%',
  },
  responseText1: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
  responseContainer2: {
    numberOfLines: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '10%',
    width: '70%',
    height: '8%',
  },
  responseText2: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
  responseContainer3: {
    numberOfLines: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '10%',
    width: '70%',
    height: '8%',
  },
  responseText3: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
});
