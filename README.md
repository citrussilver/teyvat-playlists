# teyvat-playlists
A Genshin Impact themed playlists manager muso-ninjas fork

[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)](https://firebase.google.com/)

## Project setup
```
npm install
cp .env.example .env
cp src/firebase/config.example.js src/firebase/config.js
```

Fill in `.env` with your Firebase web app credentials:

1. Open [Firebase Console](https://console.firebase.google.com/) → project **teyvat-playlists**
2. Project settings (gear icon) → **General** → **Your apps** → Web app
3. Copy the config values into `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=teyvat-playlists
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart the dev server after saving `.env`.

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Preview production build locally
```
npm run preview
```
