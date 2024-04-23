import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Button, Alert, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phonenumber: '',
    password: '',
    confirmpassword: '',
    email: '',
    zip: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    initializeLoginData();
    validateCompleteForm();
  }, [formData, formErrors]);

  const initializeLoginData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('loginData');
      if (!existingData) {
        const initialData = JSON.stringify([{ username: 'test', password: 'Test1@' }]);
        await AsyncStorage.setItem('loginData', initialData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize login data.');
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  const handleInputBlur = name => {
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    // Define validation for each field
    switch (name) {
      case 'firstname':
      case 'lastname':
        if (/[\d]/.test(value)) {
          error = 'Error: Must not include numbers.';
        }
        break;
      case 'phonenumber':
        if (!/\(\d{3}\) \d{3}-\d{4}/.test(value)) {
          error = 'Error: Must be in the format (xxx) xxx-xxxx.';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Error: Invalid email format.';
        }
        break;
      case 'password':
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value) || !/[^A-Za-z0-9]/.test(value)) {
          error = 'Error: Must include an upper case letter, a lower case letter, a number, and a special character.';
        }
        break;
      case 'confirmpassword':
        if (value !== formData.password) {
          error = 'Error: Passwords do not match.';
        }
        break;
      case 'zip':
        if (!/\d{5}/.test(value)) {
          error = 'Error: Must include 5 digits.';
        }
        break;
    }
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const validateCompleteForm = () => {
    const hasErrors = Object.values(formErrors).some(error => error !== '');
    const hasEmptyFields = Object.values(formData).some(value => value === '');
    setIsFormValid(!hasErrors && !hasEmptyFields);
  };

  const handleRegister = async () => {
    if (isFormValid) {
      try {
        const usersArray = JSON.parse(await AsyncStorage.getItem('loginData')) || [];
        usersArray.push({ username: formData.username, password: formData.password });
        await AsyncStorage.setItem('loginData', JSON.stringify(usersArray));
        setSuccessMessage('Account created successfully!');
        navigation.navigate('Login');
      } catch (error) {
        Alert.alert('Error', 'Failed to register');
      }
    } else {
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.registerTitle}>Register</Text>
        <View style={styles.inputContainer}>
        <Input placeholder="First Name" onChangeText={(value) => handleInputChange('firstname', value)} onBlur={() => handleInputBlur('firstname')} errorMessage={formErrors.firstname} testID="firstname" />
        <Input placeholder="Last Name" onChangeText={(value) => handleInputChange('lastname', value)} onBlur={() => handleInputBlur('lastname')} errorMessage={formErrors.lastname} testID="lastname" />
        <Input placeholder="Username" onChangeText={(value) => handleInputChange('username', value)} onBlur={() => handleInputBlur('username')} errorMessage={formErrors.username} testID="username" />
        <Input placeholder="Phone Number" onChangeText={(value) => handleInputChange('phonenumber', value)} onBlur={() => handleInputBlur('phonenumber')} errorMessage={formErrors.phonenumber} testID="phonenumber" />
        <Input placeholder="Password" onChangeText={(value) => handleInputChange('password', value)} onBlur={() => handleInputBlur('password')} errorMessage={formErrors.password} secureTextEntry={true} testID="password" />
        <Input placeholder="Confirm Password" onChangeText={(value) => handleInputChange('confirmpassword', value)} onBlur={() => handleInputBlur('confirmpassword')} errorMessage={formErrors.confirmpassword} secureTextEntry={true} testID="confirmpassword" />
        <Input placeholder="Email" onChangeText={(value) => handleInputChange('email', value)} onBlur={() => handleInputBlur('email')} errorMessage={formErrors.email} testID="email" />
        <Input placeholder="Zip Code" onChangeText={(value) => handleInputChange('zip', value)} onBlur={() => handleInputBlur('zip')} errorMessage={formErrors.zip} testID="zip" />
        <Button title="Register" onPress={handleRegister} disabled={!isFormValid} />
        </View>
        {successMessage !== '' && <Text style={styles.successMessage}>{successMessage}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  registerTitle: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;

