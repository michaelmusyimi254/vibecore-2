import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Activity,
  CheckCircle,
} from "lucide-react";

interface StudioDashboardProps {
  activeTab: string;
}

const mockPrograms = [
  {
    id: 1,
    name: "Morning Yoga Flow",
    instructor: "Sarah Chen",
    schedule: "Mon, Wed, Fri 7:00 AM",
    duration: "60 min",
    capacity: 20,
    enrolled: 18,
    price: "$25/class",
    status: "active",
    rating: 4.9,
  },
  {
    id: 2,
    name: "HIIT Bootcamp",
    instructor: "Mike Johnson",
    schedule: "Tue, Thu 6:00 PM",
    duration: "45 min",
    capacity: 15,
    enrolled: 12,
    price: "$30/class",
    status: "active",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Pilates Core",
    instructor: "Emma Wilson",
    schedule: "Sat, Sun 10:00 AM",
    duration: "50 min",
    capacity: 12,
    enrolled: 10,
    price: "$28/class",
    status: "paused",
    rating: 4.8,
  },
];

const mockTrainers = [
  {
    id: 1,
    name: "Sarah Chen",
    specialty: "Yoga & Meditation",
    experience: "5 years",
    rating: 4.9,
    sessions: 234,
    availability: "Full-time",
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Mike Johnson",
    specialty: "HIIT & Strength",
    experience: "7 years",
    rating: 4.7,
    sessions: 189,
    availability: "Part-time",
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Emma Wilson",
    specialty: "Pilates & Barre",
    experience: "4 years",
    rating: 4.8,
    sessions: 156,
    availability: "Weekend",
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
];

const mockBookings = [
  {
    id: 1,
    member: "Alex Thompson",
    program: "Morning Yoga Flow",
    date: "2024-12-15",
    time: "7:00 AM",
    status: "confirmed",
    payment: "paid",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    member: "Jessica Lee",
    program: "HIIT Bootcamp",
    date: "2024-12-15",
    time: "6:00 PM",
    status: "pending",
    payment: "pending",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    member: "David Chen",
    program: "Pilates Core",
    date: "2024-12-16",
    time: "10:00 AM",
    status: "confirmed",
    payment: "paid",
    avatar: "/api/placeholder/40/40",
  },
];

const mockMembers = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@email.com",
    membership: "Premium",
    joinDate: "2024-10-15",
    lastVisit: "2024-12-14",
    totalSessions: 45,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Jessica Lee",
    email: "jessica@email.com",
    membership: "Basic",
    joinDate: "2024-11-20",
    lastVisit: "2024-12-13",
    totalSessions: 23,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "David Chen",
    email: "david@email.com",
    membership: "Premium",
    joinDate: "2024-09-10",
    lastVisit: "2024-12-12",
    totalSessions: 67,
    status: "active",
    avatar: "/api/placeholder/40/40",
  },
];

const mockStats = {
  totalMembers: 145,
  activePrograms: 8,
  monthlyRevenue: 12400,
  avgRating: 4.8,
  occupancyRate: 78,
  newMembers: 12,
  sessionsThisWeek: 89,
  revenueGrowth: 15.2,
};

export default function StudioDashboard({ activeTab }: StudioDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  if (activeTab === "programs") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Programs & Classes
            </h1>
            <p className="text-gray-600">
              Manage your fitness programs and schedules
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Program
          </Button>
        </div>

        <div className="grid gap-6">
          {mockPrograms.map((program) => (
            <Card
              key={program.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{program.name}</h3>
                      <Badge
                        variant={
                          program.status === "active" ? "default" : "secondary"
                        }
                      >
                        {program.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">
                      with {program.instructor}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {program.schedule}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {program.enrolled}/{program.capacity}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {program.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-vibecore-red">
                        {Math.round(
                          (program.enrolled / program.capacity) * 100,
                        )}
                        %
                      </div>
                      <p className="text-sm text-gray-500">Capacity</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {program.price}
                      </div>
                      <p className="text-sm text-gray-500">Rate</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress
                    value={(program.enrolled / program.capacity) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "trainers") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trainers</h1>
            <p className="text-gray-600">Manage your training staff</p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Trainer
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockTrainers.map((trainer) => (
            <Card
              key={trainer.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={trainer.avatar} />
                    <AvatarFallback>
                      {trainer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{trainer.name}</h3>
                    <p className="text-gray-600">{trainer.specialty}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{trainer.experience}</span>
                      <span>•</span>
                      <span>{trainer.sessions} sessions</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {trainer.rating}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline">{trainer.availability}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "bookings") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600">Manage class bookings and schedules</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">{mockBookings.length} today</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={booking.avatar} />
                          <AvatarFallback>
                            {booking.member
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{booking.member}</h4>
                          <p className="text-sm text-gray-600">
                            {booking.program}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {booking.date} at {booking.time}
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
                        >
                          {booking.status}
                        </Badge>
                        <Badge
                          variant={
                            booking.payment === "paid" ? "default" : "secondary"
                          }
                        >
                          {booking.payment}
                        </Badge>
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
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "members") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600">Manage your studio members</p>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Search members..." className="w-64" />
          </div>
        </div>

        <div className="grid gap-4">
          {mockMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.email}</p>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>Joined: {member.joinDate}</span>
                        <span>•</span>
                        <span>Last visit: {member.lastVisit}</span>
                        <span>•</span>
                        <span>{member.totalSessions} sessions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        member.membership === "Premium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {member.membership}
                    </Badge>
                    <Badge variant="outline">{member.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "stats") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Studio performance and insights</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Members</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockStats.totalMembers}
                  </p>
                  <p className="text-sm text-green-600">
                    +{mockStats.newMembers} this month
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${mockStats.monthlyRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +{mockStats.revenueGrowth}% growth
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
                  <p className="text-sm font-medium text-gray-600">Occupancy</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {mockStats.occupancyRate}%
                  </p>
                  <p className="text-sm text-gray-600">Average rate</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockStats.avgRating}
                  </p>
                  <p className="text-sm text-gray-600">
                    {mockStats.sessionsThisWeek} sessions
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPrograms.map((program) => (
                  <div key={program.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{program.name}</span>
                      <span className="text-sm text-gray-600">
                        {program.enrolled}/{program.capacity}
                      </span>
                    </div>
                    <Progress
                      value={(program.enrolled / program.capacity) * 100}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm">
                    New member joined: Alex Thompson
                  </span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">HIIT Bootcamp class completed</span>
                  <span className="text-xs text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm">New 5-star review received</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
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
