import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AlertBanner } from "@/components/AlertBanner";
import { weatherStations } from "@/data/weatherData";
import { Radio, MessageSquare, Send, Users, Bell, Calendar1 as Calendar, Clock, FileText, Paperclip, Search, User, SatelliteDish as Satellite, Wifi, Triangle as AlertTriangle, MapPin } from "lucide-react";

// Mock data for communication hub
const announcements = [
{
  id: 1,
  title: "Monthly Supply Schedule Update",
  content: "The next supply drop has been rescheduled from January 15th to January 18th due to forecasted weather conditions. Please adjust your inventory planning accordingly.",
  author: "Dr. Sarah Chen",
  timestamp: new Date(2024, 0, 10, 9, 30),
  priority: "normal"
},
{
  id: 2,
  title: "Communication System Maintenance",
  content: "The satellite communication system will undergo scheduled maintenance on January 12th from 08:00 to 12:00 UTC. During this time, please use the backup HF radio system for any urgent communications.",
  author: "Alex Thompson",
  timestamp: new Date(2024, 0, 8, 14, 15),
  priority: "important"
},
{
  id: 3,
  title: "New Research Team Arrival",
  content: "Please welcome the glaciology research team from University of Cambridge who will be arriving at Alpha Base on January 20th. They will be conducting ice core sampling for the next three months.",
  author: "Dr. Emma Wilson",
  timestamp: new Date(2024, 0, 5, 11, 45),
  priority: "normal"
},
{
  id: 4,
  title: "Emergency Protocol Update",
  content: "The emergency evacuation protocol has been updated with new extraction points and procedures. All personnel must review the updated document in the Emergency Protocols section by January 15th.",
  author: "Dr. Thomas Lee",
  timestamp: new Date(2024, 0, 3, 16, 20),
  priority: "urgent"
}];


const messages = [
{
  id: 1,
  content: "Has anyone received the latest ice core analysis results from the lab?",
  author: "Dr. Sarah Chen",
  timestamp: new Date(2024, 0, 10, 15, 30),
  replies: [
  {
    id: 101,
    content: "Yes, I just uploaded them to the shared drive. The results show some interesting anomalies around the 2000-year mark.",
    author: "Dr. Michael Rodriguez",
    timestamp: new Date(2024, 0, 10, 15, 45)
  },
  {
    id: 102,
    content: "Thanks Michael. I'll take a look at them now. Can we discuss the findings during tomorrow's meeting?",
    author: "Dr. Sarah Chen",
    timestamp: new Date(2024, 0, 10, 16, 0)
  }]

},
{
  id: 2,
  content: "The weather station at Echo Valley is showing some unusual temperature fluctuations. Can someone check if the sensors are calibrated correctly?",
  author: "James Peterson",
  timestamp: new Date(2024, 0, 9, 10, 15),
  replies: [
  {
    id: 201,
    content: "I'll head over there this afternoon to check. It might be related to the solar panel issues we've been having.",
    author: "Alex Thompson",
    timestamp: new Date(2024, 0, 9, 10, 30)
  }]

},
{
  id: 3,
  content: "Reminder: All research teams need to submit their monthly progress reports by the end of this week.",
  author: "Dr. Emma Wilson",
  timestamp: new Date(2024, 0, 8, 9, 0),
  replies: []
}];


const contacts = [
{
  id: 1,
  name: "Dr. Sarah Chen",
  role: "Lead Researcher",
  station: "Alpha Base",
  status: "online"
},
{
  id: 2,
  name: "Dr. Michael Rodriguez",
  role: "Microbiologist",
  station: "Bravo Outpost",
  status: "online"
},
{
  id: 3,
  name: "Dr. Emma Wilson",
  role: "Atmospheric Scientist",
  station: "Charlie Point",
  status: "offline"
},
{
  id: 4,
  name: "Dr. Thomas Lee",
  role: "Wildlife Biologist",
  station: "Delta Ridge",
  status: "away"
},
{
  id: 5,
  name: "James Peterson",
  role: "Field Technician",
  station: "Alpha Base",
  status: "online"
},
{
  id: 6,
  name: "Alex Thompson",
  role: "Equipment Specialist",
  station: "Echo Valley",
  status: "online"
},
{
  id: 7,
  name: "Dr. Lisa Kumar",
  role: "Glaciologist",
  station: "Bravo Outpost",
  status: "offline"
},
{
  id: 8,
  name: "Sophia Martinez",
  role: "Communications Officer",
  station: "Alpha Base",
  status: "online"
}];


export function CommunicationHub() {
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "normal"
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${formatTime(date)}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${formatTime(date)}`;
    } else {
      return `${date.toLocaleDateString()} at ${formatTime(date)}`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-accent text-accent-foreground">Urgent</Badge>;
      case "important":
        return <Badge className="bg-warning text-warning-foreground">Important</Badge>;
      default:
        return <Badge className="bg-secondary text-secondary-foreground">Normal</Badge>;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "online":
        return <span className="inline-block h-2 w-2 rounded-full bg-success"></span>;
      case "away":
        return <span className="inline-block h-2 w-2 rounded-full bg-warning"></span>;
      default:
        return <span className="inline-block h-2 w-2 rounded-full bg-muted"></span>;
    }
  };

  const filteredContacts = contacts.filter((contact) =>
  contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
  contact.station.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to a backend
      alert(`Message sent: ${newMessage}`);
      setNewMessage("");
    }
  };

  const handlePostAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      // In a real app, this would post the announcement to a backend
      alert(`Announcement posted: ${newAnnouncement.title}`);
      setNewAnnouncement({
        title: "",
        content: "",
        priority: "normal"
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Communication Hub"
        description="Team messaging, announcements, and contact information" />


      <div className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <AlertBanner
            type="info"
            message="Satellite communication system will undergo maintenance on January 12th from 08:00 to 12:00 UTC." />

        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="messages">
              <TabsList className="mb-6">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="status">System Status</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="mt-0">
                <DataCard
                  title="Team Messages"
                  icon={<MessageSquare className="h-5 w-5" />}>

                  <div className="space-y-6 mb-6">
                    {messages.map((message) =>
                    <div key={message.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {message.author.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{message.author}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(message.timestamp)}
                              </span>
                            </div>
                            <p className="mt-1">{message.content}</p>
                            
                            {message.replies.length > 0 &&
                          <div className="mt-4 space-y-4 pl-6 border-l-2 border-muted">
                                {message.replies.map((reply) =>
                            <div key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">
                                        {reply.author.split(' ').map((n) => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{reply.author}</p>
                                        <span className="text-xs text-muted-foreground">
                                          {formatDate(reply.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm mt-1">{reply.content}</p>
                                    </div>
                                  </div>
                            )}
                              </div>
                          }
                            
                            <div className="mt-3 flex items-center gap-2">
                              <Button variant="ghost" size="sm">Reply</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex flex-col gap-4">
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[100px]" />

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="mr-2 h-4 w-4" />
                          Attach File
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}>

                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </DataCard>
              </TabsContent>
              
              <TabsContent value="announcements" className="mt-0">
                <DataCard
                  title="Post Announcement"
                  icon={<Bell className="h-5 w-5" />}>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Title</label>
                      <Input
                        placeholder="Announcement title"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />

                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Content</label>
                      <Textarea
                        placeholder="Announcement content"
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        className="min-h-[100px]" />

                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Priority</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="priority"
                            value="normal"
                            checked={newAnnouncement.priority === "normal"}
                            onChange={() => setNewAnnouncement({ ...newAnnouncement, priority: "normal" })}
                            className="h-4 w-4" />

                          <span>Normal</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="priority"
                            value="important"
                            checked={newAnnouncement.priority === "important"}
                            onChange={() => setNewAnnouncement({ ...newAnnouncement, priority: "important" })}
                            className="h-4 w-4" />

                          <span>Important</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="priority"
                            value="urgent"
                            checked={newAnnouncement.priority === "urgent"}
                            onChange={() => setNewAnnouncement({ ...newAnnouncement, priority: "urgent" })}
                            className="h-4 w-4" />

                          <span>Urgent</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handlePostAnnouncement}
                        disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}>

                        <Bell className="mr-2 h-4 w-4" />
                        Post Announcement
                      </Button>
                    </div>
                  </div>
                </DataCard>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Recent Announcements</h3>
                  <div className="space-y-6">
                    {announcements.map((announcement) =>
                    <DataCard
                      key={announcement.id}
                      title={announcement.title}
                      icon={<FileText className="h-5 w-5" />}
                      className={announcement.priority === "urgent" ? "border-accent" : ""}>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {announcement.author.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{announcement.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(announcement.priority)}
                            <span className="text-xs text-muted-foreground">
                              {formatDate(announcement.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p>{announcement.content}</p>
                      </DataCard>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="status" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DataCard
                    title="Communication Systems"
                    icon={<Radio className="h-5 w-5" />}>

                    <div className="space-y-4 mt-2">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Satellite className="h-5 w-5 text-primary" />
                          <span>Satellite Internet</span>
                        </div>
                        <Badge className="bg-success text-success-foreground">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Radio className="h-5 w-5 text-primary" />
                          <span>HF Radio System</span>
                        </div>
                        <Badge className="bg-success text-success-foreground">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-5 w-5 text-primary" />
                          <span>Local Network</span>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Degraded</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-primary" />
                          <span>Emergency Beacon System</span>
                        </div>
                        <Badge className="bg-success text-success-foreground">Online</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <AlertBanner
                        type="warning"
                        message="Local network experiencing intermittent connectivity issues. Maintenance scheduled for tomorrow." />

                    </div>
                  </DataCard>
                  
                  <DataCard
                    title="Station Status"
                    icon={<MapPin className="h-5 w-5" />}>

                    <div className="space-y-4 mt-2">
                      {weatherStations.map((station) =>
                      <div key={station.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <p className="font-medium">{station.name}</p>
                            <p className="text-xs text-muted-foreground">{station.location}</p>
                          </div>
                          <Badge className={
                        station.status === "online" ?
                        "bg-success text-success-foreground" :
                        station.status === "maintenance" ?
                        "bg-warning text-warning-foreground" :
                        "bg-error text-error-foreground"
                        }>
                            <span className="capitalize">{station.status}</span>
                          </Badge>
                        </div>
                      )}
                    </div>
                  </DataCard>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <DataCard
              title="Team Directory"
              icon={<Users className="h-5 w-5" />}>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    className="pl-9 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />

                </div>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredContacts.map((contact) =>
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">

                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {contact.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                        <p className="text-xs text-muted-foreground">{contact.station}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIndicator(contact.status)}
                      <span className="text-xs capitalize">{contact.status}</span>
                    </div>
                  </div>
                )}
                
                {filteredContacts.length === 0 &&
                <div className="text-center py-4">
                    <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No contacts found</p>
                  </div>
                }
              </div>
            </DataCard>
          </div>
        </div>
      </div>
    </div>);

}