import { MedicalHeader } from "@/components/MedicalHeader"
import { RoleSelector } from "@/components/RoleSelector"
import { VitalsDisplay } from "@/components/VitalsDisplay"
import { ChatInterface } from "@/components/ChatInterface"
import { EmergencyPanel } from "@/components/EmergencyPanel"
import { PatientCard } from "@/components/PatientCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockPatients = [
  {
    id: "1",
    name: "John Smith",
    age: 65,
    condition: "Acute Myocardial Infarction",
    status: "critical" as const,
    lastUpdate: "5 minutes ago",
    location: "Ambulance Unit 7",
    allergies: ["Penicillin", "Aspirin"],
    medications: ["Metoprolol", "Lisinopril"]
  },
  {
    id: "2",
    name: "Maria Garcia",
    age: 58,
    condition: "Unstable Angina",
    status: "monitoring" as const,
    lastUpdate: "12 minutes ago",
    location: "Emergency Room",
    allergies: ["Latex"],
    medications: ["Atorvastatin", "Clopidogrel"]
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-medical">
      <MedicalHeader />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="roles">Role Access</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Real-time Vitals Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Live Patient Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <VitalsDisplay />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Communication Panel */}
              <ChatInterface />
              
              {/* Emergency Alerts */}
              <EmergencyPanel />
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EmergencyPanel />
              </div>
              <div>
                <ChatInterface />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <RoleSelector />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
