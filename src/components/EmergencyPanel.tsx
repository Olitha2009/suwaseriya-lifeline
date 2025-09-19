import { AlertTriangle, MapPin, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MedicalButton } from "./ui/medical-button"
import { Badge } from "./ui/badge"

const emergencyAlerts = [
  {
    id: 1,
    type: "High Priority",
    patient: "John Doe",
    location: "Downtown Medical Center",
    condition: "Cardiac Arrest",
    time: "2 minutes ago",
    status: "active"
  },
  {
    id: 2,
    type: "Medium Priority",
    patient: "Mary Smith",
    location: "Westside Clinic",
    condition: "Chest Pain",
    time: "8 minutes ago",
    status: "responding"
  }
]

export const EmergencyPanel = () => {
  return (
    <Card className="border-emergency/20 bg-gradient-to-br from-background to-emergency/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emergency">
          <AlertTriangle className="h-5 w-5" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {emergencyAlerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-card rounded-lg border border-emergency/20 shadow-soft">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={alert.type === "High Priority" ? "bg-emergency text-emergency-foreground" : "bg-warning text-warning-foreground"}
                >
                  {alert.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {alert.status.toUpperCase()}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {alert.time}
              </span>
            </div>
            
            <h4 className="font-semibold text-foreground mb-1">Patient: {alert.patient}</h4>
            <p className="text-sm text-muted-foreground mb-2">Condition: {alert.condition}</p>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3 w-3" />
              {alert.location}
            </div>
            
            <div className="flex gap-2">
              <MedicalButton variant="emergency" size="sm">
                Respond
              </MedicalButton>
              <MedicalButton variant="outline" size="sm">
                View Details
              </MedicalButton>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Response Team Status
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-success/10 rounded">
              <div className="text-lg font-bold text-success">4</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div className="p-2 bg-warning/10 rounded">
              <div className="text-lg font-bold text-warning">2</div>
              <div className="text-xs text-muted-foreground">En Route</div>
            </div>
            <div className="p-2 bg-emergency/10 rounded">
              <div className="text-lg font-bold text-emergency">1</div>
              <div className="text-xs text-muted-foreground">Busy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}