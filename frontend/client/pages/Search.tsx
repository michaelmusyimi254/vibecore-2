import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Star,
  Clock,
  Filter,
  Search as SearchIcon,
  Calendar,
  Dumbbell,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { AIChatInput } from "@/components/ui/ai-chat-input";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function Search() {
  // --- NEW: Read query params ---
  const location = useLocation();
  function getQueryParams() {
    const params = new URLSearchParams(location.search);
    return {
      type: params.get("type") || "trainers",
      region: params.get("region") || "",
    };
  }
  const [{ type, region }, setQuery] = useState(getQueryParams());

  // --- NEW: State for results, loading, error ---
  const [results, setResults] = useState({
    trainers: [],
    facilities: [],
    shops: [],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- NEW: Fetch results from backend on mount or query change ---
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:8000/api/search?type=${type}&region=${region}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch results");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load results. Please try again.");
        setLoading(false);
      });
  }, [type, region, location.search]);

  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Personal Training",
      location: "Downtown Fitness Center",
      rating: 4.9,
      reviews: 127,
      price: "$45/session",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
      tags: ["Weight Loss", "Strength Training", "Nutrition"],
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Yoga Instructor",
      location: "Zen Wellness Studio",
      rating: 4.8,
      reviews: 89,
      price: "$35/session",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      tags: ["Hatha Yoga", "Meditation", "Flexibility"],
    },
    {
      id: 3,
      name: "Emma Davis",
      specialty: "Pilates Instructor",
      location: "Core Fitness Studio",
      rating: 4.7,
      reviews: 156,
      price: "$40/session",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&h=300&fit=crop&crop=face",
      tags: ["Core Strength", "Posture", "Rehabilitation"],
    },
  ];

  const facilities = [
    {
      id: 1,
      name: "Elite Fitness Center",
      type: "Premium Gym",
      location: "Downtown District",
      rating: 4.6,
      reviews: 234,
      membership: "$89/month",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=300&fit=crop",
      amenities: ["Pool", "Sauna", "Personal Training", "Group Classes"],
    },
    {
      id: 2,
      name: "Zen Wellness Studio",
      type: "Yoga & Meditation",
      location: "Midtown",
      rating: 4.8,
      reviews: 189,
      membership: "$65/month",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      amenities: ["Yoga Classes", "Meditation", "Workshops", "Retreat"],
    },
    {
      id: 3,
      name: "PowerHouse Gym",
      type: "Strength Training",
      location: "Eastside",
      rating: 4.5,
      reviews: 298,
      membership: "$75/month",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
      amenities: ["Free Weights", "Machines", "Personal Training", "Nutrition"],
    },
  ];

  const shops = [
    {
      id: 1,
      name: "FitGear Pro",
      category: "Equipment & Apparel",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      products: ["Dumbbells", "Resistance Bands", "Yoga Mats", "Apparel"],
    },
    {
      id: 2,
      name: "Wellness Supplements",
      category: "Nutrition & Supplements",
      rating: 4.8,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      products: ["Protein Powder", "Vitamins", "Pre-workout", "Recovery"],
    },
  ];

  const events = [
    {
      id: 1,
      name: "Summer Fitness Bootcamp",
      date: "June 15, 2024",
      time: "9:00 AM",
      location: "Central Park",
      price: "Free",
      attendees: 24,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      tags: ["Outdoor", "Bootcamp", "All Levels"],
    },
    {
      id: 2,
      name: "Yoga & Meditation Workshop",
      date: "June 20, 2024",
      time: "6:00 PM",
      location: "Zen Wellness Studio",
      price: "$25",
      attendees: 15,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      tags: ["Indoor", "Yoga", "Beginner Friendly"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* AI Chat Input */}
      <AIChatInput />

      {/* Search Header */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-6" />
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for coaches, studios, or events..."
                  className="pl-10 rounded-full border-gray-200"
                  defaultValue="fitness coaches"
                />
              </div>
              <Select defaultValue="current">
                <SelectTrigger className="w-full md:w-[200px] rounded-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Location</SelectItem>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="midtown">Midtown</SelectItem>
                  <SelectItem value="eastside">Eastside</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-8 rounded-full">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="trainers" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="trainers" className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Coaches
              </TabsTrigger>
              <TabsTrigger
                value="facilities"
                className="flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Studios
              </TabsTrigger>
              <TabsTrigger value="shops" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Shop
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
            </TabsList>

            {/* Coaches Tab */}
            <TabsContent value="trainers">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                  <Link key={trainer.id} to={`/trainers/${trainer.id}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {trainer.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {trainer.specialty}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {trainer.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({trainer.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          {trainer.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-vibecore-red">
                            {trainer.price}
                          </span>
                          <div className="flex gap-1">
                            {trainer.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Studios Tab */}
            <TabsContent value="facilities">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                  <Link key={facility.id} to={`/facilities/${facility.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-lg">
                          {facility.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{facility.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {facility.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({facility.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <MapPin className="w-4 h-4" />
                          {facility.location}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="font-semibold text-vibecore-red">
                            {facility.membership}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {facility.amenities.length} amenities
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Shop Tab */}
            <TabsContent value="shops">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                  <Link key={shop.id} to={`/shops/${shop.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-lg">{shop.name}</h3>
                        <p className="text-gray-600 text-sm">{shop.category}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {shop.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({shop.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex gap-1 mt-3">
                          {shop.products.slice(0, 3).map((product) => (
                            <Badge
                              key={product}
                              variant="secondary"
                              className="text-xs"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="font-semibold text-vibecore-red">
                            {event.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            {event.attendees} attending
                          </span>
                        </div>
                        <div className="flex gap-1 mt-3">
                          {event.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
