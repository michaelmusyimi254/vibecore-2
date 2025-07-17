import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  Heart,
  MessageCircle,
  Settings,
  BarChart3,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  CheckCircle,
  Phone,
  Video,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

interface MemberDashboardProps {
  activeTab: string;
}

const mockBookings = [
  {
    id: 1,
    type: "Personal Training",
    coach: "Sarah Johnson",
    date: "2024-12-15",
    time: "9:00 AM",
    duration: "60 min",
    status: "confirmed",
    location: "Downtown Fitness Center",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    type: "Yoga Class",
    coach: "Mike Chen",
    date: "2024-12-16",
    time: "7:00 PM",
    duration: "75 min",
    status: "pending",
    location: "Zen Wellness Studio",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    type: "Nutrition Consultation",
    coach: "Dr. Emily Watson",
    date: "2024-12-18",
    time: "2:00 PM",
    duration: "45 min",
    status: "confirmed",
    location: "Online",
    avatar: "/api/placeholder/40/40",
  },
];

const mockSavedProfiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Personal Training",
    rating: 4.9,
    reviews: 127,
    price: "$45/session",
    location: "Downtown",
    avatar: "/api/placeholder/80/80",
    tags: ["Weight Loss", "Strength Training"],
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "Yoga Instructor",
    rating: 4.8,
    reviews: 89,
    price: "$35/session",
    location: "Zen Studio",
    avatar: "/api/placeholder/80/80",
    tags: ["Hatha Yoga", "Meditation"],
  },
  {
    id: 3,
    name: "Elite Fitness Center",
    type: "Studio",
    rating: 4.6,
    reviews: 234,
    location: "Main Street",
    avatar: "/api/placeholder/80/80",
    tags: ["24/7", "Pool", "Sauna"],
  },
];

const mockProgress = {
  weeklyGoal: 5,
  completed: 3,
  streak: 7,
  totalSessions: 24,
  achievements: [
    { name: "First Week", completed: true, date: "2024-11-15" },
    { name: "10 Sessions", completed: true, date: "2024-12-01" },
    { name: "Consistency King", completed: false, progress: 70 },
  ],
  weeklyStats: [
    { day: "Mon", sessions: 1 },
    { day: "Tue", sessions: 0 },
    { day: "Wed", sessions: 1 },
    { day: "Thu", sessions: 1 },
    { day: "Fri", sessions: 0 },
    { day: "Sat", sessions: 1 },
    { day: "Sun", sessions: 0 },
  ],
};

const mockMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    preview: "Great session today! Here's your workout plan for next week...",
    time: "10 min ago",
    unread: true,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    sender: "Mike Chen",
    preview: "Don't forget about our yoga session tomorrow at 7 PM",
    time: "2 hours ago",
    unread: true,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    sender: "Elite Fitness Center",
    preview: "New group class schedule is now available",
    time: "1 day ago",
    unread: false,
    avatar: "/api/placeholder/40/40",
  },
];

export default function MemberDashboard({ activeTab }: MemberDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  if (activeTab === "bookings") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600">
              Manage your upcoming sessions and appointments
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Link to="/search" className="flex items-center">
              Book New Session
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upcoming Sessions
                  <Badge variant="secondary">
                    {mockBookings.length} sessions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={booking.avatar} />
                          <AvatarFallback>
                            {booking.coach
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{booking.type}</h4>
                          <p className="text-sm text-gray-600">
                            with {booking.coach}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {booking.date} at {booking.time}
                            <Clock className="w-4 h-4 ml-3 mr-1" />
                            {booking.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {booking.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
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
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Find New Coach
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Coach
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
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
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "saved") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Profiles</h1>
            <p className="text-gray-600">Your favorite coaches and studios</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Input placeholder="Search saved..." className="w-64" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSavedProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{profile.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {profile.specialty || profile.type}
                </p>
                <p className="text-gray-500 text-sm mb-3 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {profile.location}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {profile.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({profile.reviews})
                    </span>
                  </div>
                  {profile.price && (
                    <span className="font-semibold text-vibecore-red">
                      {profile.price}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {profile.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-vibecore-red hover:bg-vibecore-red-hover">
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "chat") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Connect with your coaches and studios</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Conversations
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
                          {message.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{message.sender}</p>
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
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Personal Trainer</p>
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

  if (activeTab === "progress") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Progress Tracking
          </h1>
          <p className="text-gray-600">Monitor your wellness journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-vibecore-red">
                  {mockProgress.completed}/{mockProgress.weeklyGoal}
                </div>
                <p className="text-gray-600">Weekly Goal</p>
                <Progress
                  value={
                    (mockProgress.completed / mockProgress.weeklyGoal) * 100
                  }
                  className="mt-3"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockProgress.streak}
                </div>
                <p className="text-gray-600">Day Streak</p>
                <div className="flex justify-center mt-3">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full mx-1 ${
                        i < mockProgress.streak ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mockProgress.totalSessions}
                </div>
                <p className="text-gray-600">Total Sessions</p>
                <p className="text-sm text-gray-500 mt-2">This month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end h-32">
                {mockProgress.weeklyStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-vibecore-red rounded-t"
                      style={{
                        height: `${stat.sessions * 40 + 10}px`,
                        width: "20px",
                      }}
                    />
                    <span className="text-xs text-gray-600 mt-2">
                      {stat.day}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProgress.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          achievement.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        {achievement.completed ? (
                          <p className="text-sm text-gray-500">
                            Completed {achievement.date}
                          </p>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={achievement.progress}
                              className="w-20 h-2"
                            />
                            <span className="text-xs text-gray-500">
                              {achievement.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === "profile") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG max 5MB</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <Input defaultValue="Sarah" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <Input defaultValue="Johnson" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input defaultValue="sarah.johnson@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <Input defaultValue="New York, NY" />
              </div>

              <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <Button variant="outline" size="sm">
                  On
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>SMS Alerts</span>
                <Button variant="outline" size="sm">
                  Off
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Privacy Mode</span>
                <Button variant="outline" size="sm">
                  Public
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
