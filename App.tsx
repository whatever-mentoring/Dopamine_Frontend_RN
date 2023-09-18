import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: 'http://172.30.1.85:5173/'}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
