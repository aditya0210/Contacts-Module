importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
  firebase.initializeApp({
    apiKey: "AIzaSyCV52ww5_5Y3CbdY5rJgwlWosg6LMqIeGY",
    authDomain: "fir-5a2dc.firebaseapp.com",
    databaseURL: "https://fir-5a2dc.firebaseio.com",
    projectId: "fir-5a2dc",
    storageBucket: "fir-5a2dc.appspot.com",
    messagingSenderId: "761202053666",
    appId: "1:761202053666:web:430d3d0b7279aa16fdf07b",
    measurementId: "G-8F5SHCPGDB"
});
  const messaging = firebase.messaging();