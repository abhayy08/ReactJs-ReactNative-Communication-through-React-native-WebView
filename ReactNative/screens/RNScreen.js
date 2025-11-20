import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RNScreen = ({ route }) => {
  const data = route.params.msg;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{data}</Text>
    </View>
  );
};

export default RNScreen;

const styles = StyleSheet.create({});
