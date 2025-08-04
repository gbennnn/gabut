# Gabut - Anonymous message

> Aplikasi realtime voting untuk pesan dengan sistem upvote/downvote yang interaktif

Gabut adalah aplikasi web modern yang memungkinkan pengguna untuk berbagi pesan dan memberikan vote (upvote/downvote) secara realtime. Aplikasi ini dilengkapi dengan sistem ranking, sorting, dan penyimpanan data persisten menggunakan localStorage.

## Fitur Utama

### Core Features

- **Real-time Voting System** - Upvote dan downvote pesan secara instant
- **Message Submission** - Input dan submit pesan dengan validasi
- **Persistent Storage** - Data tersimpan di localStorage (tidak hilang saat refresh)
- **Responsive Design** - Tampilan optimal di desktop dan mobile

### Advanced Features

- **Multi-mode Sorting**:
  - 🏆 Skor Tertinggi ke Terendah
  - 📉 Skor Terendah ke Tertinggi
  - 🕐 Pesan Terbaru
  - 📅 Pesan Terlama

- **Ranking System**:
  - 🥇 Badge Top #1 (Gold)
  - 🥈 Badge Top #2 (Silver)
  - 🥉 Badge Top #3 (Bronze)

- **Interactive UI**:
  - Animasi hover dan click effects
  - Visual feedback berdasarkan skor
  - Color-coded borders untuk ranking
  - Detailed vote statistics

## Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **State Management**: Vue Reactive & Computed
- **Storage**: Browser localStorage
- **Language**: JavaScript ES6+

## Installation

### Prerequisites

- Node.js (v20.19.0 atau lebih tinggi)
- npm atau yarn

### Setup Project

1. **Clone repository**

   ```bash
   git clone https://github.com/gbennnn/gabut.git
   cd gabut
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5174
   ```

### Production Build

```bash
# Build untuk production
npm run build

# Preview build hasil
npm run preview
```

## Data Structure

### Message Object

```javascript
{
  id: Number,           // Unique identifier
  text: String,         // Message content
  upvotes: Number,      // Total upvotes
  downvotes: Number,    // Total downvotes
  timestamp: String     // Creation timestamp
}
```

### LocalStorage Schema

```javascript
{
  messages: Array<Message>,  // Array of message objects
  messageId: Number,         // Counter for next ID
  sortBy: String            // User's sort preference
}
```

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
