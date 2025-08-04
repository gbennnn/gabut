# 🔐 Firebase Setup & Security Guide

## ⚠️ PENTING: Keamanan API Keys

File `firebase.js` berisi **API keys sensitif** yang **TIDAK BOLEH** di-commit ke GitHub!

## 🚀 Setup untuk Development/Production

### 1. Copy Template Firebase Config

```bash
cp src/firebase.template.js src/firebase.js
```

### 2. Dapatkan Firebase Config

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Klik ⚙️ **Settings** > **Project settings**
4. Scroll ke bawah, pilih **Your apps** (icon web `</>`)
5. Copy config object

### 3. Update firebase.js

Ganti placeholder values di `src/firebase.js` dengan config asli Anda:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSy...', // Ganti dengan API key asli
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  // ... config lainnya
}
```

## 🔒 Security Best Practices

### ✅ Yang AMAN untuk GitHub:

- `firebase.template.js` ✅
- `FIREBASE_SETUP.md` ✅
- Code aplikasi tanpa API keys ✅

### ❌ Yang TIDAK BOLEH di GitHub:

- `firebase.js` dengan API keys asli ❌
- `.env` files dengan secrets ❌
- Any file dengan API keys ❌

## 🌐 Deployment ke Production

### Opsi 1: Environment Variables (Vercel/Netlify)

```javascript
// firebase.js for production
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
}
```

Set environment variables di hosting platform:

- `VITE_FIREBASE_API_KEY=your-actual-api-key`
- `VITE_FIREBASE_AUTH_DOMAIN=your-domain`

### Opsi 2: Build Script

Buat script yang otomatis replace template saat build.

## 🔄 Workflow yang Aman

1. **Development:**
   - Copy `firebase.template.js` to `firebase.js`
   - Update dengan config asli
   - Test locally

2. **Before Commit:**
   - Pastikan `firebase.js` ada di `.gitignore`
   - Hanya commit `firebase.template.js`

3. **Team Collaboration:**
   - Share template file di repo
   - Share config asli melalui channel aman (Discord, Slack, etc.)

## 🆘 Jika Sudah Terlanjur Commit API Keys

1. **Immediate:** Regenerate semua API keys di Firebase Console
2. **Git history:** Remove dari git history:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch src/firebase.js' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push:** `git push origin --force --all`

## 📚 Resources

- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/get-started)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)
