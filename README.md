# 💬 Chat App Frontend

A modern real-time chat application built with React, Vite, Socket.IO, and Tailwind CSS v4.

## ✨ Features

- 🔐 User authentication (Login/Register)
- 💬 Real-time messaging with Socket.IO
- 👥 User online/offline status tracking
- ✓✓ Message read receipts (double tick)
- 🔔 Unread message count
- 🎨 Modern UI with Tailwind CSS v4
- ⚡ Optimized performance with React Query & Zustand
- 📱 Responsive design

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Socket.IO Client** - Real-time communication
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icons
- **date-fns** - Date formatting

## 📁 Project Structure

```
chating-app-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/                    # API layer
│   │   ├── axios.config.js
│   │   ├── auth.api.js
│   │   ├── user.api.js
│   │   ├── conversation.api.js
│   │   └── message.api.js
│   ├── store/                  # Zustand stores
│   │   ├── useAuthStore.js
│   │   ├── useChatStore.js
│   │   └── useSocketStore.js
│   ├── hooks/
│   │   ├── queries/            # React Query hooks
│   │   │   ├── useAuthQuery.js
│   │   │   ├── useUserQuery.js
│   │   │   ├── useConversationQuery.js
│   │   │   └── useMessageQuery.js
│   │   ├── mutations/
│   │   │   ├── useAuthMutation.js
│   │   │   ├── useConversationMutation.js
│   │   │   └── useMessageMutation.js
│   │   └── useSocket.js        # Socket.IO hook
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── chat/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── MessageItem.jsx
│   │   ├── sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── UserList.jsx
│   │   │   ├── UserItem.jsx
│   │   │   └── AllUsersList.jsx
│   │   ├── common/
│   │   │   ├── Avatar.jsx
│   │   │   └── Loader.jsx
│   │   └── layout/
│   │       └── Layout.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── ChatPage.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── storage.js
│   │   └── queryClient.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── postcss.config.js
├── package.json
└── .env
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd chating-app/chating-app-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. Start development server

```bash
npm run dev
```

5. Open browser at `http://localhost:5173`

## 📦 Build

```bash
npm run build
```

Build output will be in `dist/` folder.

## 🎯 State Management

### React Query (Server State)

- Users list
- Conversations
- Messages
- Caching with 5 min staleTime

### Zustand (Client State)

- **useAuthStore**: user, token, login, logout
- **useChatStore**: activeConversation
- **useSocketStore**: socket instance, connection status

## 🔌 Socket Events

### Emit Events

- `message:send` - Send new message
- `message:read` - Mark message as read

### Listen Events

- `message:sent` - Confirmation to sender
- `message:received` - New message received
- `message:read` - Message read by receiver
- `user:status` - User online/offline status

## 🎨 Styling

Using **Tailwind CSS v4** with PostCSS plugin:

- `@import "tailwindcss"` in index.css
- No tailwind.config.js needed
- Modern CSS-first approach

## ⚡ Performance Optimizations

- React.memo for components
- useCallback for event handlers
- Zustand selectors for partial state
- React Query caching
- Optimistic updates
- Minimal re-renders

## 🔑 Key Features Implementation

### Real-time Messaging

- Socket.IO for instant message delivery
- Optimistic UI updates
- Message status tracking (sent/delivered/read)

### Read Receipts

- Mark as read on input focus
- Double tick (✓✓) indicator
- Real-time status updates

### Online Status

- Green dot for online users
- Gray dot for offline users
- Instant updates on login/logout

### Unread Count

- Badge on conversation list
- Auto-update on message read
- Decrements in real-time

## 📝 Environment Variables

| Variable          | Description          | Default                     |
| ----------------- | -------------------- | --------------------------- |
| `VITE_API_URL`    | Backend API URL      | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:5000`     |

## 🐛 Troubleshooting

### Socket connection issues

- Check backend is running
- Verify VITE_SOCKET_URL in .env
- Check browser console for errors

### Messages not updating

- Check React Query DevTools
- Verify socket events in Network tab
- Check query invalidation

### Styling not working

- Ensure Tailwind CSS v4 is installed
- Check postcss.config.js
- Verify @import "tailwindcss" in index.css

## 📄 License

MIT

## 👨 Author

Nure Alam
