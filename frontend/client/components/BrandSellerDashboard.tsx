import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Star,
  Eye,
  Edit,
  Plus,
  Truck,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";

interface BrandSellerDashboardProps {
  activeTab: string;
}

const mockProducts = [
  {
    id: 1,
    name: "Premium Yoga Mat",
    category: "Equipment",
    price: 79.99,
    stock: 150,
    lowStockThreshold: 20,
    sold: 89,
    rating: 4.8,
    reviews: 127,
    status: "active",
    image: "/api/placeholder/80/80",
  },
  {
    id: 2,
    name: "Resistance Band Set",
    category: "Equipment",
    price: 29.99,
    stock: 8,
    lowStockThreshold: 15,
    sold: 234,
    rating: 4.6,
    reviews: 189,
    status: "active",
    image: "/api/placeholder/80/80",
  },
  {
    id: 3,
    name: "Protein Powder - Vanilla",
    category: "Supplements",
    price: 49.99,
    stock: 45,
    lowStockThreshold: 25,
    sold: 156,
    rating: 4.7,
    reviews: 98,
    status: "active",
    image: "/api/placeholder/80/80",
  },
  {
    id: 4,
    name: "Workout Leggings",
    category: "Apparel",
    price: 69.99,
    stock: 2,
    lowStockThreshold: 10,
    sold: 67,
    rating: 4.9,
    reviews: 43,
    status: "low_stock",
    image: "/api/placeholder/80/80",
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    products: ["Premium Yoga Mat", "Resistance Band Set"],
    total: 109.98,
    date: "2024-12-15",
    status: "shipped",
    tracking: "TRK123456789",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "ORD-002",
    customer: "Mike Chen",
    products: ["Protein Powder - Vanilla"],
    total: 49.99,
    date: "2024-12-15",
    status: "processing",
    tracking: null,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    products: ["Workout Leggings", "Premium Yoga Mat"],
    total: 149.98,
    date: "2024-12-14",
    status: "delivered",
    tracking: "TRK987654321",
    avatar: "/api/placeholder/40/40",
  },
];

const mockInventoryAlerts = [
  {
    id: 1,
    product: "Workout Leggings",
    currentStock: 2,
    threshold: 10,
    severity: "critical",
  },
  {
    id: 2,
    product: "Resistance Band Set",
    currentStock: 8,
    threshold: 15,
    severity: "warning",
  },
  {
    id: 3,
    product: "Protein Powder - Vanilla",
    currentStock: 45,
    threshold: 25,
    severity: "info",
  },
];

const mockRevenue = {
  thisMonth: 8900,
  lastMonth: 7654,
  growth: 16.3,
  totalOrders: 156,
  avgOrderValue: 57.05,
  topSellingProduct: "Premium Yoga Mat",
  weeklyTrend: [
    { week: "Week 1", revenue: 2100 },
    { week: "Week 2", revenue: 2450 },
    { week: "Week 3", revenue: 2190 },
    { week: "Week 4", revenue: 2160 },
  ],
};

const mockAnalytics = {
  productViews: 12450,
  conversionRate: 3.2,
  cartAbandonmentRate: 67.8,
  returnCustomers: 34,
  newCustomers: 89,
  avgRating: 4.7,
};

export default function BrandSellerDashboard({
  activeTab,
}: BrandSellerDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "low_stock":
        return "destructive";
      case "out_of_stock":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "default";
      case "processing":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (activeTab === "products") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Product Listings
            </h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid gap-6">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <Badge variant={getStatusColor(product.status)}>
                        {product.status.replace("_", " ")}
                      </Badge>
                      {product.stock <= product.lowStockThreshold && (
                        <Badge variant="destructive">Low Stock</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>Stock: {product.stock}</span>
                      <span>Sold: {product.sold}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {product.rating} ({product.reviews})
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </div>
                    <p className="text-sm text-gray-500">Price</p>
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

  if (activeTab === "orders") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">{mockOrders.length} today</Badge>
          </div>
        </div>

        <div className="grid gap-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={order.avatar} />
                      <AvatarFallback>
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Order {order.id}</h4>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">
                        {order.products.join(", ")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.date}
                        {order.tracking && <> • Tracking: {order.tracking}</>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        ${order.total}
                      </div>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                    <Badge variant={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {order.status === "processing" && (
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4" />
                        </Button>
                      )}
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

  if (activeTab === "inventory") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Stock Alerts</h1>
            <p className="text-gray-600">Monitor inventory levels</p>
          </div>
          <Badge variant="destructive">
            {
              mockInventoryAlerts.filter((a) => a.severity === "critical")
                .length
            }{" "}
            critical
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {
                    mockInventoryAlerts.filter((a) => a.severity === "critical")
                      .length
                  }
                </div>
                <p className="text-gray-600">Critical</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    mockInventoryAlerts.filter((a) => a.severity === "warning")
                      .length
                  }
                </div>
                <p className="text-gray-600">Warning</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockProducts.reduce((sum, p) => sum + p.stock, 0)}
                </div>
                <p className="text-gray-600">Total Items</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {mockInventoryAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.severity === "critical"
                  ? "border-red-500 bg-red-50"
                  : alert.severity === "warning"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-blue-500 bg-blue-50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle
                      className={`w-5 h-5 ${
                        alert.severity === "critical"
                          ? "text-red-600"
                          : alert.severity === "warning"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    />
                    <div>
                      <h4 className="font-semibold">{alert.product}</h4>
                      <p className="text-sm text-gray-600">
                        Stock: {alert.currentStock} (Threshold:{" "}
                        {alert.threshold})
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Restock
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={(alert.currentStock / alert.threshold) * 100}
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

  if (activeTab === "revenue") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Tracker</h1>
          <p className="text-gray-600">Monitor your sales performance</p>
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
                    ${mockRevenue.thisMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +{mockRevenue.growth}% growth
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
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockRevenue.totalOrders}
                  </p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${mockRevenue.avgOrderValue}
                  </p>
                  <p className="text-sm text-gray-600">Per order</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Top Product
                  </p>
                  <p className="text-lg font-bold text-orange-600">
                    {mockRevenue.topSellingProduct}
                  </p>
                  <p className="text-sm text-gray-600">Best seller</p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Revenue</CardTitle>
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
                      ${week.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Customers</span>
                  <span className="font-semibold">
                    {mockAnalytics.newCustomers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Customers</span>
                  <span className="font-semibold">
                    {mockAnalytics.returnCustomers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold">
                    {mockAnalytics.conversionRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-semibold">
                    {mockAnalytics.avgRating} ⭐
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
            Detailed insights into your business performance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mockAnalytics.productViews.toLocaleString()}
                </div>
                <p className="text-gray-600">Product Views</p>
                <p className="text-sm text-green-600 mt-1">+12% this week</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockAnalytics.conversionRate}%
                </div>
                <p className="text-gray-600">Conversion Rate</p>
                <p className="text-sm text-green-600 mt-1">
                  +0.3% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {mockAnalytics.cartAbandonmentRate}%
                </div>
                <p className="text-gray-600">Cart Abandonment</p>
                <p className="text-sm text-red-600 mt-1">-2.1% improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProducts.map((product) => (
                  <div key={product.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-gray-600">
                        {product.sold} sold
                      </span>
                    </div>
                    <Progress value={(product.sold / 300) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Product Views</span>
                  <span className="font-semibold">
                    {mockAnalytics.productViews.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Add to Cart</span>
                  <span className="font-semibold">
                    {Math.round(
                      mockAnalytics.productViews * 0.15,
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Checkout Started</span>
                  <span className="font-semibold">
                    {Math.round(
                      mockAnalytics.productViews * 0.08,
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Orders Completed</span>
                  <span className="font-semibold text-green-600">
                    {Math.round(
                      mockAnalytics.productViews * 0.032,
                    ).toLocaleString()}
                  </span>
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
