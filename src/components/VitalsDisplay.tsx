import { Activity, Heart, Thermometer, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

const vitalsData = [
  {
    name: "Heart Rate",
    value: "72",
    unit: "BPM",
    status: "normal",
    icon: Heart,
    trend: "+2 from last reading"
  },
  {
    name: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    icon: Activity,
    trend: "Stable"
  },
  {
    name: "Body Temperature",
    value: "98.6",
    unit: "°F",
    status: "normal",
    icon: Thermometer,
    trend: "Normal range"
  },
  {
    name: "Blood Oxygen",
    value: "98",
    unit: "%",
    status: "normal",
    icon: Zap,
    trend: "Excellent"
  }
]

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