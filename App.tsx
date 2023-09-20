import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

function App(): JSX.Element {
  const [permission, setPermission] = useState('false');
  async function requestPermission() {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.CAMERA'] &&
          result['android.permission.READ_MEDIA_IMAGES'] === 'granted'
          // result['android.permission.READ_EXTERNAL_STORAGE']
          // result['android.permission.WRITE_EXTERNAL_STORAGE']
        ) {
          console.log('모든 권한 획득');
          setPermission('true');
        } else {
          console.log(result);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: 'http://172.30.1.85:5173/'}}
        ref={ref => (this.webview = ref)}
        onMessage={event => {
          if (event.nativeEvent.data === 'check permission') {
            this.webview.postMessage(permission);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
