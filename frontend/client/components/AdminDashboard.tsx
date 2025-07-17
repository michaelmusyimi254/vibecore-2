import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  MapPin,
  Calendar,
  BarChart3,
  Shield,
  Settings,
  Bell,
  Eye,
  Filter,
  Download,
  RefreshCw,
  UserCheck,
  UserX,
  Mail,
  MessageSquare,
  Activity,
} from "lucide-react";

interface AdminDashboardProps {
  activeTab: string;
}

const mockOverviewStats = {
  totalUsers: 12847,
  activeUsers: 8934,
  monthlyGrowth: 18.5,
  revenue: 245680,
  revenueGrowth: 12.3,
  totalSessions: 3421,
  avgRating: 4.7,
};

const mockUsersByRole = {
  members: 8934,
  coaches: 1247,
  studios: 298,
  brandSellers: 156,
  eventCurators: 89,
};

const mockRegionalData = [
  { region: "North America", users: 6234, growth: 15.2, color: "bg-blue-500" },
  { region: "Europe", users: 3829, growth: 22.1, color: "bg-green-500" },
  { region: "Asia Pacific", users: 2103, growth: 31.5, color: "bg-purple-500" },
  { region: "Latin America", users: 681, growth: 28.9, color: "bg-orange-500" },
];

const mockAlerts = [
  {
    id: 1,
    type: "security",
    title: "Multiple failed login attempts detected",
    description: "User account: sarah.johnson@email.com",
    time: "5 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment processor issue reported",
    description: "Some users experiencing checkout failures",
    time: "12 minutes ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "system",
    title: "Server response time increased",
    description: "API response time averaging 2.3s (normal: 0.8s)",
    time: "25 minutes ago",
    severity: "low",
  },
  {
    id: 4,
    type: "user",
    title: "Spike in user registrations",
    description: "247 new signups in the last hour (+300% from average)",
    time: "1 hour ago",
    severity: "info",
  },
];

const mockRecentUsers = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma@email.com",
    role: "member",
    joinDate: "2024-12-14",
    status: "active",
    verified: true,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 2,
    name: "Coach Mike",
    email: "mike@email.com",
    role: "coach",
    joinDate: "2024-12-14",
    status: "pending",
    verified: false,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: 3,
    name: "Elite Fitness",
    email: "contact@elitefitness.com",
    role: "studio",
    joinDate: "2024-12-13",
    status: "active",
    verified: true,
    avatar: "/api/placeholder/40/40",
  },
];

const mockRevenue = {
  totalThisMonth: 245680,
  lastMonth: 218943,
  growth: 12.3,
  byRole: {
    coaches: 147408, // 60%
    studios: 73704, // 30%
    brandSellers: 24576, // 10%
    eventCurators: 0, // New feature
  },
  weeklyTrend: [
    { week: "Week 1", amount: 52340 },
    { week: "Week 2", amount: 58120 },
    { week: "Week 3", amount: 61890 },
    { week: "Week 4", amount: 73330 },
  ],
};

const mockMessages = [
  {
    id: 1,
    from: "Support Team",
    subject: "User complaint: Payment not processed",
    preview: "User reports payment deducted but session not booked...",
    time: "10 min ago",
    priority: "high",
    unread: true,
  },
  {
    id: 2,
    from: "Coach Sarah J.",
    subject: "Request: Account verification delay",
    preview: "My documents were submitted 5 days ago but still pending...",
    time: "2 hours ago",
    priority: "medium",
    unread: true,
  },
  {
    id: 3,
    from: "Elite Fitness",
    subject: "Feature request: Bulk booking management",
    preview: "We need to manage 50+ trainers and would like bulk tools...",
    time: "1 day ago",
    priority: "low",
    unread: false,
  },
];

export default function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "info":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (activeTab === "overview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Platform overview and key metrics</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockOverviewStats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +{mockOverviewStats.monthlyGrowth}% this month
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
                    ${mockOverviewStats.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +{mockOverviewStats.revenueGrowth}% vs last month
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
                  <p className="text-sm font-medium text-gray-600">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {mockOverviewStats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(
                      (mockOverviewStats.activeUsers /
                        mockOverviewStats.totalUsers) *
                      100
                    ).toFixed(1)}
                    % of total
                  </p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Rating
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {mockOverviewStats.avgRating}
                  </p>
                  <p className="text-sm text-gray-600">
                    {mockOverviewStats.totalSessions} sessions
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users by Role */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Users by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockUsersByRole).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-vibecore-red rounded-full"></div>
                      <span className="capitalize font-medium">
                        {role.replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        {count.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-500">
                        {((count / mockOverviewStats.totalUsers) * 100).toFixed(
                          1,
                        )}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRegionalData.map((region) => (
                  <div key={region.region}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{region.region}</span>
                      <span className="text-sm text-gray-600">
                        {region.users.toLocaleString()} users
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={
                          (region.users / mockOverviewStats.totalUsers) * 100
                        }
                        className="flex-1"
                      />
                      <span className="text-sm text-green-600">
                        +{region.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="capitalize text-xs">
                          {user.role}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {user.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                    {user.verified ? (
                      <UserCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <UserX className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeTab === "alerts") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Alerts</h1>
            <p className="text-gray-600">Monitor platform health and issues</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">7</div>
                <p className="text-sm text-gray-600">Medium Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <p className="text-sm text-gray-600">Low Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <p className="text-sm text-gray-600">Resolved Today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${getSeverityColor(alert.severity)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <h3 className="font-semibold">{alert.title}</h3>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(alert.severity)}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Resolve
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

  if (activeTab === "inbox") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Inbox</h1>
            <p className="text-gray-600">Messages and support requests</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Badge variant="secondary">
              {mockMessages.filter((m) => m.unread).length} unread
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${
                        message.unread
                          ? "bg-blue-50 border-blue-200"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">{message.from}</p>
                        <div className="flex items-center space-x-1">
                          <div
                            className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}
                          ></div>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {message.preview}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Support Team</h3>
                    <p className="text-sm text-gray-600">
                      User complaint: Payment not processed
                    </p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    High Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-64 p-4 overflow-y-auto bg-gray-50">
                  <div className="text-center text-gray-500 text-sm">
                    Select a message to view details
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your response..."
                      className="flex-1"
                    />
                    <Button size="sm">Reply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "revenue") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Revenue Analytics
            </h1>
            <p className="text-gray-600">Platform financial performance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ${mockRevenue.totalThisMonth.toLocaleString()}
                </div>
                <p className="text-gray-600">This Month</p>
                <p className="text-sm text-green-600 mt-1">
                  +{mockRevenue.growth}% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  ${mockRevenue.lastMonth.toLocaleString()}
                </div>
                <p className="text-gray-600">Last Month</p>
                <p className="text-sm text-gray-500 mt-1">Previous period</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  ${(mockRevenue.totalThisMonth * 12).toLocaleString()}
                </div>
                <p className="text-gray-600">Projected Annual</p>
                <p className="text-sm text-gray-500 mt-1">
                  Based on current rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockRevenue.byRole).map(([role, amount]) => (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="capitalize font-medium">
                        {role.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-semibold">
                        ${amount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(amount / mockRevenue.totalThisMonth) * 100}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRevenue.weeklyTrend.map((week, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{week.week}</span>
                    <span className="font-semibold">
                      ${week.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
