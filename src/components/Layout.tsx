import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CyberSidebar } from "./CyberSidebar"
import { useAuth } from "@/contexts/AuthContext"
import NotificationBell from "./NotificationBell"
import UserProfileDropdown from "./UserProfileDropdown"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth()

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <CyberSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0">
            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary" />
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground hidden sm:inline">System Secure</span>
              </div>
              {user && (
                <div className="flex items-center gap-2">
                  <NotificationBell />
                  <UserProfileDropdown />
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}