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
  Filter,
  Search as SearchIcon,
  User,
  Award,
  Clock,
  DollarSign,
  CheckCircle,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
// Remove TrainerCard import

export default function Trainers() {
  const coaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Personal Coaching & Nutrition",
      location: "Downtown Fitness Center",
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      sessions: 500,
      priceRange: "$45-75",
      hourlyRate: 60,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
      specialties: ["Weight Loss", "Strength Training", "Nutrition"],
      certifications: ["NASM-CPT", "Precision Nutrition"],
      available: "Today",
      responseTime: "Usually responds in 2 hours",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Yoga & Mindfulness",
      location: "Zen Wellness Studio",
      rating: 4.8,
      reviews: 89,
      experience: "6 years",
      sessions: 350,
      priceRange: "$35-55",
      hourlyRate: 45,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      specialties: ["Hatha Yoga", "Meditation", "Flexibility"],
      certifications: ["RYT-500", "Mindfulness"],
      available: "Tomorrow",
      responseTime: "Usually responds in 1 hour",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      specialty: "Pilates & Rehabilitation",
      location: "Core Fitness Studio",
      rating: 4.7,
      reviews: 156,
      experience: "5 years",
      sessions: 420,
      priceRange: "$40-65",
      hourlyRate: 50,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      specialties: ["Core Strength", "Rehabilitation", "Posture"],
      certifications: ["PMA-CPT", "Physical Therapy"],
      available: "Today",
      responseTime: "Usually responds in 3 hours",
      verified: true,
    },
    {
      id: 4,
      name: "David Wilson",
      specialty: "CrossFit & HIIT",
      location: "Iron Box Gym",
      rating: 4.9,
      reviews: 203,
      experience: "10 years",
      sessions: 800,
      priceRange: "$50-80",
      hourlyRate: 65,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      specialties: ["HIIT", "Olympic Lifting", "Endurance"],
      certifications: ["CrossFit L2", "NSCA-CSCS"],
      available: "This week",
      responseTime: "Usually responds in 4 hours",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      specialty: "Dance Fitness",
      location: "Rhythm Studio",
      rating: 4.6,
      reviews: 98,
      experience: "4 years",
      sessions: 280,
      priceRange: "$30-50",
      hourlyRate: 40,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      specialties: ["Zumba", "Latin Dance", "Cardio"],
      certifications: ["Zumba Instructor", "Dance Fitness"],
      available: "Today",
      responseTime: "Usually responds in 1 hour",
      verified: false,
    },
    {
      id: 6,
      name: "James Park",
      specialty: "Martial Arts & Self Defense",
      location: "Elite Combat Academy",
      rating: 4.8,
      reviews: 134,
      experience: "12 years",
      sessions: 600,
      priceRange: "$55-85",
      hourlyRate: 70,
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face",
      specialties: ["Karate", "Self Defense", "Conditioning"],
      certifications: ["Black Belt 3rd Dan", "Self Defense"],
      available: "Tomorrow",
      responseTime: "Usually responds in 2 hours",
      verified: true,
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Find Your Perfect Trainer
            </h1>
            <p className="text-gray-600">
              Connect with certified fitness professionals who will help you
              achieve your goals
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search trainers by name, specialty, or location..."
                  className="pl-10 rounded-full border-gray-200"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="personal">Personal Training</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                  <SelectItem value="crossfit">CrossFit</SelectItem>
                  <SelectItem value="martial-arts">Martial Arts</SelectItem>
                  <SelectItem value="dance">Dance Fitness</SelectItem>
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
                  <SelectItem value="westside">Westside</SelectItem>
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
                  {/* Specialties */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Specialties
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Personal Training",
                          "Weight Loss",
                          "Strength Training",
                          "Yoga",
                          "Pilates",
                          "CrossFit",
                          "HIIT",
                          "Martial Arts",
                          "Dance Fitness",
                          "Rehabilitation",
                        ].map((specialty) => (
                          <div
                            key={specialty}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={specialty + "-mobile"} />
                            <label
                              htmlFor={specialty + "-mobile"}
                              className="text-sm text-gray-700"
                            >
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Price Range */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Hourly Rate
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Under $40",
                          "$40 - $60",
                          "$60 - $80",
                          "Over $80",
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
                  {/* Experience */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Experience
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Less than 2 years",
                          "2-5 years",
                          "5-10 years",
                          "10+ years",
                        ].map((experience) => (
                          <div
                            key={experience}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={experience + "-mobile"} />
                            <label
                              htmlFor={experience + "-mobile"}
                              className="text-sm text-gray-700"
                            >
                              {experience}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Availability */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Availability
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {[
                          "Available Today",
                          "Available This Week",
                          "Online Training",
                          "In-Person Only",
                        ].map((availability) => (
                          <div
                            key={availability}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={availability + "-mobile"} />
                            <label
                              htmlFor={availability + "-mobile"}
                              className="text-sm text-gray-700"
                            >
                              {availability}
                            </label>
                          </div>
                        ))}
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
                  <DrawerClose asChild>
                    <Button className="w-full mt-4 bg-vibecore-red text-white rounded-full">
                      Apply Filters
                    </Button>
                  </DrawerClose>
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

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Specialties</h4>
                  <div className="space-y-2">
                    {[
                      "Personal Training",
                      "Weight Loss",
                      "Strength Training",
                      "Yoga",
                      "Pilates",
                      "CrossFit",
                      "HIIT",
                      "Martial Arts",
                      "Dance Fitness",
                      "Rehabilitation",
                    ].map((specialty) => (
                      <div
                        key={specialty}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={specialty} />
                        <label
                          htmlFor={specialty}
                          className="text-sm text-gray-700"
                        >
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Hourly Rate</h4>
                  <div className="space-y-2">
                    {["Under $40", "$40 - $60", "$60 - $80", "Over $80"].map(
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

                {/* Experience */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Experience</h4>
                  <div className="space-y-2">
                    {[
                      "Less than 2 years",
                      "2-5 years",
                      "5-10 years",
                      "10+ years",
                    ].map((experience) => (
                      <div
                        key={experience}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={experience} />
                        <label
                          htmlFor={experience}
                          className="text-sm text-gray-700"
                        >
                          {experience}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Availability</h4>
                  <div className="space-y-2">
                    {[
                      "Available Today",
                      "Available This Week",
                      "Online Training",
                      "In-Person Only",
                    ].map((availability) => (
                      <div
                        key={availability}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={availability} />
                        <label
                          htmlFor={availability}
                          className="text-sm text-gray-700"
                        >
                          {availability}
                        </label>
                      </div>
                    ))}
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
                  {coaches.length} coaches found
                </h2>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[150px] rounded-full">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="response">Fastest Response</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {coaches.map((coach) => (
                  <Link key={coach.id} to={`/trainers/${coach.id}`}>
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <img
                            src={coach.image}
                            alt={coach.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-semibold text-lg">
                                {coach.name}
                              </h3>
                              {coach.verified && (
                                <Badge className="bg-green-100 text-green-800 rounded-full text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-1">
                              {coach.specialty}
                            </p>
                            <p className="text-gray-500 text-sm flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {coach.location}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                          <div>
                            <div className="flex items-center justify-center mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold ml-1">
                                {coach.rating}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {coach.reviews} reviews
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center mb-1">
                              <Award className="w-4 h-4 text-vibecore-red" />
                              <span className="font-semibold ml-1">
                                {coach.experience}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">experience</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center mb-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-semibold ml-1">
                                ${coach.hourlyRate}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">per session</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {coach.specialties.slice(0, 3).map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs rounded-full"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{coach.available}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {coach.responseTime}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                            Book Session
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full px-4"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Load More Trainers
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
