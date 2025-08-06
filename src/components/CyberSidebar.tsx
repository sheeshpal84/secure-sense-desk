import { Shield, Key, Mail, Globe, CheckSquare, Newspaper } from "lucide-react"
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
  useSidebar,
} from "@/components/ui/sidebar"
import { LogoUpload } from "./LogoUpload"

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
        <LogoUpload collapsed={collapsed} />

        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="text-primary font-semibold mb-2 px-3">
            Security Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group my-2">
                     <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-4 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-primary/10 text-primary border border-primary/20 shadow-glow-primary" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 space-y-1">
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