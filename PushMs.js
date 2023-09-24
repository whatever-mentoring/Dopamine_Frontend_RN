import React from 'react';
import { AppRegistry, View, WebView } from 'react-native';
import admin from 'firebase-admin'; // Firebase Admin SDK를 사용하기 위한 모듈 import

// // Firebase Admin SDK 초기화
// const serviceAccount = require('./path-to-your-service-account-key.json'); // Firebase 서비스 계정 키 경로
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // Firebase 설정을 여기에 추가
// });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Z7TEtojL978s3hiuFhThPPMMvRq7OBE",
  authDomain: "dopamine-c0cd3.firebaseapp.com",
  projectId: "dopamine-c0cd3",
  storageBucket: "dopamine-c0cd3.appspot.com",
  messagingSenderId: "455059828098",
  appId: "1:455059828098:web:08906ba3df99597c23339b",
  measurementId: "G-3LX3SEPYJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 푸시 알림을 특정 시간에 예약하고 보내는 함수
function schedulePushNotification(notificationTime) {
  // Firebase Cloud Messaging을 사용하여 푸시 알림 보내기
  const message = {
    notification: {
      title: '알림 제목',
      body: '알림 내용',
    },
    token: '푸시 알림을 받을 디바이스의 토큰',
    // 또는
    // topic: '푸시 알림을 받을 주제',
  };

  // 원하는 시간에 푸시 알림 보내기
  admin.messaging().send(message)
    .then((response) => {
      console.log('푸시 알림이 성공적으로 보내졌습니다.', response);
    })
    .catch((error) => {
      console.error('푸시 알림 보내기 실패:', error);
    });
}

class MyWebView extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://dopamine-frontend.vercel.app/' }}
          onMessage={event => {
            const message = event.nativeEvent.data;
            if (message === 'TriggerPushNotification') {
              // 예약된 푸시 알림을 보내기 위한 시간 설정
              const notificationTime = new Date();
              notificationTime.setHours(10, 0, 0); // 오전 10시로 설정
              schedulePushNotification(notificationTime);
            }
          }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => MyWebView); // 앱을 등록

// 다른 함수나 코드들
