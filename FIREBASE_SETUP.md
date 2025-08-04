# Setup Firebase untuk Gabut V2

## Langkah-langkah Setup Firebase:

### 1. Buat Project Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Berikan nama project (contoh: "gabut-messages")
4. Disable Google Analytics (opsional)
5. Klik "Create project"

### 2. Setup Firestore Database

1. Di Firebase Console, klik "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih location yang paling dekat dengan users Anda (asia-southeast1 untuk Indonesia)
5. Klik "Done"

### 3. Dapatkan Config Firebase

1. Di Firebase Console, klik ikon gear ⚙️ lalu "Project settings"
2. Scroll ke bawah, klik "Add app" dan pilih icon web "</>"
3. Berikan nama app (contoh: "gabut-web")
4. Copy config object yang diberikan
5. Paste ke file `src/firebase.js`, ganti bagian "your-api-key" dll

### 4. Setup Firestore Rules (Opsional - Untuk Keamanan)

1. Di Firestore Database, klik tab "Rules"
2. Ganti rules dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to messages collection
    match /messages/{messageId} {
      // Anyone can read messages
      allow read: if true;

      // Anyone can create new messages
      allow create: if request.auth == null &&
        request.resource.data.keys().hasAll(['text', 'upvotes', 'downvotes', 'timestamp']) &&
        request.resource.data.text is string &&
        request.resource.data.text.size() <= 1000 &&
        request.resource.data.upvotes == 0 &&
        request.resource.data.downvotes == 0;

      // Anyone can update upvotes/downvotes only
      allow update: if request.auth == null &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['upvotes', 'downvotes']) &&
        (request.resource.data.upvotes == resource.data.upvotes + 1 ||
         request.resource.data.downvotes == resource.data.downvotes + 1);

      // No one can delete (for now)
      allow delete: if false;
    }
  }
}
```

### 5. Update package.json Script (Opsional)

Tambahkan script untuk development dengan Firebase:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:firebase": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 6. Testing

1. Jalankan `npm run dev`
2. Test aplikasi di localhost
3. Test di perangkat lain dengan IP address yang sama
4. Build dan deploy untuk production

## Keuntungan Firebase:

- ✅ Data tersimpan di cloud, bisa diakses dari perangkat manapun
- ✅ Real-time updates (pesan muncul langsung tanpa refresh)
- ✅ Gratis untuk usage kecil-menengah
- ✅ Auto-scaling
- ✅ Tidak perlu setup server backend

## Alternative Cloud Database:

Jika tidak ingin menggunakan Firebase, alternatif lain:

1. **Supabase** (PostgreSQL-based, open source)
2. **PlanetScale** (MySQL-based)
3. **MongoDB Atlas** (NoSQL)
4. **AWS DynamoDB** (NoSQL)
5. **Vercel KV** (Redis-based)

## Langkah Migrasi Data Existing:

Jika Anda sudah punya data di localStorage, buat script migrasi untuk memindahkan data ke Firebase.
