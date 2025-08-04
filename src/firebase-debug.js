// Debug script untuk testing Firebase connection
import { db } from './firebase.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'

console.log('🔥 Testing Firebase connection...')

// Test 1: Cek apakah db object ada
console.log('📋 Database object:', db)
console.log('📋 Database app:', db.app)
console.log('📋 Database app name:', db.app.name)

// Test 2: Coba baca collection messages
const testRead = async () => {
  try {
    console.log('📖 Testing read from messages collection...')
    const messagesRef = collection(db, 'messages')
    const snapshot = await getDocs(messagesRef)
    console.log('✅ Read successful! Document count:', snapshot.size)

    snapshot.forEach((doc) => {
      console.log('📄 Document:', doc.id, doc.data())
    })
  } catch (error) {
    console.error('❌ Read failed:', error)
  }
}

// Test 3: Coba tulis ke collection messages
const testWrite = async () => {
  try {
    console.log('✍️ Testing write to messages collection...')
    const messagesRef = collection(db, 'messages')
    const docRef = await addDoc(messagesRef, {
      text: 'Test message from debug script',
      upvotes: 0,
      downvotes: 0,
      timestamp: new Date(),
      createdAt: new Date().toISOString(),
    })
    console.log('✅ Write successful! Document ID:', docRef.id)
  } catch (error) {
    console.error('❌ Write failed:', error)
    console.error('Error details:', error.code, error.message)
  }
}

// Jalankan tests
testRead()
testWrite()
