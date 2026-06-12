import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const envKeys = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VITE_FIREBASE_APP_ID'
}

const missing = Object.values(envKeys).filter((key) => !import.meta.env[key])

if (missing.length) {
  throw new Error(
    `Missing Firebase config: ${missing.join(', ')}. ` +
    'Copy .env.example to .env, paste your Firebase web app credentials, then restart npm run dev.'
  )
}

const firebaseConfig = Object.fromEntries(
  Object.entries(envKeys).map(([configKey, envKey]) => [configKey, import.meta.env[envKey]])
)

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()

const timestamp = () => firebase.firestore.FieldValue.serverTimestamp()

export { projectAuth, projectFirestore, projectStorage, timestamp }
