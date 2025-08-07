import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AppIcon = ({ size = 24, color = '#007AFF', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="chatbubbles" size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppIcon; 