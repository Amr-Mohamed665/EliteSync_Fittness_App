import { useState, useEffect } from "react"
import NotificationCard from "@/pages/Notifications/NotificationCard"
import { CalendarCheck2, CheckCheck, Bell, Loader2 } from "lucide-react"
import { getNotifications, markAsRead, markAllAsRead, deleteNotification, type Notification } from "@/lib/Api/notifications.api"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await getNotifications()
      if (response.status) {
        setNotifications(response.data)
        setUnreadCount(response.unread_count || 0)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      const response = await markAsRead(notificationId)
      if (response.status) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId ? { ...notif, read: true } : notif
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const response = await markAllAsRead()
      if (response.status) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        )
        setUnreadCount(0)
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error)
    }
  }

  const handleDelete = async (notificationId: number) => {
    try {
      const response = await deleteNotification(notificationId)
      if (response.status) {
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
        const deletedNotif = notifications.find(n => n.id === notificationId)
        if (deletedNotif && !deletedNotif.read) {
          setUnreadCount(prev => Math.max(0, prev - 1))
        }
      }
    } catch (error) {
      console.error("Failed to delete notification:", error)
    }
  }

  const todayNotifications = notifications.filter(notif => {
    const notifDate = new Date(notif.created_at)
    const today = new Date()
    return notifDate.toDateString() === today.toDateString()
  })

  const earlierNotifications = notifications.filter(notif => {
    const notifDate = new Date(notif.created_at)
    const today = new Date()
    return notifDate.toDateString() !== today.toDateString()
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
      case 'info':
        return CalendarCheck2
      case 'warning':
      case 'error':
        return Bell
      default:
        return CalendarCheck2
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="w-full text-white p-4 md:p-8 flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {todayNotifications.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <h2 className="text-lg font-medium">Today</h2>
          </div>
          <div className="space-y-3">
            {todayNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                desc={notification.message}
                time={formatTime(notification.created_at)}
                icon={getNotificationIcon(notification.type)}
                active={!notification.read}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
                onDelete={() => handleDelete(notification.id)}
              />
            ))}
          </div>
        </div>
      )}

      {earlierNotifications.length > 0 && (
        <div>
          <div className="flex justify-between mb-3">
            <h2 className="text-lg font-medium">Earlier</h2>
          </div>
          <div className="space-y-3">
            {earlierNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                desc={notification.message}
                time={formatTime(notification.created_at)}
                icon={getNotificationIcon(notification.type)}
                active={!notification.read}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
                onDelete={() => handleDelete(notification.id)}
              />
            ))}
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">No notifications yet</p>
        </div>
      )}
    </div>
  )
}