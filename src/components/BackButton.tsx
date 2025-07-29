import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  to?: string
  className?: string
}

export function BackButton({ to = "/", className = "" }: BackButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={`mb-6 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all ${className}`}
    >
      <Link to={to} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </Button>
  )
}