# KajianQU - Islamic Learning Mobile App

Aplikasi mobile untuk pembelajaran Al-Qur'an dengan fitur AI tahsin, live streaming kajian, dan sistem pembelajaran interaktif.

## 🎯 Fitur Utama

### 🤖 AI Al-Qur'an
- **Tahsin**: Perbaikan bacaan dengan AI correction
- **Muroja'ah**: Latihan hafalan dengan feedback realtime
- **Audio Analysis**: Deteksi kesalahan pengucapan
- **Progress Tracking**: Monitoring kemajuan belajar

### 📺 Live Streaming & Private Class
- **Live Kajian**: Streaming kajian dengan chat interaktif
- **Private Class**: Kelas privat 1-on-1 dengan asatidz
- **Screen Sharing**: Berbagi layar untuk presentasi
- **Whiteboard**: Papan tulis virtual untuk pembelajaran
- **Multi-participant**: Support hingga 1000 jamaah concurrent

### 📖 Quran Reader
- **Complete Quran**: 114 surah dengan terjemahan Indonesia
- **Audio Qori**: Multiple qori dengan kualitas HD
- **Tafsir Integration**: Tafsir per ayat
- **Bookmark System**: Tandai ayat favorit
- **Search Function**: Pencarian ayat dan surah

### 💬 Chat & Community
- **Realtime Chat**: Chat live dengan moderasi
- **Bahtsul Masail**: Forum tanya jawab keagamaan
- **Direct Message**: Pesan pribadi dengan asatidz
- **Group Discussion**: Diskusi grup pembelajaran

## 🏗️ Arsitektur Aplikasi

### Frontend (React Native - Expo)
```
/app
  /(tabs)
    index.tsx          # Home screen
    quran-ai.tsx       # AI Tahsin screen
    quran-reader.tsx   # Al-Quran reader
    live.tsx           # Live streaming
    profile.tsx        # User profile

  /auth
    login.tsx          # Login screen
    register.tsx       # Registration

/components
  QuranAyat.tsx        # Quran verse component
  LiveHeader.tsx       # Live stream header
  Whiteboard.tsx       # Virtual whiteboard
  AIErrorPopup.tsx     # AI error correction popup

/services
  api.ts               # API service layer
  quranAIService.ts    # Qurani AI integration
  streamService.ts     # Stream video/chat service
  authService.ts       # Authentication service

/store
  authStore.ts         # User auth state management
  aiSessionStore.ts    # AI session state
```

### Backend Architecture
```
/controllers
  authController.js    # Authentication endpoints
  quranController.js   # Quran data endpoints
  streamController.js  # Stream management
  aiController.js      # AI session management

/services
  quranAIService.js    # Qurani AI integration
  streamService.js     # Stream video service
  authService.js       # JWT & user management
  websocketService.js  # Real-time communication

/models
  User.js              # User model
  QuranAISession.js    # AI session model
  LiveRoom.js          # Live room model
  PrivateClass.js      # Private class model
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- Expo CLI
- PostgreSQL
- Supabase Account
- Stream.io Account
- Qurani AI API Key

### 1. Clone Repository
```bash
git clone https://github.com/your-username/kajianqu
cd kajianqu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` dan isi dengan kredensial Anda:

```env
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_WS_URL=ws://localhost:3000

# Supabase Configuration  
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stream Configuration
EXPO_PUBLIC_STREAM_API_KEY=your_stream_api_key

# Qurani AI Configuration
EXPO_PUBLIC_QURANI_API_KEY=your_qurani_api_key
```

### 4. Database Setup
Setup database dengan Supabase:

1. Buat project baru di Supabase
2. Jalankan migration file yang ada di `/supabase/migrations`
3. Setup Row Level Security (RLS) policies

### 5. Stream.io Setup
1. Daftar di [Stream.io](https://getstream.io)
2. Buat app baru untuk Video & Chat
3. Copy API credentials ke environment variables

### 6. Qurani AI Setup
1. Daftar di [Qurani AI](https://qurani.ai)
2. Dapatkan API key
3. Baca dokumentasi integrasi

### 7. Run Development
```bash
# Start Expo dev server
npm run dev

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web
```

## 📱 Platform Support

- **iOS**: Full native support
- **Android**: Full native support  
- **Web**: Limited support (no camera/microphone features)

## 🔐 Authentication & Authorization

### Role-based Access Control
```typescript
enum UserRole {
  USER = 'user',        // Regular user
  ASATIDZ = 'asatidz',  // Teacher/instructor
  ADMIN = 'admin'       // Administrator
}
```

### Permissions
- **User**: Read Quran, AI tahsin, join live streams, private classes
- **Asatidz**: All user permissions + create live streams, teach private classes
- **Admin**: Full access to all features and user management

## 🤖 AI Integration

### Qurani AI Features
```typescript
interface QuranAISession {
  id: string;
  user_id: string;
  surah: number;
  start_ayat: number;
  end_ayat: number;
  mode: 'tahsin' | 'muroja\'ah';
  status: 'active' | 'paused' | 'completed';
}

interface QuranAIError {
  id: string;
  session_id: string;
  ayat: number;
  wrong_word: string;
  correction: string;
  timestamp: string;
}
```

### WebSocket Communication
```javascript
// Client side
const ws = new WebSocket('ws://localhost:3000/ws/quran-ai/${sessionId}');

// Send audio data
ws.send(audioChunkBuffer);

// Receive corrections
ws.onmessage = (event) => {
  const correction = JSON.parse(event.data);
  handleAICorrection(correction);
};
```

## 📺 Live Streaming Architecture

### Stream.io Integration
```typescript
// Initialize Stream client
const client = new StreamVideoClient({
  apiKey: process.env.EXPO_PUBLIC_STREAM_API_KEY,
  user: { id: userId, name: userName },
  token: userToken
});

// Create live stream
const call = client.call('livestream', callId);
await call.create({
  data: {
    settings_override: {
      audio: { default_device: 'speaker' },
      video: { enabled: true }
    }
  }
});
```

### Features Supported
- **Video Streaming**: HD quality dengan adaptive bitrate
- **Audio**: High quality audio dengan noise cancellation
- **Chat**: Realtime chat dengan moderation
- **Screen Sharing**: Share screen untuk presentasi
- **Recording**: Record sessions untuk replay
- **Analytics**: Detailed analytics dan statistics

## 📊 Database Schema

### Core Tables
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('user', 'asatidz', 'admin')),
  no_wa TEXT,
  keilmuan TEXT, -- For asatidz
  bank TEXT,     -- For asatidz
  no_rekening TEXT, -- For asatidz
  kode_asatidz TEXT, -- Auto generated for asatidz
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI Sessions
CREATE TABLE quran_ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  surah INTEGER NOT NULL,
  start_ayat INTEGER NOT NULL,
  end_ayat INTEGER NOT NULL,
  mode TEXT CHECK (mode IN ('tahsin', 'muroja\'ah')),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Live Rooms
CREATE TABLE live_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asatidz_id UUID REFERENCES users(id),
  tema TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  participant_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 🔒 Security & Privacy

### Data Protection
- **End-to-end encryption** untuk private communications
- **Audio data**: Tidak disimpan setelah processing AI
- **User data**: Enkripsi sensitif data dengan AES-256
- **API Security**: Rate limiting dan authentication required

### Compliance
- **GDPR**: User dapat request data deletion
- **Privacy Policy**: Transparent data usage policy
- **Terms of Service**: Clear usage guidelines

## 🚀 Deployment

### Mobile App Deployment
```bash
# Build for production
npx expo build:android --type app-bundle
npx expo build:ios --type archive

# Submit to stores
npx expo submit --platform android
npx expo submit --platform ios
```

### Backend Deployment
- **Supabase**: Database dan Edge Functions
- **Stream.io**: Video streaming infrastructure
- **CDN**: Static assets delivery

## 📈 Performance Optimization

### Mobile App
- **Code Splitting**: Lazy loading screens
- **Image Optimization**: WebP format dengan compression
- **Caching**: Aggressive caching untuk Quran text dan audio
- **Bundle Size**: Tree shaking dan unused code elimination

### Backend
- **Database**: Optimized queries dengan indexing
- **Caching**: Redis untuk frequently accessed data
- **CDN**: Global content delivery untuk audio files
- **Rate Limiting**: Prevent abuse dan ensure fair usage

## 🧪 Testing

### Unit Testing
```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage
```

### Integration Testing
```bash
# Test API endpoints
npm run test:integration

# Test WebSocket connections
npm run test:websocket
```

### E2E Testing
```bash
# Mobile app E2E tests
npm run test:e2e:mobile

# Web app E2E tests  
npm run test:e2e:web
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🤝 Support

- **Email**: support@kajianqu.com
- **Discord**: [KajianQU Community](https://discord.gg/kajianqu)
- **Documentation**: [docs.kajianqu.com](https://docs.kajianqu.com)

## 🙏 Acknowledgments

- [Qurani AI](https://qurani.ai) - AI Al-Qur'an correction technology
- [Stream.io](https://getstream.io) - Video streaming dan chat infrastructure
- [Supabase](https://supabase.com) - Backend infrastructure
- [Expo](https://expo.dev) - React Native development platform

---

**Developed with ❤️ for the Ummah**