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
import MemberDashboard from "@/components/MemberDashboard";
import CoachDashboard from "@/components/CoachDashboard";
import StudioDashboard from "@/components/StudioDashboard";
import BrandSellerDashboard from "@/components/BrandSellerDashboard";
import EventCuratorDashboard from "@/components/EventCuratorDashboard";
import AdminDashboard from "@/components/AdminDashboard";

// Get user data from localStorage or use defaults
const getUserData = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || "member";
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    window.location.href = "/login";
    return null;
  }

  const roleNames = {
    member: "Wellness Member",
    coach: "Wellness Coach",
    studio: "Studio Manager",
    "brand-seller": "Brand Seller",
    "event-curator": "Event Curator",
    admin: "Admin Control Center",
  };

  return {
    role: userRole,
    name: roleNames[userRole] || "User",
    email: userEmail,
    avatar: "/api/placeholder/80/80",
    stats: {
      member: { sessionsBooked: 12, savedProfiles: 8, progress: 65 },
      coach: { clients: 24, earnings: 3200, rating: 4.8 },
      studio: { members: 145, bookings: 89, revenue: 12400 },
      "brand-seller": { products: 32, orders: 156, revenue: 8900 },
      "event-curator": { events: 8, attendees: 324, rating: 4.9 },
      admin: { totalUsers: 12847, revenue: 245680, growth: 18.5, alerts: 4 },
    },
  };
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
      case "admin":
        return [
          { id: "overview", icon: BarChart3, label: "Control" },
          { id: "alerts", icon: AlertCircle, label: "Alerts" },
          { id: "users", icon: Users, label: "Users" },
          { id: "inbox", icon: MessageCircle, label: "Inbox" },
          { id: "revenue", icon: DollarSign, label: "Revenue" },
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
            className={`flex flex-col items-center py-2 px-3 min-w-0 transition-all duration-300 hover:scale-110 ${
              activeTab === item.id
                ? "text-vibecore-red"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <item.icon
              className={`w-5 h-5 mb-1 ${role === "admin" && activeTab === item.id ? "animate-pulse" : ""}`}
            />
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
      case "admin":
        return [
          { id: "overview", icon: BarChart3, label: "🔥 CONTROL CENTER" },
          { id: "alerts", icon: AlertCircle, label: "⚠️ CRITICAL ALERTS" },
          { id: "users", icon: Users, label: "👥 USER MANAGEMENT" },
          { id: "inbox", icon: MessageCircle, label: "📧 ADMIN INBOX" },
          { id: "revenue", icon: DollarSign, label: "💰 REVENUE CONTROL" },
          { id: "settings", icon: Settings, label: "⚙️ PLATFORM SETTINGS" },
        ];
      default:
        return [];
    }
  };

  return (
    <div
      className={`hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ${role === "admin" ? "bg-gradient-to-b from-red-50 to-orange-50 border-r-2 border-red-200" : "bg-white border-r border-gray-200"} pt-20`}
    >
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* User info */}
        <div
          className={`px-4 py-6 border-b ${role === "admin" ? "border-red-200 bg-red-100/50" : "border-gray-200"}`}
        >
          <div className="flex items-center">
            <Avatar
              className={`h-12 w-12 ${role === "admin" ? "ring-2 ring-red-400" : ""}`}
            >
              <AvatarImage src={userData.avatar} />
              <AvatarFallback
                className={role === "admin" ? "bg-red-200 text-red-800" : ""}
              >
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${role === "admin" ? "text-red-900" : "text-gray-900"}`}
              >
                {userData.name}
              </p>
              <p
                className={`text-xs ${role === "admin" ? "text-red-700 font-semibold" : "text-gray-500"} capitalize`}
              >
                {role.replace("-", " ")} {role === "admin" && "🛡️"}
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
              className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                activeTab === item.id
                  ? role === "admin"
                    ? "bg-red-600 text-white shadow-lg animate-pulse"
                    : "bg-vibecore-red text-white"
                  : role === "admin"
                    ? "text-red-700 hover:bg-red-100 hover:text-red-900"
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
      case "admin":
        return "⚡ CRITICAL ADMIN CONTROL CENTER ⚡";
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
      case "admin":
        return [
          {
            label: "TOTAL USERS",
            value: userData.stats.admin.totalUsers.toLocaleString(),
            icon: Users,
            color: "text-red-600",
          },
          {
            label: "PLATFORM REVENUE",
            value: `$${userData.stats.admin.revenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-green-600",
          },
          {
            label: "GROWTH RATE",
            value: `+${userData.stats.admin.growth}%`,
            icon: TrendingUp,
            color: "text-purple-600",
          },
          {
            label: "CRITICAL ALERTS",
            value: userData.stats.admin.alerts,
            icon: AlertCircle,
            color: "text-orange-600",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className={`text-2xl font-bold ${role === "admin" ? "text-red-900 text-3xl" : "text-gray-900"}`}
        >
          {getRoleTitle()}
        </h1>
        <p
          className={
            role === "admin" ? "text-red-700 font-semibold" : "text-gray-600"
          }
        >
          {role === "admin"
            ? "🛡️ FULL PLATFORM CONTROL & MONITORING SYSTEM 🛡️"
            : `Manage your ${role.replace("-", " ")} activities and track your progress`}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 ${role === "admin" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-6`}
      >
        {getQuickStats().map((stat, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer ${
              role === "admin"
                ? "border-red-200 bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100"
                : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              if (role === "admin") {
                card.style.transform =
                  "perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05)";
              } else {
                card.style.transform =
                  "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${role === "admin" ? "text-red-700" : "text-gray-600"}`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-bold ${role === "admin" ? "text-red-900" : "text-gray-900"} ${role === "admin" && stat.label.includes("ALERT") ? "animate-pulse" : ""}`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-full ${role === "admin" ? "bg-red-100" : "bg-gray-50"} ${stat.color} ${role === "admin" && stat.label.includes("ALERT") ? "animate-bounce" : ""}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className={role === "admin" ? "border-red-200 bg-red-50/50" : ""}>
        <CardHeader>
          <CardTitle className={role === "admin" ? "text-red-900" : ""}>
            {role === "admin" ? "🚨 CRITICAL CONTROLS" : "Quick Actions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {role === "admin" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2 bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-all duration-300 hover:rotate-1">
                  <AlertCircle className="h-6 w-6" />
                  <span className="text-sm">SYSTEM ALERTS</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 border-red-200 hover:bg-red-50 hover:scale-105 transition-all duration-300 hover:-rotate-1"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">User Management</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 border-orange-200 hover:bg-orange-50 hover:scale-105 transition-all duration-300 hover:rotate-1"
                >
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm">Revenue Control</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all duration-300 hover:-rotate-1"
                >
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Platform Settings</span>
                </Button>
              </>
            )}
            {role === "member" && (
              <>
                <Button className="flex flex-col items-center p-6 h-auto space-y-2 hover:scale-105 transition-transform duration-300">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Find Coach</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 hover:scale-105 transition-transform duration-300"
                >
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-sm">Book Session</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 hover:scale-105 transition-transform duration-300"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">View Progress</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center p-6 h-auto space-y-2 hover:scale-105 transition-transform duration-300"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Messages</span>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className={role === "admin" ? "border-red-200 bg-red-50/50" : ""}>
        <CardHeader>
          <CardTitle className={role === "admin" ? "text-red-900" : ""}>
            {role === "admin" ? "🔥 SYSTEM ACTIVITY" : "Recent Activity"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {role === "admin" ? (
              <>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 animate-pulse" />
                  <span className="text-sm font-semibold text-red-800">
                    CRITICAL: Multiple failed login attempts detected
                  </span>
                  <span className="text-xs text-red-600">2 min ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span className="text-sm">
                    User registration spike: +300% above normal
                  </span>
                  <span className="text-xs text-gray-500">15 min ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm">
                    Revenue milestone: $250K monthly target reached
                  </span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </>
            ) : role === "member" ? (
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
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole] = useState(mockUserData.role);

  // Render role-specific dashboard content
  const renderDashboardContent = () => {
    if (activeTab === "overview") {
      return <OverviewContent role={userRole} userData={mockUserData} />;
    }

    switch (userRole) {
      case "member":
        return <MemberDashboard activeTab={activeTab} />;
      case "coach":
        return <CoachDashboard activeTab={activeTab} />;
      case "studio":
        return <StudioDashboard activeTab={activeTab} />;
      case "brand-seller":
        return <BrandSellerDashboard activeTab={activeTab} />;
      case "event-curator":
        return <EventCuratorDashboard activeTab={activeTab} />;
      case "admin":
        return <AdminDashboard activeTab={activeTab} />;
      default:
        return <OverviewContent role={userRole} userData={mockUserData} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${userRole === "admin" ? "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50" : "bg-gray-50"}`}
    >
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
            {renderDashboardContent()}
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
