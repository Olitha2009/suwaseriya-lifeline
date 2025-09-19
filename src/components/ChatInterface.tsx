import { useState } from "react"
import { Send, Phone, Video, FileText, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { MedicalButton } from "./ui/medical-button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useMessages } from "@/hooks/useMessages"

export const ChatInterface = () => {
  const [message, setMessage] = useState("")
  const { messages, loading, sendMessage } = useMessages()

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message)
      setMessage("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "doctor":
        return "bg-primary text-primary-foreground"
      case "ambulance":
        return "bg-emergency text-emergency-foreground"
      case "nurse":
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
          {loading ? (
            <div className="text-center py-4">Loading messages...</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{msg.sender}</span>
                    <Badge variant="secondary" className={`text-xs ${getRoleColor(msg.role)}`}>
                      {msg.role}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg text-sm bg-muted text-muted-foreground">
                    {msg.content}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
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