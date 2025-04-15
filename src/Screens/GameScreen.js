import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  // Exibe a equação assim que o jogador entra na tela do jogo
  useEffect(() => {
    generateEquation();
  }, []);

  const [equation, setEquation] = useState();
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);

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
      op1 = Math.floor(Math.random() * (max - min)) + min;
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

  return (
    <View style={styles.container}>

    <View style={styles.arrowContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-left" size={20} style={styles.arrow} />
      </TouchableOpacity>
    </View>

    <Text style={styles.equation}>{equation}</Text>

    <TouchableOpacity style={styles.responseContainer1} onPress={() => generateEquation()}>
      <Text style={styles.responseText1}>{answers[0]}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.responseContainer2} onPress={() => generateEquation()}>
      <Text style={styles.responseText2}>{answers[1]}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.responseContainer3} onPress={() => generateEquation()}>
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
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  equation: {
    color: 'rgb(255, 255, 255)',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: '35%'
  },
  responseContainer1: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '50%'
  },
  responseText1: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
  responseContainer2: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '10%'
  },
  responseText2: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
  responseContainer3: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: '10%'
  },
  responseText3: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
});
