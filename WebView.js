import React from 'react';
import { View, WebView } from 'react-native';
import WebViewScript from './pushms.js'; // pushms.js 파일을 import

class MyWebView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://www.challeng9.kro.kr:9000/' }}
          injectedJavaScript={`
            // push.js 파일을 주입
            ${require('./push.js')}

            // React Native 웹뷰와 상호 작용할 수 있는 코드
            ${WebViewScript}
          `}
        />
      </View>
    );
  }
}
