import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6C63FF" />
      <Text style={styles.text}>Analyzing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // optional background
  },
  text: {
    marginTop: 12,
    fontSize: 18,
    color: 'black',
  },
});

export default Loading;
