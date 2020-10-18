import React from "react"
import firebase from "firebase/app"
import "firebase/analytics"

import App from "./src/components/App"

export const onClientEntry = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA0NSf6LngNsgu5Dkp0iWubzgV0fVPbW2M",
    authDomain: "lcdsmao-blog.firebaseapp.com",
    databaseURL: "https://lcdsmao-blog.firebaseio.com",
    projectId: "lcdsmao-blog",
    storageBucket: "lcdsmao-blog.appspot.com",
    messagingSenderId: "574618045726",
    appId: "1:574618045726:web:f60fdabe7a0b771465cd0f",
    measurementId: "G-8NP75V6LP7",
  }
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}

export const wrapPageElement = ({ element }) => <App>{element}</App>
