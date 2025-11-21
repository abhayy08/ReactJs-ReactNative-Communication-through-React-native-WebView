import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = () => {
  const navigation = useNavigation();

  const [openWebView, toggleWebView] = useState(false);
  const [count, setcount] = useState(0);

  const webviewRef = useRef(null);

  const handleMessage = event => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const { type, msg } = data;
      console.log('From react js', type, msg);

      switch (type) {
        case 'OPEN_RN':
          navigation.navigate('second', { msg });
          break;

        default:
          break;
      }
    } catch (e) {
      console.log('Invalid JSON from Web:', event.nativeEvent.data);
    }
  };

  const sendToWeb = () => {
    webviewRef.current?.postMessage(
      JSON.stringify({ from: 'ReactNative', value: count }),
      setcount(count + 1),
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Open WebView"
        onPress={() => toggleWebView(!openWebView)}
      />
      <Button title="Send to Web" onPress={sendToWeb} />

      {openWebView && (
        <WebView
          ref={webviewRef}
          source={{ uri: 'http://10.1.240.253:5173/' }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
        />
      )}
    </View>
  );
};

export default WebViewScreen;
