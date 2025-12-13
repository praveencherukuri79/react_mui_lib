import { atom, selector } from 'recoil'
import dayjs, { Dayjs } from 'dayjs'

// User state
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
}

export const currentUserState = atom<User | null>({
  key: 'currentUserState',
  default: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  },
})

// Sidebar state
export const sidebarOpenState = atom<boolean>({
  key: 'sidebarOpenState',
  default: true,
})

// Loading state
export const globalLoadingState = atom<boolean>({
  key: 'globalLoadingState',
  default: false,
})

// Notification state
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  timestamp: Dayjs
}

export const notificationsState = atom<Notification[]>({
  key: 'notificationsState',
  default: [],
})

// Selector for unread notification count
export const unreadNotificationCountState = selector<number>({
  key: 'unreadNotificationCountState',
  get: ({ get }) => {
    const notifications = get(notificationsState)
    const oneHourAgo = dayjs().subtract(1, 'hour')
    return notifications.filter((n) => n.timestamp.isAfter(oneHourAgo)).length
  },
})

