import { User, Calendar, MapPin, Phone, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { MedicalButton } from "./ui/medical-button"

interface PatientCardProps {
  patient: {
    id: string
    name: string
    age: number
    condition: string
    status: "stable" | "monitoring" | "critical"
    lastUpdate: string
    location?: string
    avatar?: string
    allergies?: string[]
    medications?: string[]
  }
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-success text-success-foreground"
      case "monitoring":
        return "bg-warning text-warning-foreground"
      case "critical":
        return "bg-emergency text-emergency-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="hover:shadow-medical transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={patient.avatar} />
              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{patient.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {patient.age} years old
              </p>
            </div>
          </div>
          <Badge variant="secondary" className={getStatusColor(patient.status)}>
            {patient.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">Condition</p>
          <p className="text-sm text-muted-foreground">{patient.condition}</p>
        </div>
        
        {patient.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {patient.location}
          </div>
        )}
        
        {patient.allergies && patient.allergies.length > 0 && (
          <div>
            <div className="flex items-center gap-1 text-sm font-medium text-emergency mb-1">
              <AlertCircle className="h-3 w-3" />
              Allergies
            </div>
            <div className="flex flex-wrap gap-1">
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="text-xs border-emergency text-emergency">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {patient.medications && patient.medications.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Current Medications</p>
            <div className="flex flex-wrap gap-1">
              {patient.medications.map((medication, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {medication}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          Last updated: {patient.lastUpdate}
        </div>
        
        <div className="flex gap-2 pt-2">
          <MedicalButton variant="default" size="sm" className="flex-1">
            <User className="h-4 w-4 mr-1" />
            View Profile
          </MedicalButton>
          <MedicalButton variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </MedicalButton>
        </div>
      </CardContent>
    </Card>
  )
}