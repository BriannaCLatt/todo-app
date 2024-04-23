import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    initializeLoginData();
  }, []);

  const initializeLoginData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('loginData');
      if (!existingData) {
        const initialData = JSON.stringify();
        await AsyncStorage.setItem('loginData', initialData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize login data.');
    }
  };

  const handleLogin = async () => {
    try {
      const loginInfo = await AsyncStorage.getItem('loginData');
      const loginData = loginInfo ? JSON.parse(loginInfo) : [];
      const userExists = loginData.some(user => user.username === username && user.password === password);

      if (userExists) {
        navigation.navigate('Todo');
      } else {
        setLoginError('Invalid username or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read login data.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.inputContainer}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        testID="login-username"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="login-password"
      />
      </View>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <View style={styles.buttonContainer}>
      <Button title="Login" onPress={handleLogin} testID="login-button" />
      <Button title="Register" onPress={() => navigation.navigate('Register')} testID="login-register" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20, 
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  space: {
    width: 20
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;

