import { AlertTriangle, MapPin, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MedicalButton } from "./ui/medical-button"
import { Badge } from "./ui/badge"
import { useEmergencyAlerts } from "@/hooks/useEmergencyAlerts"

export const EmergencyPanel = () => {
  const { alerts, loading, respondToAlert, resolveAlert } = useEmergencyAlerts();
  return (
    <Card className="border-emergency/20 bg-gradient-to-br from-background to-emergency/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emergency">
          <AlertTriangle className="h-5 w-5" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Loading alerts...</div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="p-4 bg-card rounded-lg border border-emergency/20 shadow-soft">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={alert.type === "Cardiac Emergency" ? "bg-emergency text-emergency-foreground" : "bg-warning text-warning-foreground"}
                  >
                    {alert.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {alert.status.toUpperCase()}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(alert.created_at).toLocaleTimeString()}
                </span>
              </div>
              
              <h4 className="font-semibold text-foreground mb-1">Patient: {alert.patient_name}</h4>
              <p className="text-sm text-muted-foreground mb-2">Condition: {alert.condition}</p>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                {alert.location}
              </div>
              
              <div className="flex gap-2">
                {alert.status === 'active' && (
                  <MedicalButton 
                    variant="emergency" 
                    size="sm"
                    onClick={() => respondToAlert(alert.id)}
                  >
                    Respond
                  </MedicalButton>
                )}
                {alert.status === 'responding' && (
                  <MedicalButton 
                    variant="success" 
                    size="sm"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    Mark Resolved
                  </MedicalButton>
                )}
                <MedicalButton variant="outline" size="sm">
                  View Details
                </MedicalButton>
              </div>
            </div>
          ))
        )}
        
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