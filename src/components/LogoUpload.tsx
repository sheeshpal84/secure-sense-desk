import { useState, useRef, useEffect } from 'react'
import { Upload, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface LogoUploadProps {
  collapsed?: boolean
}

export function LogoUpload({ collapsed = false }: LogoUploadProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Load logo from localStorage on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem('cyberShield-logo')
    if (savedLogo) {
      setLogoUrl(savedLogo)
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (PNG, JPG, SVG, etc.)",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setLogoUrl(result)
      localStorage.setItem('cyberShield-logo', result)
      setIsUploading(false)
      toast({
        title: "Logo uploaded successfully",
        description: "Your custom logo has been set!"
      })
    }
    reader.onerror = () => {
      setIsUploading(false)
      toast({
        title: "Upload failed",
        description: "Failed to upload the logo. Please try again.",
        variant: "destructive"
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setLogoUrl(null)
    localStorage.removeItem('cyberShield-logo')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast({
      title: "Logo removed",
      description: "Custom logo has been removed"
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-4 border-b border-sidebar-border">
      <div className="flex items-center gap-2">
        {logoUrl ? (
          <div className="relative group">
            <img 
              src={logoUrl} 
              alt="Custom Logo" 
              className="h-8 w-8 object-contain rounded border border-primary/20"
            />
            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveLogo}
                className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-destructive hover:bg-destructive/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-2 w-2 text-destructive-foreground" />
              </Button>
            )}
          </div>
        ) : (
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={triggerFileInput}
                disabled={isUploading}
                className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-primary/10 hover:bg-primary/20 border border-primary/30"
              >
                <Upload className="h-2 w-2 text-primary" />
              </Button>
            )}
          </div>
        )}
        
        {!collapsed && (
          <div className="flex-1">
            <h1 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              CyberShield
            </h1>
            <p className="text-xs text-muted-foreground">Security Dashboard</p>
            {!logoUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={triggerFileInput}
                disabled={isUploading}
                className="mt-1 h-6 px-2 text-xs text-primary hover:text-primary-foreground hover:bg-primary/10"
              >
                <Upload className="h-3 w-3 mr-1" />
                {isUploading ? "Uploading..." : "Add Logo"}
              </Button>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {collapsed && logoUrl && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveLogo}
          className="mt-2 w-full h-6 p-0 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      
      {collapsed && !logoUrl && (
        <Button
          variant="ghost"
          size="sm"
          onClick={triggerFileInput}
          disabled={isUploading}
          className="mt-2 w-full h-6 p-0 text-xs text-primary hover:text-primary-foreground hover:bg-primary/10"
        >
          <Upload className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}