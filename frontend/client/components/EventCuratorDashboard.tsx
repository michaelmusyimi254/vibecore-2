import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  QrCode,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Ticket,
} from "lucide-react";

interface EventCuratorDashboardProps {
  activeTab: string;
}

const mockEvents = [
  {
    id: 1,
    title: "Morning Yoga Retreat",
    description: "A peaceful morning yoga session in the park",
    date: "2024-12-20",
    time: "7:00 AM",
    duration: "2 hours",
    location: "Central Park",
    capacity: 50,
    registered: 42,
    price: 25,
    status: "published",
    category: "Wellness",
    image: "/api/placeholder/300/200",
  },
  {
    id: 2,
    title: "HIIT Bootcamp Challenge",
    description: "High-intensity interval training session",
    date: "2024-12-22",
    time: "6:00 PM",
    duration: "1 hour",
    location: "Fitness Studio Downtown",
    capacity: 20,
    registered: 18,
    price: 35,
    status: "published",
    category: "Fitness",
    image: "/api/placeholder/300/200",
  },
  {
    id: 3,
    title: "Mindfulness Workshop",
    description: "Learn meditation and mindfulness techniques",
    date: "2024-12-25",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Wellness Center",
    capacity: 30,
    registered: 12,
    price: 45,
    status: "draft",
    category: "Mental Health",
    image: "/api/placeholder/300/200",
  },
];

const mockBookings = [
  {
    id: 1,
    attendee: "Sarah Johnson",
    event: "Morning Yoga Retreat",
    bookingDate: "2024-12-10",
    status: "confirmed",
    paymentStatus: "paid",
    checkInStatus: "pending",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    attendee: "Mike Chen",
    event: "HIIT Bootcamp Challenge",
    bookingDate: "2024-12-12",
    status: "confirmed",
    paymentStatus: "paid",
    checkInStatus: "pending",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    attendee: "Emma Wilson",
    event: "Morning Yoga Retreat",
    bookingDate: "2024-12-11",
    status: "waitlist",
    paymentStatus: "pending",
    checkInStatus: "pending",
    avatar: "/api/placeholder/40/40",
  },
];

const mockAttendeeStats = {
  totalAttendees: 324,
  avgEventRating: 4.9,
  repeatAttendees: 156,
  noShowRate: 8.2,
  checkInRate: 91.8,
  revenueThisMonth: 12450,
  eventsCompleted: 15,
  upcomingEvents: 8,
};

const mockCheckinData = [
  {
    eventId: 1,
    eventName: "Morning Yoga Retreat",
    totalRegistered: 42,
    checkedIn: 38,
    noShows: 4,
    qrCode: "QR_YOGA_001",
  },
  {
    eventId: 2,
    eventName: "HIIT Bootcamp Challenge",
    totalRegistered: 18,
    checkedIn: 16,
    noShows: 2,
    qrCode: "QR_HIIT_002",
  },
];

export default function EventCuratorDashboard({
  activeTab,
}: EventCuratorDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "waitlist":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (activeTab === "events") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Events Management
            </h1>
            <p className="text-gray-600">
              Create and manage your wellness events
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        <div className="grid gap-6">
          {mockEvents.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <CardContent className="p-6">
                <div className="flex space-x-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge variant={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${event.price}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">per person</p>
                    <div className="text-lg font-semibold text-vibecore-red">
                      {Math.round((event.registered / event.capacity) * 100)}%
                    </div>
                    <p className="text-sm text-gray-500">filled</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress
                    value={(event.registered / event.capacity) * 100}
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

  if (activeTab === "bookings") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600">Manage event registrations</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">{mockBookings.length} pending</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      onMouseEnter={(e) => {
                        const card = e.currentTarget;
                        card.style.transform =
                          "perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.01)";
                      }}
                      onMouseLeave={(e) => {
                        const card = e.currentTarget;
                        card.style.transform =
                          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={booking.avatar} />
                          <AvatarFallback>
                            {booking.attendee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{booking.attendee}</h4>
                          <p className="text-sm text-gray-600">
                            {booking.event}
                          </p>
                          <p className="text-xs text-gray-500">
                            Booked: {booking.bookingDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getBookingStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <Badge
                          variant={
                            booking.paymentStatus === "paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
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

  if (activeTab === "checkin") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Check-in QR</h1>
            <p className="text-gray-600">
              Manage event check-ins with QR codes
            </p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR
          </Button>
        </div>

        <div className="grid gap-6">
          {mockCheckinData.map((event) => (
            <Card
              key={event.eventId}
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(3deg) rotateY(3deg) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {event.eventName}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {event.totalRegistered}
                        </div>
                        <p className="text-sm text-gray-600">Registered</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {event.checkedIn}
                        </div>
                        <p className="text-sm text-gray-600">Checked In</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {event.noShows}
                        </div>
                        <p className="text-sm text-gray-600">No Shows</p>
                      </div>
                    </div>
                    <Progress
                      value={(event.checkedIn / event.totalRegistered) * 100}
                      className="h-3"
                    />
                  </div>
                  <div className="ml-6 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 font-mono">
                      {event.qrCode}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Download QR
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

  if (activeTab === "attendees") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendee Stats</h1>
          <p className="text-gray-600">
            Insights about your event participants
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer hover:rotate-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Attendees
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockAttendeeStats.totalAttendees}
                  </p>
                  <p className="text-sm text-gray-600">All time</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer hover:-rotate-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Rating
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockAttendeeStats.avgEventRating}
                  </p>
                  <p className="text-sm text-gray-600">Event rating</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer hover:rotate-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Check-in Rate
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockAttendeeStats.checkInRate}%
                  </p>
                  <p className="text-sm text-gray-600">Attendance rate</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer hover:-rotate-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${mockAttendeeStats.revenueThisMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div key={event.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{event.title}</span>
                      <span className="text-sm text-gray-600">
                        {event.registered} attendees
                      </span>
                    </div>
                    <Progress
                      value={(event.registered / event.capacity) * 100}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Repeat Attendees</span>
                  <span className="font-semibold">
                    {mockAttendeeStats.repeatAttendees}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No-Show Rate</span>
                  <span className="font-semibold text-red-600">
                    {mockAttendeeStats.noShowRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Events Completed</span>
                  <span className="font-semibold">
                    {mockAttendeeStats.eventsCompleted}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming Events</span>
                  <span className="font-semibold text-blue-600">
                    {mockAttendeeStats.upcomingEvents}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
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
            Comprehensive insights into your events
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mockAttendeeStats.eventsCompleted}
                </div>
                <p className="text-gray-600">Events Completed</p>
                <p className="text-sm text-green-600 mt-1">+3 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ${mockAttendeeStats.revenueThisMonth.toLocaleString()}
                </div>
                <p className="text-gray-600">Revenue</p>
                <p className="text-sm text-green-600 mt-1">+18% growth</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {mockAttendeeStats.avgEventRating}
                </div>
                <p className="text-gray-600">Average Rating</p>
                <p className="text-sm text-gray-500 mt-1">Event satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>Event Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Wellness</span>
                  <span className="font-semibold">5 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fitness</span>
                  <span className="font-semibold">3 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mental Health</span>
                  <span className="font-semibold">2 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nutrition</span>
                  <span className="font-semibold">1 event</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Attendance</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak Attendance Day</span>
                  <span className="font-semibold">Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Popular Time</span>
                  <span className="font-semibold">2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation Rate</span>
                  <span className="font-semibold text-yellow-600">12%</span>
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
