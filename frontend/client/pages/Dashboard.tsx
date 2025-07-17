import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  Calendar as CalendarIcon,
  Heart,
  User,
  Building2,
  ShoppingBag,
  Calendar as EventIcon,
  MessageCircle,
  Settings,
  BarChart3,
  Users,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  CheckCircle,
  AlertCircle,
  QrCode,
  Eye,
  Plus,
  Edit,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";

// Mock data for demonstration
const mockUserData = {
  role: "member", // member, coach, studio, brand-seller, event-curator
  name: "Sarah Johnson",
  avatar: "/api/placeholder/80/80",
  stats: {
    member: { sessionsBooked: 12, savedProfiles: 8, progress: 65 },
    coach: { clients: 24, earnings: 3200, rating: 4.8 },
    studio: { members: 145, bookings: 89, revenue: 12400 },
    "brand-seller": { products: 32, orders: 156, revenue: 8900 },
    "event-curator": { events: 8, attendees: 324, rating: 4.9 },
  },
};

function MobileNavigation({ activeTab, setActiveTab, role }: any) {
  const getNavItems = () => {
    switch (role) {
      case "member":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "bookings", icon: CalendarIcon, label: "Bookings" },
          { id: "saved", icon: Heart, label: "Saved" },
          { id: "chat", icon: MessageCircle, label: "Chat" },
          { id: "profile", icon: User, label: "Profile" },
        ];
      case "coach":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "clients", icon: Users, label: "Clients" },
          { id: "calendar", icon: CalendarIcon, label: "Calendar" },
          { id: "services", icon: Settings, label: "Services" },
          { id: "messages", icon: MessageCircle, label: "Messages" },
        ];
      case "studio":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "programs", icon: Calendar, label: "Programs" },
          { id: "trainers", icon: Users, label: "Trainers" },
          { id: "bookings", icon: CalendarIcon, label: "Bookings" },
          { id: "stats", icon: TrendingUp, label: "Stats" },
        ];
      case "brand-seller":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "products", icon: Package, label: "Products" },
          { id: "orders", icon: ShoppingBag, label: "Orders" },
          { id: "inventory", icon: AlertCircle, label: "Stock" },
          { id: "revenue", icon: DollarSign, label: "Revenue" },
        ];
      case "event-curator":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "events", icon: EventIcon, label: "Events" },
          { id: "bookings", icon: CalendarIcon, label: "Bookings" },
          { id: "checkin", icon: QrCode, label: "Check-in" },
          { id: "analytics", icon: BarChart3, label: "Analytics" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around py-2">
        {getNavItems().map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-3 min-w-0 ${
              activeTab === item.id
                ? "text-vibecore-red"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DesktopSidebar({ activeTab, setActiveTab, role, userData }: any) {
  const getNavItems = () => {
    switch (role) {
      case "member":
        return [
          { id: "overview", icon: BarChart3, label: "Overview" },
          { id: "bookings", icon: CalendarIcon, label: "My Bookings" },
          { id: "saved", icon: Heart, label: "Saved Profiles" },
          { id: "chat", icon: MessageCircle, label: "Messages" },
          { id: "progress", icon: TrendingUp, label: "Progress" },
          { id: "profile", icon: User, label: "Profile Settings" },
        ];
      case "coach":
        return [
          { id: "overview", icon: BarChart3, label: "Dashboard" },
          { id: "clients", icon: Users, label: "My Clients" },
          { id: "calendar", icon: CalendarIcon, label: "Schedule" },
          { id: "services", icon: Settings, label: "Services & Rates" },
          { id: "messages", icon: MessageCircle, label: "Messages" },
          { id: "analytics", icon: TrendingUp, label: "Analytics" },
        ];
      case "studio":
        return [
          { id: "overview", icon: BarChart3, label: "Dashboard" },
          { id: "programs", icon: Calendar, label: "Programs & Classes" },
          { id: "trainers", icon: Users, label: "Trainers" },
          { id: "bookings", icon: CalendarIcon, label: "Bookings" },
          { id: "members", icon: Heart, label: "Members" },
          { id: "stats", icon: TrendingUp, label: "Analytics" },
        ];
      case "brand-seller":
        return [
          { id: "overview", icon: BarChart3, label: "Dashboard" },
          { id: "products", icon: Package, label: "Product Listings" },
          { id: "orders", icon: ShoppingBag, label: "Orders" },
          { id: "inventory", icon: AlertCircle, label: "Stock Alerts" },
          { id: "revenue", icon: DollarSign, label: "Revenue Tracker" },
          { id: "analytics", icon: TrendingUp, label: "Analytics" },
        ];
      case "event-curator":
        return [
          { id: "overview", icon: BarChart3, label: "Dashboard" },
          { id: "events", icon: EventIcon, label: "Events Management" },
          { id: "bookings", icon: CalendarIcon, label: "Bookings" },
          { id: "checkin", icon: QrCode, label: "Check-in QR" },
          { id: "attendees", icon: Users, label: "Attendee Stats" },
          { id: "analytics", icon: TrendingUp, label: "Analytics" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200 pt-20">
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* User info */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {userData.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {role.replace("-", " ")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {getNavItems().map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id
                  ? "bg-vibecore-red text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function OverviewContent({ role, userData }: any) {
  const getRoleTitle = () => {
    switch (role) {
      case "member":
        return "Welcome to Your Wellness Journey";
      case "coach":
        return "Coach Dashboard";
      case "studio":
        return "Studio Management";
      case "brand-seller":
        return "Brand Seller Hub";
      case "event-curator":
        return "Event Curator Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getQuickStats = () => {
    switch (role) {
      case "member":
        return [
          {
            label: "Sessions Booked",
            value: userData.stats.member.sessionsBooked,
            icon: CalendarIcon,
            color: "text-blue-600",
          },
          {
            label: "Saved Profiles",
            value: userData.stats.member.savedProfiles,
            icon: Heart,
            color: "text-red-600",
          },
          {
            label: "Progress",
            value: `${userData.stats.member.progress}%`,
            icon: TrendingUp,
            color: "text-green-600",
          },
        ];
      case "coach":
        return [
          {
            label: "Active Clients",
            value: userData.stats.coach.clients,
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "Monthly Earnings",
            value: `$${userData.stats.coach.earnings}`,
            icon: DollarSign,
            color: "text-green-600",
          },
          {
            label: "Rating",
            value: userData.stats.coach.rating,
            icon: Star,
            color: "text-yellow-600",
          },
        ];
      case "studio":
        return [
          {
            label: "Members",
            value: userData.stats.studio.members,
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "This Month Bookings",
            value: userData.stats.studio.bookings,
            icon: CalendarIcon,
            color: "text-purple-600",
          },
          {
            label: "Revenue",
            value: `$${userData.stats.studio.revenue}`,
            icon: DollarSign,
            color: "text-green-600",
          },
        ];
      case "brand-seller":
        return [
          {
            label: "Products Listed",
            value: userData.stats["brand-seller"].products,
            icon: Package,
            color: "text-blue-600",
          },
          {
            label: "Orders",
            value: userData.stats["brand-seller"].orders,
            icon: ShoppingBag,
            color: "text-purple-600",
          },
          {
            label: "Revenue",
            value: `$${userData.stats["brand-seller"].revenue}`,
            icon: DollarSign,
            color: "text-green-600",
          },
        ];
      case "event-curator":
        return [
          {
            label: "Events Created",
            value: userData.stats["event-curator"].events,
            icon: EventIcon,
            color: "text-blue-600",
          },
          {
            label: "Total Attendees",
            value: userData.stats["event-curator"].attendees,
            icon: Users,
            color: "text-purple-600",
          },
          {
            label: "Rating",
            value: userData.stats["event-curator"].rating,
            icon: Star,
            color: "text-yellow-600",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{getRoleTitle()}</h1>
        <p className="text-gray-600">
          Manage your {role.replace("-", " ")} activities and track your
          progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getQuickStats().map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {role === "member" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Find Coach</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-sm">Book Session</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">View Progress</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Messages</span>
                </Button>
              </>
            )}
            {role === "coach" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Client</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-sm">Schedule</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Services</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </>
            )}
            {role === "studio" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Program</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Trainers</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-sm">Bookings</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </>
            )}
            {role === "brand-seller" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Inventory</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <ShoppingBag className="h-6 w-6" />
                  <span className="text-sm">Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </>
            )}
            {role === "event-curator" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Create Event</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-sm">Bookings</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <QrCode className="h-6 w-6" />
                  <span className="text-sm">Check-in</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {role === "member" && (
              <>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">
                    Completed yoga session with Maria Thompson
                  </span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="text-sm">
                    Saved fitness coach: David Martinez
                  </span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">
                    Booked pilates class for tomorrow
                  </span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </>
            )}

            {role === "coach" && (
              <>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">
                    New client registration: Emma Wilson
                  </span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">
                    Completed session with John Smith
                  </span>
                  <span className="text-xs text-gray-500">3 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Payment received: $120</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </>
            )}

            {role === "studio" && (
              <>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">
                    New member joined: Premium Membership
                  </span>
                  <span className="text-xs text-gray-500">30 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">
                    15 bookings for tomorrow's yoga class
                  </span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm">
                    Monthly revenue target achieved
                  </span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </>
            )}

            {role === "brand-seller" && (
              <>
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">
                    New order: Premium Yoga Mat Set
                  </span>
                  <span className="text-xs text-gray-500">45 minutes ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">5 products added to inventory</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm">
                    Low stock alert: Resistance Bands
                  </span>
                  <span className="text-xs text-gray-500">6 hours ago</span>
                </div>
              </>
            )}

            {role === "event-curator" && (
              <>
                <div className="flex items-center space-x-3">
                  <EventIcon className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">
                    Wellness Workshop event published
                  </span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">
                    25 new attendees registered for yoga retreat
                  </span>
                  <span className="text-xs text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">
                    Mindfulness event completed successfully
                  </span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole] = useState(mockUserData.role);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="flex">
        <DesktopSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={userRole}
          userData={mockUserData}
        />

        <main className="flex-1 md:ml-64 pt-20 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === "overview" && (
              <OverviewContent role={userRole} userData={mockUserData} />
            )}

            {/* Placeholder for other tab contents */}
            {activeTab !== "overview" && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Section
                </h2>
                <p className="text-gray-600">
                  This section is under development. Content for {activeTab}{" "}
                  will be implemented here.
                </p>
              </div>
            )}
          </div>
        </main>

        <MobileNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={userRole}
        />
      </div>
    </div>
  );
}
