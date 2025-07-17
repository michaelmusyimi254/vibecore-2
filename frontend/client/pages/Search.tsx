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
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { AIChatInput } from "@/components/ui/ai-chat-input";

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
  const [results, setResults] = useState({ trainers: [], facilities: [], shops: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- NEW: Fetch results from backend on mount or query change ---
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:8000/api/search?type=${type}&region=${region}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch results");
        return res.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
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
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      tags: ["Core Strength", "Rehabilitation", "Posture"],
    },
    {
      id: 4,
      name: "David Wilson",
      specialty: "CrossFit Coach",
      location: "Iron Box Gym",
      rating: 4.9,
      reviews: 203,
      price: "$50/session",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      tags: ["HIIT", "Olympic Lifting", "Endurance"],
    },
  ];

  const facilities = [
    {
      id: 1,
      name: "Elite Fitness Center",
      type: "Gym",
      location: "123 Main St, Downtown",
      status: "Open",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
      tags: ["24/7", "Pool", "Sauna", "Personal Training"],
    },
    {
      id: 2,
      name: "Zen Wellness Spa",
      type: "Spa",
      location: "456 Oak Ave, Midtown",
      status: "Open",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
      tags: ["Massage", "Yoga", "Meditation", "Wellness"],
    },
    {
      id: 3,
      name: "AquaFit Pool Center",
      type: "Pool",
      location: "789 Water St, Eastside",
      status: "Closed",
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&h=200&fit=crop",
      tags: ["Swimming", "Water Aerobics", "Lessons", "Lap Pool"],
    },
    {
      id: 4,
      name: "Powerhouse Gym",
      type: "Gym",
      location: "321 Strength Blvd, Westside",
      status: "Open",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop",
      tags: ["Weights", "Cardio", "Classes", "Nutrition"],
    },
  ];

  const events = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      date: "Dec 15, 2024",
      time: "7:00 AM",
      location: "Central Park",
      price: "Free",
      spots: "15 spots left",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "CrossFit Competition",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      location: "Iron Box Gym",
      price: "$25",
      spots: "8 spots left",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    },
  ];

  const shops = [
    {
      id: 1,
      name: "FitGear Pro",
      category: "Equipment",
      location: "Online & 2 stores",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      featured: "Premium Dumbbells - 20% Off",
    },
    {
      id: 2,
      name: "NutriMax Supplements",
      category: "Supplements",
      location: "456 Health St",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      featured: "Protein Powder Sale",
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <AIChatInput />

      {/* Results Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12 text-lg text-gray-500 animate-pulse">Loading results…</div>
          ) : error ? (
            <div className="text-center py-12 text-lg text-red-500">{error}</div>
          ) : (
            <Tabs defaultValue={type} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-gray-100 rounded-2xl p-1 overflow-x-auto">
              <TabsTrigger
                value="trainers"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Trainers
              </TabsTrigger>
              <TabsTrigger
                value="facilities"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Facilities
              </TabsTrigger>
              <TabsTrigger
                value="shops"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shops
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </TabsList>

            {/* Trainers Tab */}
            <TabsContent value="trainers">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.trainers.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">No trainers found.</div>
                  ) : results.trainers.map((trainer: any) => (
                  <Link key={trainer.id} to={`/trainers/${trainer.id}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-1">
                        {trainer.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {trainer.specialty}
                      </p>
                      <p className="text-gray-500 text-sm mb-3 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trainer.location}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {trainer.rating}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            ({trainer.reviews})
                          </span>
                        </div>
                        <span className="font-semibold text-vibecore-red">
                          {trainer.price}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {trainer.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs rounded-full"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                        Book Session
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Facilities Tab */}
            <TabsContent value="facilities">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.facilities.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">No facilities found.</div>
                  ) : results.facilities.map((facility: any) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <Badge
                        variant={
                          facility.status === "Open" ? "default" : "secondary"
                        }
                        className="rounded-full"
                      >
                        {facility.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {facility.type}
                    </p>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {facility.location}
                    </p>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {facility.rating}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {facility.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                      View More
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Shops Tab */}
            <TabsContent value="shops">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.shops.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">No shops found.</div>
                  ) : results.shops.map((shop: any) => (
                  <div
                    key={shop.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-1">{shop.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {shop.category}
                    </p>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {shop.location}
                    </p>
                    <div className="flex items-center mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">
                        {shop.rating}
                      </span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-4">
                      <p className="text-green-800 text-xs font-medium">
                        {shop.featured}
                      </p>
                    </div>
                    <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                      Shop Now
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.events.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">No events found.</div>
                  ) : results.events.map((event: any) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        {event.date}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-2" />
                        {event.time}
                      </p>
                      <p className="text-gray-600 text-sm flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        {event.location}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-vibecore-red">
                        {event.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {event.spots}
                      </span>
                    </div>
                    <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                      Join Event
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
