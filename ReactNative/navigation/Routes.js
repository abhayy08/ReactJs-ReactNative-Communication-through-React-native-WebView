import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from '../screens/WebViewScreen';
import RNScreen from '../screens/RNScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="first" component={WebViewScreen} />
      <Stack.Screen name="second" component={RNScreen} />
    </Stack.Navigator>
  );
};

export default Routes;

const styles = StyleSheet.create({});
