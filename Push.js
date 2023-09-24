// push.js 파일 내용

// pushms.js 파일을 import 또는 require
import pushms from './pushms.js';

// 웹 페이지 내 JavaScript
function triggerPushNotification() {
  // React Native로 메시지를 보내기
  window.ReactNativeWebView.postMessage('TriggerPushNotification');
}

// pushms.js 파일 내의 함수 호출
pushms.someFunction();
