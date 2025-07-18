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
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Star,
  Clock,
  Filter,
  Search as SearchIcon,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { FacilityCard } from "@/components/ui/FacilityCard";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function Facilities() {
  const grounds = [
    {
      id: 1,
      name: "Elite Wellness Grounds",
      type: "Premium Grounds",
      location: "123 Main St, Downtown",
      status: "Popular",
      rating: 4.6,
      reviews: 248,
      openTime: "5:00 AM - 11:00 PM",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      tags: ["24/7", "Pool", "Sauna", "Personal Training"],
      amenities: ["WiFi", "Parking", "Showers", "Lockers"],
      price: "$49/month",
      capacity: 100,
      spotsLeft: 15,
    },
    {
      id: 2,
      name: "Zen Wellness Spa",
      type: "Spa",
      location: "456 Oak Ave, Midtown",
      status: "Open",
      rating: 4.8,
      reviews: 156,
      openTime: "8:00 AM - 8:00 PM",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      tags: ["Massage", "Yoga", "Meditation", "Wellness"],
      amenities: ["WiFi", "Parking", "Relaxation Area", "Steam Room"],
      price: "$79/session",
      capacity: 30,
      spotsLeft: 8,
    },
    {
      id: 3,
      name: "AquaFit Pool Center",
      type: "Pool",
      location: "789 Water St, Eastside",
      status: "Open",
      rating: 4.4,
      reviews: 89,
      openTime: "6:00 AM - 10:00 PM",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
      tags: ["Swimming", "Water Aerobics", "Lessons", "Lap Pool"],
      amenities: ["Parking", "Showers", "Changing Rooms", "Equipment"],
      price: "$35/day",
      capacity: 50,
      spotsLeft: 20,
    },
    {
      id: 4,
      name: "Powerhouse Gym",
      type: "Gym",
      location: "321 Strength Blvd, Westside",
      status: "Popular",
      rating: 4.7,
      reviews: 302,
      openTime: "5:00 AM - 11:00 PM",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
      tags: ["Weights", "Cardio", "Classes", "Nutrition"],
      amenities: ["WiFi", "Parking", "Café", "Pro Shop"],
      price: "$59/month",
      capacity: 150,
      spotsLeft: 25,
    },
    {
      id: 5,
      name: "Harmony Yoga Studio",
      type: "Studio",
      location: "555 Peace Rd, Northside",
      status: "Open",
      rating: 4.9,
      reviews: 127,
      openTime: "6:00 AM - 9:00 PM",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      tags: ["Yoga", "Pilates", "Meditation", "Workshops"],
      amenities: ["WiFi", "Props Included", "Tea Bar", "Retail"],
      price: "$25/class",
      capacity: 20,
      spotsLeft: 5,
    },
    {
      id: 6,
      name: "CrossFit Iron Box",
      type: "Gym",
      location: "777 Forge Ave, Industrial",
      status: "Open",
      rating: 4.5,
      reviews: 178,
      openTime: "5:00 AM - 10:00 PM",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      tags: ["CrossFit", "HIIT", "Olympic Lifting", "Competitions"],
      amenities: ["Parking", "Showers", "Equipment", "Coaching"],
      price: "$120/month",
      capacity: 40,
      spotsLeft: 12,
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Page Header */}
      <section className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Wellness Grounds</h1>
            <p className="text-gray-600">
              Discover gyms, grounds, spas, stadiums, pools, golf clubs, and
              wellness grounds near you
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search grounds..."
                  className="pl-10 rounded-full border-gray-200"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[150px] rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="gym">Gym</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="pool">Pool</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* Mobile Filters Button */}
          <div className="flex lg:hidden mb-4">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button
                  className="w-full bg-vibecore-red text-white rounded-full"
                  onClick={() => setDrawerOpen(true)}
                >
                  <Filter className="w-5 h-5 mr-2" /> Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                {/* Filter controls (same as sidebar) */}
                <div className="space-y-6 px-4 pb-4">
                  {/* Facility Type */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Facility Type
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Gym",
                          "Spa",
                          "Pool",
                          "Studio",
                          "Wellness Center",
                        ].map((type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={type + "-mobile"} />
                            <label
                              htmlFor={type + "-mobile"}
                              className="text-sm text-gray-700"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Price Range */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Price Range
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Under $30",
                          "$30 - $60",
                          "$60 - $100",
                          "Over $100",
                        ].map((price) => (
                          <div
                            key={price}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={price + "-mobile"} />
                            <label
                              htmlFor={price + "-mobile"}
                              className="text-sm text-gray-700"
                            >
                              {price}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Amenities */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Amenities
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["WiFi", "Parking", "Showers", "Lockers", "Café"].map(
                          (amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={amenity + "-mobile"} />
                              <label
                                htmlFor={amenity + "-mobile"}
                                className="text-sm text-gray-700"
                              >
                                {amenity}
                              </label>
                            </div>
                          ),
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Rating */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Rating
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          { rating: "4.5+", stars: 5 },
                          { rating: "4.0+", stars: 4 },
                          { rating: "3.5+", stars: 4 },
                          { rating: "3.0+", stars: 3 },
                        ].map(({ rating, stars }) => (
                          <div
                            key={rating}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={rating + "-mobile"} />
                            <label className="text-sm text-gray-700 flex items-center">
                              {Array.from({ length: stars }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 text-yellow-400 fill-current mr-1"
                                />
                              ))}
                              {rating}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <div className="sticky bottom-0 bg-white p-4">
                    <Button className="w-full mt-4 bg-vibecore-red text-white rounded-full">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (desktop only) */}
            <div className="lg:w-1/4 space-y-6 hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>

                {/* Facility Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Facility Type</h4>
                  <div className="space-y-2">
                    {["Gym", "Spa", "Pool", "Studio", "Wellness Center"].map(
                      (type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={type} />
                          <label
                            htmlFor={type}
                            className="text-sm text-gray-700"
                          >
                            {type}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {["Under $30", "$30 - $60", "$60 - $100", "Over $100"].map(
                      (price) => (
                        <div
                          key={price}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={price} />
                          <label
                            htmlFor={price}
                            className="text-sm text-gray-700"
                          >
                            {price}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {["WiFi", "Parking", "Showers", "Lockers", "Café"].map(
                      (amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={amenity} />
                          <label
                            htmlFor={amenity}
                            className="text-sm text-gray-700"
                          >
                            {amenity}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[
                      { rating: "4.5+", stars: 5 },
                      { rating: "4.0+", stars: 4 },
                      { rating: "3.5+", stars: 4 },
                      { rating: "3.0+", stars: 3 },
                    ].map(({ rating, stars }) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={rating} />
                        <label className="text-sm text-gray-700 flex items-center">
                          {Array.from({ length: stars }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-400 fill-current mr-1"
                            />
                          ))}
                          {rating}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Results Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {grounds.length} grounds found
                </h2>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[150px] rounded-full">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {grounds.map((ground) => (
                  <div key={ground.id} className="h-full">
                    <FacilityCard 
                      facility={ground} 
                      onBook={() => window.location.href = `/facilities/${ground.id}`}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Load More Grounds
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
