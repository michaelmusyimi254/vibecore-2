import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search as SearchIcon,
  MapPin,
  Star,
  Calendar,
  Clock,
  Dumbbell,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Breadcrumb from "@/components/ui/breadcrumb";
import AIChatInput from "@/components/ui/ai-chat-input";
import { useState, useEffect } from "react";

export default function Search() {
  const [type, setType] = useState("trainers");
  const [region, setRegion] = useState("your area");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [results, setResults] = useState({
    trainers: [
      {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Personal Training & Nutrition",
        location: "Downtown",
        rating: 4.9,
        reviews: 127,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
        experience: "8 years",
        priceRange: "$45-75",
      },
      {
        id: 2,
        name: "Mike Chen",
        specialty: "Yoga & Mindfulness",
        location: "Midtown",
        rating: 4.8,
        reviews: 89,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        experience: "6 years",
        priceRange: "$35-55",
      },
    ],
    facilities: [
      {
        id: 1,
        name: "Elite Fitness Center",
        type: "Premium Gym",
        location: "Downtown",
        rating: 4.6,
        reviews: 248,
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
        openTime: "5:00 AM - 11:00 PM",
        price: "$49/month",
      },
    ],
    shops: [
      {
        id: 1,
        name: "FitGear Pro",
        category: "Fitness Equipment",
        location: "Online & Downtown",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
        featured: "Free shipping on orders over $100",
      },
    ],
    events: [
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
    ],
  });

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
                  placeholder="Search for coaches, venues, or events..."
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
              <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Search Results for "fitness coaches"
            </h1>
            <p className="text-gray-600">
              Found{" "}
              {results.trainers.length +
                results.facilities.length +
                results.shops.length +
                results.events.length}{" "}
              results in {region}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-lg text-gray-500 animate-pulse">
              Loading results…
            </div>
          ) : error ? (
            <div className="text-center py-12 text-lg text-red-500">
              {error}
            </div>
          ) : (
            <Tabs defaultValue={type} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-gray-100 rounded-2xl p-1 overflow-x-auto">
                <TabsTrigger
                  value="trainers"
                  className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                >
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Coaches
                </TabsTrigger>
                <TabsTrigger
                  value="facilities"
                  className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Venues
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

              {/* Coaches Tab */}
              <TabsContent value="trainers">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.trainers.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">
                      No coaches found.
                    </div>
                  ) : (
                    results.trainers.map((trainer: any) => (
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
                          <div className="flex items-center mb-3">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">
                              {trainer.rating}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({trainer.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">
                              {trainer.experience} exp
                            </span>
                            <span className="font-semibold text-vibecore-red">
                              {trainer.priceRange}
                            </span>
                          </div>
                          <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                            Book Session
                          </Button>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Venues Tab */}
              <TabsContent value="facilities">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.facilities.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">
                      No venues found.
                    </div>
                  ) : (
                    results.facilities.map((facility: any) => (
                      <div
                        key={facility.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <img
                          src={facility.image}
                          alt={facility.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-1">
                            {facility.name}
                          </h3>
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
                            <span className="text-gray-500 text-sm ml-1">
                              ({facility.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">
                              {facility.openTime}
                            </span>
                            <span className="font-semibold text-vibecore-red">
                              {facility.price}
                            </span>
                          </div>
                          <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Shops Tab */}
              <TabsContent value="shops">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.shops.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">
                      No shops found.
                    </div>
                  ) : (
                    results.shops.map((shop: any) => (
                      <div
                        key={shop.id}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img
                          src={shop.image}
                          alt={shop.name}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-1">
                          {shop.name}
                        </h3>
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
                    ))
                  )}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.events.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400">
                      No events found.
                    </div>
                  ) : (
                    results.events.map((event: any) => (
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
                    ))
                  )}
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
