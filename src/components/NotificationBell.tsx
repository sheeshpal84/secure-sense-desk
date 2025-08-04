import { useState, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  title: string
  message: string
  type: "breach" | "news" | "security"
  timestamp: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Data Breach Alert",
    message: "Major tech company reported a security incident affecting 2M users",
    type: "breach",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: "2", 
    title: "Security Update",
    message: "New phishing campaign targeting banking customers detected",
    type: "security",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false
  },
  {
    id: "3",
    title: "Cyber News",
    message: "Zero-day vulnerability discovered in popular software",
    type: "news", 
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true
  }
]

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [bellAnimation, setBellAnimation] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: "Security Alert",
          message: "New threat detected in your region",
          type: Math.random() > 0.5 ? "breach" : "security",
          timestamp: new Date(),
          read: false
        }
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
        setBellAnimation(true)
        setTimeout(() => setBellAnimation(false), 1000)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "breach": return "text-destructive"
      case "security": return "text-warning"
      case "news": return "text-primary"
      default: return "text-muted-foreground"
    }
  }

  const formatTime = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`relative hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
            bellAnimation ? 'animate-bounce' : ''
          }`}
        >
          <Bell className={`h-5 w-5 ${bellAnimation ? 'animate-pulse' : ''}`} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 p-0 bg-card border-border/50 shadow-2xl" 
        align="end"
        sideOffset={8}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`group flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/20 last:border-0 cursor-pointer ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        !notification.read ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`} />
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-medium leading-tight ${
                            !notification.read ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className={`text-xs leading-relaxed ${
                          !notification.read ? 'text-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getTypeColor(notification.type)}`}
                          >
                            {notification.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}