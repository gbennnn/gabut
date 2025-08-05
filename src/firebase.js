// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// Using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC1YQh-yoKzyD_WpXlyh7puxsw9f9VEnqE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'gabut-a83ec.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gabut-a83ec',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'gabut-a83ec.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '299498256823',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:299498256823:web:428ba04a6c501469b55032',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
