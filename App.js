import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ChatScreen from './src/screens/ChatScreen';
import Sidebar from './src/components/Sidebar';
import { ChatProvider } from './src/context/ChatContext';
import SplashScreen from './src/components/SplashScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <ChatProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Drawer.Navigator
              drawerContent={(props) => <Sidebar {...props} />}
              screenOptions={{
                headerShown: false,
                drawerStyle: {
                  width: 280,
                },
              }}
            >
              <Drawer.Screen 
                name="Chat" 
                component={ChatScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </ChatProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
} 