import { useState } from "react"
import { Send, Phone, Video, FileText, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { MedicalButton } from "./ui/medical-button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

const mockMessages = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    role: "doctor",
    message: "Patient vitals look stable. Continue monitoring heart rate every 5 minutes.",
    timestamp: "2 min ago",
    isOwn: false
  },
  {
    id: 2,
    sender: "Ambulance Unit 7",
    role: "ambulance",
    message: "ETA to St. Mary's Hospital: 8 minutes. Patient conscious and responsive.",
    timestamp: "1 min ago",
    isOwn: false
  },
  {
    id: 3,
    sender: "You",
    role: "hospital",
    message: "Emergency bay 3 is prepared. Cardiology team standing by.",
    timestamp: "Just now",
    isOwn: true
  }
]

export const ChatInterface = () => {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "doctor":
        return "bg-primary text-primary-foreground"
      case "ambulance":
        return "bg-emergency text-emergency-foreground"
      case "hospital":
        return "bg-success text-success-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg">Real-time Communication</CardTitle>
        <div className="flex gap-2">
          <MedicalButton variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </MedicalButton>
          <MedicalButton variant="outline" size="sm">
            <Video className="h-4 w-4 mr-1" />
            Video
          </MedicalButton>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              {!msg.isOwn && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xs ${msg.isOwn ? 'order-1' : 'order-2'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isOwn && (
                    <>
                      <span className="text-sm font-medium">{msg.sender}</span>
                      <Badge variant="secondary" className={`text-xs ${getRoleColor(msg.role)}`}>
                        {msg.role}
                      </Badge>
                    </>
                  )}
                </div>
                <div className={`p-3 rounded-lg text-sm ${
                  msg.isOwn 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {msg.message}
                </div>
                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
              </div>
              {msg.isOwn && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-3">
          <MedicalButton variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Share Records
          </MedicalButton>
          <MedicalButton variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-1" />
            Location
          </MedicalButton>
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <MedicalButton onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </MedicalButton>
        </div>
      </CardContent>
    </Card>
  )
}