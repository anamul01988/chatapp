# 🐛 Troubleshooting Guide

## Common Expo Errors & Solutions

### **1. Vector Icons Not Loading**
**Error**: `Cannot find module '@expo/vector-icons'`

**Solution**:
```bash
# Clear cache and reinstall
npx expo start --clear
npm install @expo/vector-icons
```

### **2. Metro Bundler Issues**
**Error**: Metro bundler crashes or shows errors

**Solutions**:
```bash
# Clear Metro cache
npx expo start --clear

# Reset cache completely
npx expo start --reset-cache

# Kill Metro and restart
npx kill-port 8081
npx expo start
```

### **3. Socket.IO Connection Issues**
**Error**: `Socket connection failed` or `Cannot connect to localhost`

**Solutions**:
1. **Ensure backend servers are running**:
   ```bash
   npm run dev
   ```

2. **Check if ports are available**:
   ```bash
   # Kill processes on ports 3000 and 3001
   npx kill-port 3000 3001
   ```

3. **For physical device testing**:
   - Use your computer's IP address instead of localhost
   - Update `ChatContext.js`:
   ```javascript
   socketRef.current = io('http://YOUR_IP_ADDRESS:3000');
   ```

### **4. JSON Server Issues**
**Error**: `Cannot connect to JSON Server`

**Solutions**:
```bash
# Check if JSON Server is running
curl http://localhost:3001/chats

# Restart JSON Server
npm run json-server

# Check db.json syntax
node -e "JSON.parse(require('fs').readFileSync('backend/db.json'))"
```

### **5. React Navigation Errors**
**Error**: `Navigation container not found`

**Solution**:
- Ensure `NavigationContainer` wraps your navigator
- Check that all navigation dependencies are installed

### **6. React Native Paper Issues**
**Error**: `Provider not found`

**Solution**:
- Ensure `PaperProvider` wraps your app
- Check React Native Paper version compatibility

### **7. Gesture Handler Issues**
**Error**: `Gesture handler not found`

**Solution**:
```bash
# Reinstall gesture handler
npm install react-native-gesture-handler

# Clear cache
npx expo start --clear
```

### **8. Expo CLI Issues**
**Error**: `Expo CLI not found`

**Solution**:
```bash
# Install Expo CLI globally
npm install -g @expo/cli

# Or use npx
npx expo start
```

### **9. Device/Simulator Issues**

#### **Android Issues**:
```bash
# Check Android Studio installation
# Ensure ANDROID_HOME is set
echo $ANDROID_HOME

# Start Android emulator
emulator -list-avds
emulator -avd YOUR_AVD_NAME
```

#### **iOS Issues** (macOS only):
```bash
# Check Xcode installation
xcode-select --install

# Open iOS Simulator
open -a Simulator
```

### **10. Network Issues**

#### **Localhost Issues on Physical Device**:
1. Find your computer's IP address:
   ```bash
   # On Windows
   ipconfig

   # On macOS/Linux
   ifconfig
   ```

2. Update the socket connection in `ChatContext.js`:
   ```javascript
   // Replace localhost with your IP
   socketRef.current = io('http://192.168.1.100:3000');
   ```

3. Update JSON Server connection:
   ```javascript
   const response = await axios.get('http://192.168.1.100:3001/chats');
   ```

### **11. Performance Issues**

#### **Slow Loading**:
```bash
# Enable Hermes engine (in app.json)
{
  "expo": {
    "jsEngine": "hermes"
  }
}
```

#### **Memory Issues**:
- Use `FlatList` for large lists
- Implement proper cleanup in `useEffect`
- Use `React.memo` for expensive components

### **12. Build Issues**

#### **EAS Build Errors**:
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for development
eas build --platform android --profile development
```

### **13. Debugging Tips**

#### **Enable Debug Mode**:
```javascript
// In ChatContext.js
console.log('Socket connected:', socketRef.current?.connected);
console.log('Messages:', messages);
```

#### **React Native Debugger**:
```bash
# Install React Native Debugger
# Download from: https://github.com/jhen0409/react-native-debugger
```

#### **Expo Dev Tools**:
- Press `d` in terminal to open Dev Tools
- Use `console.log()` for debugging
- Check Metro bundler logs

### **14. Environment Setup Issues**

#### **Node.js Version**:
```bash
# Check Node.js version (should be 14+)
node --version

# Use nvm to switch versions
nvm use 16
```

#### **npm/yarn Issues**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **15. Platform-Specific Issues**

#### **iOS Specific**:
- Ensure Xcode is up to date
- Check iOS deployment target
- Verify signing certificates

#### **Android Specific**:
- Check Android SDK installation
- Verify ANDROID_HOME environment variable
- Update Android Studio and SDK tools

## 🚨 Emergency Fixes

### **Complete Reset**:
```bash
# 1. Clear all caches
npx expo start --clear --reset-cache

# 2. Delete node_modules
rm -rf node_modules package-lock.json

# 3. Reinstall dependencies
npm install

# 4. Restart Expo
npx expo start
```

### **Backend Reset**:
```bash
# 1. Kill all Node processes
npx kill-port 3000 3001 8081

# 2. Restart backend servers
npm run dev

# 3. Restart Expo
npx expo start
```

## 📞 Getting Help

1. **Check Expo Documentation**: https://docs.expo.dev/
2. **React Native Issues**: https://github.com/facebook/react-native/issues
3. **Expo Forums**: https://forums.expo.dev/
4. **Stack Overflow**: Tag with `expo`, `react-native`

## 🔧 Development Tips

1. **Use Expo Go app** for quick testing
2. **Enable Fast Refresh** for faster development
3. **Use TypeScript** for better error catching
4. **Implement proper error boundaries**
5. **Test on both iOS and Android regularly** 