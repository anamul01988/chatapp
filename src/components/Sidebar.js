import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { List, Divider, Button, IconButton } from 'react-native-paper';
import { useChat } from '../context/ChatContext';
import { ChatIcons } from './IconSet';

const Sidebar = (props) => {
  const {
    chats,
    currentChat,
    loading,
    loadChats,
    createNewChat,
    loadChat,
    deleteChat,
  } = useChat();

  useEffect(() => {
    loadChats();
  }, []);

  const handleChatPress = (chat) => {
    loadChat(chat.id);
    props.navigation.closeDrawer();
  };

  const handleNewChat = () => {
    createNewChat();
    props.navigation.closeDrawer();
  };

  const handleDeleteChat = (chat) => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete "${chat.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteChat(chat.id),
        },
      ]
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const renderChatItem = ({ item }) => {
    const isSelected = currentChat?.id === item.id;
    const messageCount = item.messages?.length || 0;

    return (
      <TouchableOpacity
        style={[
          styles.chatItem,
          isSelected && styles.selectedChatItem
        ]}
        onPress={() => handleChatPress(item)}
        onLongPress={() => handleDeleteChat(item)}
      >
        <View style={styles.chatContent}>
          <Text style={[
            styles.chatTitle,
            isSelected && styles.selectedChatTitle
          ]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.chatDate}>
            {formatDate(item.timestamp)}
          </Text>
          {messageCount > 0 && (
            <Text style={styles.messageCount}>
              {messageCount} message{messageCount !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
        <IconButton
          icon={() => <ChatIcons.delete size={16} color="#FF3B30" />}
          onPress={() => handleDeleteChat(item)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat History</Text>
          <Button
            mode="contained"
            onPress={handleNewChat}
            style={styles.newChatButton}
            icon={() => <ChatIcons.add size={20} color="#fff" />}
          >
            New Chat
          </Button>
        </View>

        <Divider style={styles.divider} />

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : chats.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats yet</Text>
            <Text style={styles.emptySubtext}>
              Start a new conversation to begin chatting
            </Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.chatList}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  newChatButton: {
    backgroundColor: '#007AFF',
  },
  divider: {
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  selectedChatItem: {
    backgroundColor: '#E3F2FD',
  },
  chatContent: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  selectedChatTitle: {
    color: '#007AFF',
  },
  chatDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  messageCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default Sidebar; 