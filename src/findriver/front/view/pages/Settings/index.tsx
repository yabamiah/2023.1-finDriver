import React, { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

import styles from './styles';
import dados from '../../../dados';

const Settings = ({ navigation }) => {
  const [token, setToken] = useState('');

  const exitAccount = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja sair?\nVocê será desconectado da sua conta atual.',
      [
        { text: 'Sair',
          onPress: () => {navigation.navigate("Bem-Vindo")},
          style: 'destructive' },
        
        { text: 'Cancelar',
          onPress: () => {},
          style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>   
      <Image source={require('../../assets/logoBranca.png')} style={styles.logo} />
      <Text style={styles.title}>Ajustes</Text>
      
      <View style={styles.buttonArea}> 
        <Pressable style={styles.button} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.textButton}>Meu Perfil</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Carro')}>
          <Text style={styles.textButton}>Meu Carro</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={exitAccount}>
          <Text style={styles.textButton}>Sair</Text>
        </Pressable>
      </View>
    
    </View>
  );
};

export default Settings;