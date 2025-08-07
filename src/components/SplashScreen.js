import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ChatIcons, BotIcons } from './IconSet';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ChatIcons.chat size={80} color="#007AFF" />
        <BotIcons.ai size={40} color="#007AFF" style={styles.aiIcon} />
      </View>
      <Text style={styles.title}>ChatApp</Text>
      <Text style={styles.subtitle}>AI-Powered Conversations</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  aiIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default SplashScreen; 