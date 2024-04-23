/* helpful websites
https://docs.expo.dev/versions/latest/sdk/safe-area-context/
https://reactnative.dev/docs/asyncstorage
https://reactnavigation.org/docs/hello-react-navigation
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './components/login';
import RegisterScreen from './components/register';
import TodoScreen from './components/todo';

const Stack = createNativeStackNavigator();
function App() {
 return(
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
 )
}
export default App