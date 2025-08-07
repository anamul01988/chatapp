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
  typing: (props) => <Ionicons name="ellipsis-horizontal-outline" {...props} />,
  attachment: (props) => <Ionicons name="attach-outline" {...props} />,
  mic: (props) => <Ionicons name="mic" {...props} />,
  camera: (props) => <Ionicons name="camera" {...props} />,
  image: (props) => <Ionicons name="image" {...props} />,
  file: (props) => <Ionicons name="document-outline" {...props} />,
  location: (props) => <Ionicons name="location" {...props} />,
  heart: (props) => <Ionicons name="heart" {...props} />,
  thumbsUp: (props) => <Ionicons name="thumbs-up-outline" {...props} />,
  thumbsDown: (props) => <Ionicons name="thumbs-down-outline" {...props} />,
  share: (props) => <Ionicons name="share-outline" {...props} />,
  copy: (props) => <Ionicons name="copy-outline" {...props} />,
  edit: (props) => <Ionicons name="create-outline" {...props} />,
  refresh: (props) => <Ionicons name="refresh-outline" {...props} />,
  wifi: (props) => <Ionicons name="wifi" {...props} />,
  wifiOff: (props) => <Ionicons name="wifi-outline" {...props} />,
  checkmark: (props) => <Ionicons name="checkmark-outline" {...props} />,
  warning: (props) => <Ionicons name="warning-outline" {...props} />,
  error: (props) => <Ionicons name="alert-circle-outline" {...props} />,
  info: (props) => <Ionicons name="information-circle-outline" {...props} />,
  help: (props) => <Ionicons name="help-circle-outline" {...props} />,
  star: (props) => <Ionicons name="star-outline" {...props} />,
  bookmark: (props) => <Ionicons name="bookmark-outline" {...props} />,
  time: (props) => <Ionicons name="time-outline" {...props} />,
  calendar: (props) => <Ionicons name="calendar-outline" {...props} />,
  notification: (props) => <Ionicons name="notifications-outline" {...props} />,
  theme: (props) => <Ionicons name="color-palette-outline" {...props} />,
  language: (props) => <Ionicons name="language-outline" {...props} />,
  privacy: (props) => <Ionicons name="shield-outline" {...props} />,
  security: (props) => <Ionicons name="lock-closed-outline" {...props} />,
  logout: (props) => <Ionicons name="log-out-outline" {...props} />,
  login: (props) => <Ionicons name="log-in-outline" {...props} />,
  register: (props) => <Ionicons name="person-add-outline" {...props} />,
  profile: (props) => <Ionicons name="person-circle-outline" {...props} />,
  home: (props) => <Ionicons name="home-outline" {...props} />,
  back: (props) => <Ionicons name="arrow-back-outline" {...props} />,
  forward: (props) => <Ionicons name="arrow-forward-outline" {...props} />,
  up: (props) => <Ionicons name="arrow-up-outline" {...props} />,
  down: (props) => <Ionicons name="arrow-down-outline" {...props} />,
  chevronUp: (props) => <Ionicons name="chevron-up-outline" {...props} />,
  chevronDown: (props) => <Ionicons name="chevron-down-outline" {...props} />,
  chevronLeft: (props) => <Ionicons name="chevron-back-outline" {...props} />,
  chevronRight: (props) => <Ionicons name="chevron-forward-outline" {...props} />,
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