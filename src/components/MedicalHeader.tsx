import { Heart, Bell, Settings, User, Menu } from "lucide-react"
import { MedicalButton } from "./ui/medical-button"
import { Badge } from "./ui/badge"

export const MedicalHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-medical p-2 rounded-lg shadow-medical">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Suwaseriya</h1>
                <p className="text-xs text-muted-foreground">Heart Care Support</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#patients" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Patients
            </a>
            <a href="#emergency" className="text-sm font-medium text-muted-foreground hover:text-emergency transition-colors">
              Emergency
            </a>
            <a href="#reports" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Emergency Button */}
            <MedicalButton variant="emergency" size="sm" className="hidden sm:flex">
              Emergency Alert
            </MedicalButton>

            {/* Notifications */}
            <div className="relative">
              <MedicalButton variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </MedicalButton>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-emergency text-emergency-foreground text-xs">
                3
              </Badge>
            </div>

            {/* Settings */}
            <MedicalButton variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </MedicalButton>

            {/* User Profile */}
            <MedicalButton variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </MedicalButton>

            {/* Mobile Menu */}
            <MedicalButton variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </MedicalButton>
          </div>
        </div>
      </div>
    </header>
  )
}