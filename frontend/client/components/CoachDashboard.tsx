import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Users,
  MessageCircle,
  Settings,
  BarChart3,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Video,
  Mail,
} from "lucide-react";

interface CoachDashboardProps {
  activeTab: string;
}

const mockClients = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-11-15",
    sessionsCompleted: 8,
    nextSession: "2024-12-15 10:00 AM",
    goal: "Weight Loss",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    progress: 75,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-10-20",
    sessionsCompleted: 15,
    nextSession: "2024-12-16 2:00 PM",
    goal: "Muscle Gain",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    progress: 60,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-12-01",
    sessionsCompleted: 3,
    nextSession: "2024-12-17 9:00 AM",
    goal: "Flexibility",
    status: "New",
    avatar: "/api/placeholder/40/40",
    progress: 25,
  },
];

const mockSchedule = [
  {
    id: 1,
    time: "9:00 AM",
    duration: "60 min",
    client: "Emma Wilson",
    type: "Personal Training",
    status: "confirmed",
    location: "Studio A",
  },
  {
    id: 2,
    time: "11:00 AM",
    duration: "45 min",
    client: "Michael Chen",
    type: "Strength Training",
    status: "confirmed",
    location: "Studio B",
  },
  {
    id: 3,
    time: "2:00 PM",
    duration: "90 min",
    client: "Sarah Johnson",
    type: "Yoga Session",
    status: "pending",
    location: "Online",
  },
];

const mockServices = [
  {
    id: 1,
    name: "Personal Training",
    duration: "60 min",
    price: "$75",
    description: "One-on-one personalized training session",
    active: true,
  },
  {
    id: 2,
    name: "Group Fitness",
    duration: "45 min",
    price: "$30",
    description: "Small group training (up to 6 people)",
    active: true,
  },
  {
    id: 3,
    name: "Nutrition Consultation",
    duration: "30 min",
    price: "$50",
    description: "Personalized nutrition planning and advice",
    active: false,
  },
  {
    id: 4,
    name: "Yoga Flow",
    duration: "75 min",
    price: "$45",
    description: "Gentle yoga flow for all skill levels",
    active: true,
  },
];

const mockMessages = [
  {
    id: 1,
    client: "Emma Wilson",
    preview: "Thank you for today's session! Quick question about...",
    time: "5 min ago",
    unread: true,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    client: "Michael Chen",
    preview: "Can we reschedule tomorrow's session to 3 PM?",
    time: "1 hour ago",
    unread: true,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    client: "Sarah Johnson",
    preview: "Looking forward to our yoga session tomorrow!",
    time: "3 hours ago",
    unread: false,
    avatar: "/api/placeholder/40/40",
  },
];

const mockEarnings = {
  thisMonth: 3200,
  lastMonth: 2890,
  growth: 10.7,
  totalSessions: 48,
  avgSessionRate: 67,
  weeklyEarnings: [
    { week: "Week 1", amount: 720 },
    { week: "Week 2", amount: 890 },
    { week: "Week 3", amount: 650 },
    { week: "Week 4", amount: 940 },
  ],
};

export default function CoachDashboard({ activeTab }: CoachDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  if (activeTab === "clients") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Clients</h1>
            <p className="text-gray-600">
              Manage your client relationships and progress
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="grid gap-6">
          {mockClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <Badge
                          variant={
                            client.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {client.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{client.email}</p>
                      <p className="text-gray-500 text-sm">{client.phone}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          Goal: {client.goal}
                        </span>
                        <span className="text-sm text-gray-500">
                          Sessions: {client.sessionsCompleted}
                        </span>
                        <span className="text-sm text-gray-500">
                          Next: {client.nextSession}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-vibecore-red">
                        {client.progress}%
                      </div>
                      <p className="text-sm text-gray-500">Progress</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "calendar") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
            <p className="text-gray-600">
              Manage your appointments and availability
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Block Time
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Today's Schedule
                  <Badge variant="secondary">
                    {mockSchedule.length} sessions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSchedule.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-semibold">{session.time}</div>
                          <div className="text-sm text-gray-500">
                            {session.duration}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{session.type}</h4>
                          <p className="text-sm text-gray-600">
                            with {session.client}
                          </p>
                          <p className="text-sm text-gray-500">
                            {session.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            session.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {session.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Today's Sessions</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Today</span>
                  <span className="font-semibold text-green-600">$195</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "services") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Services & Rates
            </h1>
            <p className="text-gray-600">
              Manage your service offerings and pricing
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockServices.map((service) => (
            <Card key={service.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <Badge variant={service.active ? "default" : "secondary"}>
                        {service.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-vibecore-red">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">32</div>
                <p className="text-sm text-gray-600">Personal Training</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">18</div>
                <p className="text-sm text-gray-600">Group Fitness</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <p className="text-sm text-gray-600">Yoga Flow</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <p className="text-sm text-gray-600">Nutrition</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeTab === "messages") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with your clients</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Client Messages
                  <Badge variant="secondary">
                    {mockMessages.filter((m) => m.unread).length} new
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                        message.unread
                          ? "bg-blue-50 border border-blue-200"
                          : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>
                          {message.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{message.client}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {message.preview}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.time}
                        </p>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Emma Wilson</h3>
                    <p className="text-sm text-gray-600">Active Client</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-64 p-4 overflow-y-auto bg-gray-50">
                  <div className="text-center text-gray-500 text-sm">
                    Select a conversation to start messaging
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "analytics") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">
            Track your coaching performance and earnings
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${mockEarnings.thisMonth}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Growth</p>
                  <p className="text-2xl font-bold text-blue-600">
                    +{mockEarnings.growth}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessions</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {mockEarnings.totalSessions}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rate</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${mockEarnings.avgSessionRate}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEarnings.weeklyEarnings.map((week, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{week.week}</span>
                    <span className="font-semibold">${week.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Client Retention
                  </span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-semibold text-yellow-600">4.8 ⭐</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold text-blue-600">
                    &lt; 2 hours
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Booking Rate</span>
                  <span className="font-semibold text-purple-600">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
