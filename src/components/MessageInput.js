import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { useChat } from '../context/ChatContext';
import { ChatIcons } from './IconSet';

const MessageInput = ({ value, onChangeText, onSend, disabled }) => {
  const { sendMessage } = useChat();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    const text = inputText.trim();
    if (text && !disabled) {
      sendMessage(text);
      setInputText('');
      onChangeText && onChangeText('');
    }
  };

  const handleTextChange = (text) => {
    setInputText(text);
    onChangeText && onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={handleTextChange}
          placeholder="Type a message..."
          placeholderTextColor="#8E8E93"
          multiline
          maxLength={1000}
          editable={!disabled}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || disabled) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || disabled}
        >
          <ChatIcons.send
            size={20}
            color={(!inputText.trim() || disabled) ? "#8E8E93" : "#007AFF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: '#000000',
  },
  sendButton: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default MessageInput; 