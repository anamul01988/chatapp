import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Chat related icons
export const ChatIcons = {
  send: (props) => <Ionicons name="send" {...props} />,
  menu: (props) => <Ionicons name="menu" {...props} />,
  add: (props) => <Ionicons name="add" {...props} />,
  delete: (props) => <Ionicons name="trash" {...props} />,
  chat: (props) => <Ionicons name="chatbubbles" {...props} />,
  close: (props) => <Ionicons name="close" {...props} />,
  search: (props) => <Ionicons name="search" {...props} />,
  settings: (props) => <Ionicons name="settings" {...props} />,
  user: (props) => <Ionicons name="person" {...props} />,
  bot: (props) => <Ionicons name="robot" {...props} />,
  typing: (props) => <Ionicons name="ellipsis-horizontal" {...props} />,
  attachment: (props) => <Ionicons name="attach" {...props} />,
  mic: (props) => <Ionicons name="mic" {...props} />,
  camera: (props) => <Ionicons name="camera" {...props} />,
  image: (props) => <Ionicons name="image" {...props} />,
  file: (props) => <Ionicons name="document" {...props} />,
  location: (props) => <Ionicons name="location" {...props} />,
  heart: (props) => <Ionicons name="heart" {...props} />,
  thumbsUp: (props) => <Ionicons name="thumbs-up" {...props} />,
  thumbsDown: (props) => <Ionicons name="thumbs-down" {...props} />,
  share: (props) => <Ionicons name="share" {...props} />,
  copy: (props) => <Ionicons name="copy" {...props} />,
  edit: (props) => <Ionicons name="create" {...props} />,
  refresh: (props) => <Ionicons name="refresh" {...props} />,
  wifi: (props) => <Ionicons name="wifi" {...props} />,
  wifiOff: (props) => <Ionicons name="wifi-outline" {...props} />,
  checkmark: (props) => <Ionicons name="checkmark" {...props} />,
  warning: (props) => <Ionicons name="warning" {...props} />,
  error: (props) => <Ionicons name="alert-circle" {...props} />,
  info: (props) => <Ionicons name="information-circle" {...props} />,
  help: (props) => <Ionicons name="help-circle" {...props} />,
  star: (props) => <Ionicons name="star" {...props} />,
  bookmark: (props) => <Ionicons name="bookmark" {...props} />,
  time: (props) => <Ionicons name="time" {...props} />,
  calendar: (props) => <Ionicons name="calendar" {...props} />,
  notification: (props) => <Ionicons name="notifications" {...props} />,
  theme: (props) => <Ionicons name="color-palette" {...props} />,
  language: (props) => <Ionicons name="language" {...props} />,
  privacy: (props) => <Ionicons name="shield" {...props} />,
  security: (props) => <Ionicons name="lock-closed" {...props} />,
  logout: (props) => <Ionicons name="log-out" {...props} />,
  login: (props) => <Ionicons name="log-in" {...props} />,
  register: (props) => <Ionicons name="person-add" {...props} />,
  profile: (props) => <Ionicons name="person-circle" {...props} />,
  home: (props) => <Ionicons name="home" {...props} />,
  back: (props) => <Ionicons name="arrow-back" {...props} />,
  forward: (props) => <Ionicons name="arrow-forward" {...props} />,
  up: (props) => <Ionicons name="arrow-up" {...props} />,
  down: (props) => <Ionicons name="arrow-down" {...props} />,
  chevronUp: (props) => <Ionicons name="chevron-up" {...props} />,
  chevronDown: (props) => <Ionicons name="chevron-down" {...props} />,
  chevronLeft: (props) => <Ionicons name="chevron-back" {...props} />,
  chevronRight: (props) => <Ionicons name="chevron-forward" {...props} />,
};

// Status icons
export const StatusIcons = {
  online: (props) => <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />,
  offline: (props) => <View style={[styles.statusDot, { backgroundColor: '#9E9E9E' }]} />,
  busy: (props) => <View style={[styles.statusDot, { backgroundColor: '#FF9800' }]} />,
  away: (props) => <View style={[styles.statusDot, { backgroundColor: '#FFC107' }]} />,
};

// AI/Bot specific icons
export const BotIcons = {
  ai: (props) => <MaterialIcons name="smart-toy" {...props} />,
  brain: (props) => <FontAwesome5 name="brain" {...props} />,
  magic: (props) => <FontAwesome5 name="magic" {...props} />,
  sparkles: (props) => <FontAwesome5 name="sparkles" {...props} />,
};

const styles = StyleSheet.create({
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default {
  ChatIcons,
  StatusIcons,
  BotIcons,
}; 