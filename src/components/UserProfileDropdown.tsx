import { useState } from "react"
import { User, LogOut, Settings, Upload, BarChart3, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { LogoUpload } from "./LogoUpload"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function UserProfileDropdown() {
  const { user, logout } = useAuth()
  const [showLogoUpload, setShowLogoUpload] = useState(false)

  if (!user) return null

  // Mock usage stats
  const usageStats = {
    securityChecks: 12,
    threatsBlocked: 3,
    lastScan: "2 hours ago",
    accountAge: "6 months"
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-80 p-0 bg-card border-border/50 shadow-2xl" 
          align="end"
          sideOffset={8}
        >
          {/* User Info Header */}
          <div className="p-4 bg-gradient-cyber">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground font-medium">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-primary-foreground">{user.name}</p>
                <p className="text-primary-foreground/80 text-sm">{user.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Security User
                </Badge>
              </div>
            </div>
          </div>

          {/* Usage Summary */}
          <div className="p-4 border-b border-border/50">
            <DropdownMenuLabel className="px-0 pb-2">Usage Summary</DropdownMenuLabel>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-primary">{usageStats.securityChecks}</div>
                <div className="text-xs text-muted-foreground">Security Checks</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-success">{usageStats.threatsBlocked}</div>
                <div className="text-xs text-muted-foreground">Threats Blocked</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground text-center">
              Last scan: {usageStats.lastScan} • Member for {usageStats.accountAge}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <DropdownMenuItem 
              className="cursor-pointer focus:bg-muted/50"
              onClick={() => setShowLogoUpload(true)}
            >
              <Upload className="mr-3 h-4 w-4" />
              <span>Upload Logo</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
              <BarChart3 className="mr-3 h-4 w-4" />
              <span>View Analytics</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
              <Settings className="mr-3 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              className="cursor-pointer focus:bg-destructive/10 text-destructive focus:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </div>

          {/* Footer */}
          <div className="p-3 bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">
              CyberShield v2.0 • Stay Secure
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logo Upload Dialog */}
      <Dialog open={showLogoUpload} onOpenChange={setShowLogoUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Logo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <LogoUpload collapsed={false} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}