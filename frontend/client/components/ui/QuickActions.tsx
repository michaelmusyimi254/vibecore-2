import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Calendar,
  Users,
  Building2,
  ShoppingBag,
  MessageCircle,
  Heart,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  description: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    id: "search",
    label: "Find Coaches",
    icon: Search,
    href: "/search",
    description: "Discover wellness professionals",
    color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
  },
  {
    id: "trainers",
    label: "Browse Trainers",
    icon: Users,
    href: "/trainers",
    description: "Explore our trainer network",
    color: "text-green-600 bg-green-50 hover:bg-green-100",
  },
  {
    id: "facilities",
    label: "Find Studios",
    icon: Building2,
    href: "/facilities",
    description: "Locate fitness facilities",
    color: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  },
  {
    id: "events",
    label: "Join Events",
    icon: Calendar,
    href: "/events",
    description: "Discover wellness events",
    color: "text-orange-600 bg-orange-50 hover:bg-orange-100",
  },
  {
    id: "shops",
    label: "Shop Gear",
    icon: ShoppingBag,
    href: "/shops",
    description: "Premium fitness products",
    color: "text-red-600 bg-red-50 hover:bg-red-100",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
    description: "Access your profile",
    color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
  },
];

interface QuickActionsProps {
  limit?: number;
  className?: string;
  variant?: "grid" | "horizontal";
}

export default function QuickActions({
  limit,
  className = "",
  variant = "grid",
}: QuickActionsProps) {
  const displayActions = limit ? quickActions.slice(0, limit) : quickActions;

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>

      <div
        className={
          variant === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 gap-4"
            : "flex space-x-4 overflow-x-auto pb-2"
        }
      >
        {displayActions.map((action) => (
          <Link key={action.id} to={action.href}>
            <Card className="vc-card-hover h-full min-w-[140px] group">
              <CardContent className="p-4 text-center">
                <div
                  className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">
                  {action.label}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Helper component for floating quick actions
export function FloatingQuickActions() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 space-y-3">
      <Link to="/search">
        <Button
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Search className="w-5 h-5 mr-2" />
          Quick Search
        </Button>
      </Link>
    </div>
  );
}
