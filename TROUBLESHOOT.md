# 🔍 Firebase Troubleshooting Checklist

## Masalah: Data tidak masuk ke Firestore

### ✅ Langkah-langkah Debugging:

#### 1. **Cek Browser Console**

- Buka Developer Tools (F12)
- Lihat tab Console untuk error messages
- Cari log messages yang dimulai dengan 🔥, 📝, ✅, atau ❌

#### 2. **Verifikasi Firebase Project Setup**

- ✅ Apakah project ID di firebase.js sama dengan di Firebase Console?
- ✅ Apakah Firestore Database sudah dibuat?
- ✅ Apakah collection "messages" sudah ada?

#### 3. **Cek Firestore Rules**

Di Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read, write: if true;  // Untuk testing saja!
    }
  }
}
```

#### 4. **Verifikasi Network Connection**

- Cek Network tab di Developer Tools
- Lihat apakah ada request ke firestore.googleapis.com
- Cek status code response (200 = OK, 403 = Permission denied)

#### 5. **Common Error Solutions**

**Error: "Missing or insufficient permissions"**

```javascript
// Solution: Update Firestore rules
allow read, write: if true;
```

**Error: "Failed to get document"**

```javascript
// Solution: Pastikan collection "messages" ada
```

**Error: "Network error"**

```javascript
// Solution: Cek internet connection & Firebase config
```

**Error: "Invalid API key"**

```javascript
// Solution: Re-generate API key di Firebase Console
```

#### 6. **Manual Test di Firebase Console**

1. Buka Firebase Console > Firestore
2. Klik "Start collection" jika belum ada
3. Collection ID: `messages`
4. Add document manual dengan struktur:
   ```json
   {
     "text": "Test message",
     "upvotes": 0,
     "downvotes": 0,
     "timestamp": "current timestamp"
   }
   ```

#### 7. **Cek File Configuration**

- ✅ main.js mengimport App.vue (bukan App-LocalStorage.vue)
- ✅ firebase.js ada dan tidak di-gitignore locally
- ✅ npm install firebase sudah dijalankan

#### 8. **Debug Steps**

1. Test basic Firebase connection
2. Test read from Firestore
3. Test write to Firestore
4. Test real-time listener

### 🚨 **Emergency Reset**

Jika masih tidak bisa:

1. Hapus dan buat ulang Firestore database
2. Generate ulang API keys
3. Clear browser cache dan localStorage
4. Restart development server

### 📞 **Contact Debug Info**

Jika masih error, berikan:

- Browser console logs lengkap
- Firebase project ID
- Error message spesifik
- Screenshot Firebase Console
