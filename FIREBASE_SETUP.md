# Firebase Setup for GabutApp

## Firebase Setup Steps:

### 1. Create a Firebase Project

1. Visit the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "gabut-messages")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Set Up Firestore Database

1. In the Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose the location closest to your users (asia-southeast1 for Indonesia)
5. Click "Done"

### 3. Get Firebase Config

1. In the Firebase Console, click the gear icon ⚙️ then "Project settings"
2. Scroll down, click "Add app" and select the web icon "</>"
3. Enter an app name (e.g., "gabut-web")
4. Copy the provided config object
5. Paste it into `src/firebase.js`, replacing "your-api-key" and other placeholders

### 4. Set Up Firestore Rules (Optional - For Security)

1. In Firestore Database, click the "Rules" tab
2. Replace the rules with:

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

### 5. Testing

1. Run `npm run dev`
2. Test the app on localhost
3. Test on other devices using the same IP address
4. Build and deploy for production
