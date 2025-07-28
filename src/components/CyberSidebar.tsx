import { Shield, Key, Mail, Globe, CheckSquare, Newspaper, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Shield,
    description: "Security Overview"
  },
  { 
    title: "Password Checker", 
    url: "/password", 
    icon: Key,
    description: "Test password strength"
  },
  { 
    title: "Email Leak Check", 
    url: "/email", 
    icon: Mail,
    description: "Check for data breaches"
  },
  { 
    title: "Phishing Detector", 
    url: "/phishing", 
    icon: Globe,
    description: "Analyze suspicious URLs"
  },
  { 
    title: "Security Checklist", 
    url: "/checklist", 
    icon: CheckSquare,
    description: "Best practices guide"
  },
  { 
    title: "Cyber News", 
    url: "/news", 
    icon: Newspaper,
    description: "Latest security news"
  },
]

export function CyberSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-gradient-dark border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                  CyberShield
                </h1>
                <p className="text-xs text-muted-foreground">Security Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            Security Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-primary/10 text-primary border border-primary/20 shadow-glow-primary" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}