import { Activity, Heart, Thermometer, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { useVitals } from "@/hooks/useVitals"

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "bg-success text-success-foreground"
    case "warning":
      return "bg-warning text-warning-foreground"
    case "critical":
      return "bg-emergency text-emergency-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export const VitalsDisplay = () => {
  const { vitals, loading } = useVitals()

  if (loading) {
    return <div className="text-center py-4">Loading vitals...</div>
  }

  const latestVital = vitals[0]

  if (!latestVital) {
    return <div className="text-center py-4">No vital signs data available</div>
  }

  const vitalsData = [
    {
      name: "Heart Rate",
      value: latestVital.heart_rate.toString(),
      unit: "BPM",
      status: latestVital.heart_rate > 100 ? "critical" : latestVital.heart_rate > 80 ? "warning" : "normal",
      icon: Heart,
      trend: "Live data"
    },
    {
      name: "Blood Pressure",
      value: `${latestVital.blood_pressure_systolic}/${latestVital.blood_pressure_diastolic}`,
      unit: "mmHg",
      status: latestVital.blood_pressure_systolic > 140 ? "critical" : latestVital.blood_pressure_systolic > 130 ? "warning" : "normal",
      icon: Activity,
      trend: "Live data"
    },
    {
      name: "Body Temperature",
      value: latestVital.temperature.toString(),
      unit: "°C",
      status: latestVital.temperature > 38 ? "critical" : latestVital.temperature > 37.5 ? "warning" : "normal",
      icon: Thermometer,
      trend: "Live data"
    },
    {
      name: "Blood Oxygen",
      value: latestVital.oxygen_saturation.toString(),
      unit: "%",
      status: latestVital.oxygen_saturation < 90 ? "critical" : latestVital.oxygen_saturation < 95 ? "warning" : "normal",
      icon: Zap,
      trend: "Live data"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {vitalsData.map((vital) => {
        const IconComponent = vital.icon
        return (
          <Card key={vital.name} className="hover:shadow-soft transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {vital.name}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {vital.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {vital.unit}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className={getStatusColor(vital.status)}>
                  {vital.status.toUpperCase()}
                </Badge>
                <p className="text-xs text-muted-foreground">{vital.trend}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}