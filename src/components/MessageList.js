import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, formatTimestamp }) => {
  const renderMessage = ({ item }) => (
    <MessageBubble
      message={item}
      formatTimestamp={formatTimestamp}
    />
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={keyExtractor}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      inverted={false}
      automaticallyAdjustKeyboardInsets={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
});

export default MessageList; 