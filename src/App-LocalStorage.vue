<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'

// State untuk input pesan
const message = ref('')

// State untuk menyimpan semua pesan
const messages = reactive([])

// State untuk sorting
const sortBy = ref('score-desc') // 'score-desc', 'score-asc', 'newest', 'oldest'

// Counter untuk ID unik setiap pesan
let messageId = 0

// Key untuk localStorage
const STORAGE_KEY = 'gabut-vote-messages'

// Computed property untuk pesan yang sudah diurutkan
const sortedMessages = computed(() => {
  const messagesCopy = [...messages]

  switch (sortBy.value) {
    case 'score-desc':
      return messagesCopy.sort((a, b) => getScore(b) - getScore(a))
    case 'score-asc':
      return messagesCopy.sort((a, b) => getScore(a) - getScore(b))
    case 'newest':
      return messagesCopy.sort((a, b) => b.id - a.id)
    case 'oldest':
      return messagesCopy.sort((a, b) => a.id - b.id)
    default:
      return messagesCopy
  }
})

// Fungsi untuk menyimpan data ke localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages: messages,
        messageId: messageId,
        sortBy: sortBy.value,
      }),
    )
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Fungsi untuk memuat data dari localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      if (data.messages && Array.isArray(data.messages)) {
        // Clear array dan push data yang dimuat
        messages.splice(0, messages.length, ...data.messages)
        messageId = data.messageId || 0
        sortBy.value = data.sortBy || 'score-desc'
      }
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }
}

// Fungsi untuk submit pesan
const submitMessage = () => {
  if (message.value.trim()) {
    messages.push({
      id: messageId++,
      text: message.value.trim(),
      upvotes: 0,
      downvotes: 0,
      timestamp: new Date().toLocaleString('id-ID'),
    })
    message.value = ''
    saveToStorage() // Simpan setelah menambah pesan
  }
}

// Fungsi untuk upvote dengan animasi feedback
const upvote = (id) => {
  const msg = messages.find((m) => m.id === id)
  if (msg) {
    msg.upvotes++
    saveToStorage() // Simpan setelah upvote

    // Animasi feedback (optional)
    setTimeout(() => {
      // Trigger re-sort jika diperlukan
    }, 100)
  }
}

// Fungsi untuk downvote dengan animasi feedback
const downvote = (id) => {
  const msg = messages.find((m) => m.id === id)
  if (msg) {
    msg.downvotes++
    saveToStorage() // Simpan setelah downvote

    // Animasi feedback (optional)
    setTimeout(() => {
      // Trigger re-sort jika diperlukan
    }, 100)
  }
}

// Fungsi untuk hapus pesan
const deleteMessage = (id) => {
  const index = messages.findIndex((m) => m.id === id)
  if (index > -1) {
    messages.splice(index, 1)
    saveToStorage() // Simpan setelah hapus
  }
}

// Fungsi untuk reset semua data
const resetAllData = () => {
  if (confirm('Apakah Anda yakin ingin menghapus semua pesan?')) {
    messages.splice(0, messages.length)
    messageId = 0
    saveToStorage()
  }
}

// Fungsi untuk mendapatkan skor total
const getScore = (msg) => {
  return msg.upvotes - msg.downvotes
}

// Fungsi untuk mendapatkan badge rank berdasarkan posisi
const getRankBadge = (index) => {
  if (sortBy.value === 'score-desc') {
    switch (index) {
      case 0:
        return { emoji: '🥇', text: 'Top #1', class: 'bg-yellow-100 text-yellow-800' }
      case 1:
        return { emoji: '🥈', text: 'Top #2', class: 'bg-gray-100 text-gray-800' }
      case 2:
        return { emoji: '🥉', text: 'Top #3', class: 'bg-orange-100 text-orange-800' }
      default:
        return null
    }
  }
  return null
}

// Fungsi untuk mendapatkan kelas CSS berdasarkan skor
const getScoreClass = (score) => {
  if (score >= 10) return 'text-green-600 font-bold'
  if (score >= 5) return 'text-green-500 font-semibold'
  if (score > 0) return 'text-green-600'
  if (score === 0) return 'text-gray-500'
  if (score >= -5) return 'text-red-600'
  return 'text-red-600 font-bold'
}

// Load data saat komponen dimount
onMounted(() => {
  loadFromStorage()
})

// Watch perubahan pada messages untuk auto-save (optional backup)
watch(
  messages,
  () => {
    // Auto-save sudah dipanggil manual di setiap fungsi
  },
  { deep: true },
)
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Drop Me a Random Message</h1>
        <p class="text-gray-600">
          Anonymously share a random thought, a quick note, or just anything on your mind. Your
          message will appear instantly for everyone to see!
        </p>
        <br /><br />
        <p class="text-gray-600">Connect with me:</p>
        <div class="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/gbennnn"
            target="_blank"
            rel="noopener"
            class="text-gray-500 hover:text-gray-800 transition"
            title="GitHub"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/iambeno_"
            target="_blank"
            rel="noopener"
            class="text-blue-400 hover:text-blue-600 transition"
            title="Twitter"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 001.963-2.475 8.93 8.93 0 01-2.828 1.082 4.48 4.48 0 00-7.635 4.086A12.72 12.72 0 013.11 4.86a4.48 4.48 0 001.388 5.976 4.44 4.44 0 01-2.03-.561v.057a4.48 4.48 0 003.596 4.393 4.52 4.52 0 01-2.025.077 4.48 4.48 0 004.184 3.114A8.98 8.98 0 012 19.54a12.67 12.67 0 006.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.005-.39-.014-.583A9.22 9.22 0 0024 4.59a8.93 8.93 0 01-2.54.698z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/benonygabriel"
            target="_blank"
            rel="noopener"
            class="text-blue-700 hover:text-blue-900 transition"
            title="LinkedIn"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v5.64z"
              />
            </svg>
          </a>
        </div>

        <div class="mt-4 flex justify-center items-center space-x-4">
          <!-- <span class="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
            💾 Data tersimpan otomatis
          </span> -->
          <!-- <button
            v-if="messages.length > 0"
            @click="resetAllData"
            class="text-sm text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full transition duration-200"
          >
            🗑️ Reset Semua Data
          </button> -->
        </div>
      </div>

      <!-- Form Input Pesan -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <form @submit.prevent="submitMessage" class="space-y-4">
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Write your message:
            </label>
            <textarea
              id="message"
              v-model="message"
              placeholder="What's on your mind?"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Submit Message
          </button>
        </form>
      </div>

      <!-- Flag Counter -->
      <div class="flex justify-center my-6">
        <a href="https://info.flagcounter.com/C3Ig">
          <img
            src="https://s01.flagcounter.com/count2/C3Ig/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_1/pageviews_1/flags_0/percent_0/"
            alt="Flag Counter"
            border="0"
          />
        </a>
      </div>

      <!-- Daftar Pesan -->
      <div class="space-y-4">
        <!-- Kontrol Sorting -->
        <div
          v-if="messages.length > 0"
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <h2 class="text-2xl font-semibold text-gray-800">
            Latest Messages ({{ messages.length }})
          </h2>

          <div class="flex items-center space-x-2">
            <label for="sortBy" class="text-sm font-medium text-gray-700"> Sort by: </label>
            <select
              id="sortBy"
              v-model="sortBy"
              @change="saveToStorage"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="score-desc">🏆 Highest Score</option>
              <option value="score-asc">📉 Lowest Score</option>
              <option value="newest">🕐 Newest</option>
              <option value="oldest">📅 Oldest</option>
            </select>
          </div>
        </div>

        <div v-if="messages.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
          <div class="text-gray-500">
            <svg
              class="mx-auto h-16 w-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.907-1.47L5 21l1.47-3.093A8.955 8.955 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              ></path>
            </svg>
            <p class="text-lg font-medium">No messages yet</p>
            <p class="text-sm">Be the first to share something!</p>
          </div>
        </div>

        <!-- Card Pesan -->
        <div
          v-for="(msg, index) in sortedMessages"
          :key="msg.id"
          class="bg-white rounded-lg shadow-md p-6 border-l-4 transition-all duration-300"
          :class="{
            'border-yellow-400 shadow-lg':
              getRankBadge(index) && getRankBadge(index).emoji === '🥇',
            'border-gray-400 shadow-lg': getRankBadge(index) && getRankBadge(index).emoji === '🥈',
            'border-orange-400 shadow-lg':
              getRankBadge(index) && getRankBadge(index).emoji === '🥉',
            'border-green-500': !getRankBadge(index) && getScore(msg) > 0,
            'border-red-500': !getRankBadge(index) && getScore(msg) < 0,
            'border-gray-300': !getRankBadge(index) && getScore(msg) === 0,
          }"
        >
          <!-- Ranking Badge -->
          <div v-if="getRankBadge(index)" class="flex justify-between items-center mb-3">
            <span
              :class="getRankBadge(index).class"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ getRankBadge(index).emoji }} {{ getRankBadge(index).text }}
            </span>
            <span class="text-xs text-gray-500">#{{ index + 1 }}</span>
          </div>

          <div class="flex justify-between items-start mb-4">
            <p class="text-gray-800 text-lg leading-relaxed flex-1 pr-4">{{ msg.text }}</p>
            <div class="flex flex-col items-center space-y-1 min-w-0">
              <span
                class="text-2xl font-bold transition-colors duration-300"
                :class="getScoreClass(getScore(msg))"
              >
                {{ getScore(msg) > 0 ? '+' : '' }}{{ getScore(msg) }}
              </span>
              <span class="text-xs text-gray-500">skor</span>
              <div class="text-xs text-gray-400 text-center">
                <div>👍 {{ msg.upvotes }}</div>
                <div>👎 {{ msg.downvotes }}</div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">{{ msg.timestamp }}</span>

            <div class="flex space-x-2">
              <!-- Tombol Upvote -->
              <button
                @click="upvote(msg.id)"
                class="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-medium shadow-sm"
                title="Upvote pesan ini"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="font-bold">{{ msg.upvotes }}</span>
              </button>

              <!-- Tombol Downvote -->
              <button
                @click="downvote(msg.id)"
                class="flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-medium shadow-sm"
                title="Downvote pesan ini"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="font-bold">{{ msg.downvotes }}</span>
              </button>

              <!-- Tombol Delete -->
              <!-- <button
                @click="deleteMessage(msg.id)"
                class="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-600 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-medium shadow-sm"
                title="Hapus pesan"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
