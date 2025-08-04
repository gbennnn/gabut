// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC1YQh-yoKzyD_WpXlyh7puxsw9f9VEnqE',
  authDomain: 'gabut-a83ec.firebaseapp.com',
  projectId: 'gabut-a83ec',
  storageBucket: 'gabut-a83ec.firebasestorage.app',
  messagingSenderId: '299498256823',
  appId: '1:299498256823:web:428ba04a6c501469b55032',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
