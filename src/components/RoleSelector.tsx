import { Heart, Stethoscope, Truck, Building2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { MedicalButton } from "./ui/medical-button"

const roles = [
  {
    id: "patient",
    title: "Patient",
    description: "Access your medical records, vitals monitoring, and emergency support",
    icon: Heart,
    color: "bg-gradient-medical",
    features: ["Vitals Monitoring", "Medication Reminders", "Emergency Button", "Educational Videos"]
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Monitor patients, provide real-time guidance, and coordinate care",
    icon: Stethoscope,
    color: "bg-gradient-success",
    features: ["Patient Dashboard", "Real-time Chat", "Vitals Analysis", "Emergency Response"]
  },
  {
    id: "ambulance",
    title: "Ambulance Assistant",
    description: "GPS tracking, patient communication, and emergency coordination",
    icon: Truck,
    color: "bg-gradient-emergency",
    features: ["GPS Tracking", "Patient Data", "Doctor Communication", "Hospital Alerts"]
  },
  {
    id: "hospital",
    title: "Hospital Staff",
    description: "Prepare for incoming patients and coordinate emergency response",
    icon: Building2,
    color: "bg-primary",
    features: ["Patient Preparation", "Emergency Alerts", "Resource Management", "Coordination"]
  }
]

export const RoleSelector = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Suwaseriya
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive heart-patient support system with real-time medical communication
          and emergency coordination
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {roles.map((role) => {
          const IconComponent = role.icon
          return (
            <Card key={role.id} className="hover:shadow-medical transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className={`${role.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-medical`}>
                  <IconComponent className="h-8 w-8 text-white mx-auto" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {role.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <MedicalButton 
                  variant={role.id === "ambulance" ? "emergency" : "default"} 
                  size="sm" 
                  className="w-full"
                >
                  Access {role.title} Portal
                </MedicalButton>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}