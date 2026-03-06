export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const STORAGE_KEYS = {
  TOKEN: 'chat_token',
  USER: 'chat_user'
};

export const MESSAGE_STATUS = {
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ'
};

export const QUERY_KEYS = {
  AUTH: 'auth',
  USERS: 'users',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages'
};
