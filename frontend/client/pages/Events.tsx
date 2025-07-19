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
import { Calendar, Clock, MapPin, Filter, Search as SearchIcon } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/Footer";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { EventCard } from "@/components/ui/EventCard";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      date: "Dec 15, 2024",
      time: "7:00 AM",
      location: "Central Park",
      price: 0, // Free
      capacity: 30,
      spotsLeft: 15,
      rating: 4.8,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
      tags: ["Yoga", "Beginner Friendly", "Outdoor"],
      organizer: {
        name: "Yoga with Sarah",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      description: "Start your day with a refreshing yoga session in the park. All levels welcome!"
    },
    {
      id: 2,
      title: "CrossFit Competition",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      location: "Iron Box Gym",
      price: 25,
      capacity: 20,
      spotsLeft: 8,
      rating: 4.9,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      tags: ["CrossFit", "Competition", "Advanced"],
      organizer: {
        name: "Iron Box Athletics",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      description: "Test your limits in our quarterly CrossFit throwdown!"
    },
    {
      id: 3,
      title: "Outdoor Bootcamp",
      date: "Dec 22, 2024",
      time: "9:00 AM",
      location: "Riverside Park",
      price: 10,
      capacity: 25,
      spotsLeft: 20,
      rating: 4.5,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop",
      tags: ["HIIT", "Outdoor", "All Levels"],
      organizer: {
        name: "FitFam Trainers",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      description: "High-intensity outdoor workout to get you in shape!"
    },
    {
      id: 4,
      title: "Nutrition Workshop",
      date: "Jan 5, 2025",
      time: "2:00 PM",
      location: "Zen Wellness Studio",
      price: 0,
      capacity: 40,
      spotsLeft: 30,
      rating: 4.7,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=600&h=400&fit=crop",
      tags: ["Workshop", "Nutrition", "Wellness"],
      organizer: {
        name: "Zen Wellness",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
      },
      description: "Learn about balanced nutrition and healthy eating habits."
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
            <h1 className="text-3xl font-bold mb-2">Fitness Events</h1>
            <p className="text-gray-600">
              Discover upcoming fitness events, classes, and workshops near you
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search events, classes, or workshops..."
                  className="pl-10 rounded-full border-gray-200"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[150px] rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="upcoming">
                <SelectTrigger className="w-full md:w-[150px] rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
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
                <Button className="w-full bg-vibecore-red text-white rounded-full" onClick={() => setDrawerOpen(true)}>
                  <Filter className="w-5 h-5 mr-2" /> Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                {/* Filter controls (same as sidebar) */}
                <div className="space-y-6 px-4 pb-4">
                  {/* Event Type */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Event Type
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["Class","Workshop","Competition","Meetup","Seminar","Outdoor","Online"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={type + "-mobile"} />
                            <label htmlFor={type + "-mobile"} className="text-sm text-gray-700">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Date */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Date
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["Today","This Week","This Month"].map((date) => (
                          <div key={date} className="flex items-center space-x-2">
                            <Checkbox id={date + "-mobile"} />
                            <label htmlFor={date + "-mobile"} className="text-sm text-gray-700">
                              {date}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Price */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Price
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["Free","Paid"].map((price) => (
                          <div key={price} className="flex items-center space-x-2">
                            <Checkbox id={price + "-mobile"} />
                            <label htmlFor={price + "-mobile"} className="text-sm text-gray-700">
                              {price}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Level */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Level
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["Beginner","Intermediate","Advanced"].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox id={level + "-mobile"} />
                            <label htmlFor={level + "-mobile"} className="text-sm text-gray-700">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  {/* Location */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex justify-between items-center py-3 font-medium border-b">
                      Location
                      <span className="ml-2">▼</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-2">
                        {["Current Location","Downtown","Midtown","Eastside","Westside","Online"].map((loc) => (
                          <div key={loc} className="flex items-center space-x-2">
                            <Checkbox id={loc + "-mobile"} />
                            <label htmlFor={loc + "-mobile"} className="text-sm text-gray-700">
                              {loc}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <DrawerClose asChild>
                    <Button className="w-full mt-4 bg-vibecore-red text-white rounded-full">Apply Filters</Button>
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
                {/* Event Type */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Event Type</h4>
                  <div className="space-y-2">
                    {["Class", "Workshop", "Competition", "Meetup", "Seminar", "Outdoor", "Online"].map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm text-gray-700">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Date */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Date</h4>
                  <div className="space-y-2">
                    {["Today", "This Week", "This Month"].map(date => (
                      <div key={date} className="flex items-center space-x-2">
                        <Checkbox id={date} />
                        <label htmlFor={date} className="text-sm text-gray-700">{date}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price</h4>
                  <div className="space-y-2">
                    {["Free", "Paid"].map(price => (
                      <div key={price} className="flex items-center space-x-2">
                        <Checkbox id={price} />
                        <label htmlFor={price} className="text-sm text-gray-700">{price}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Level */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Level</h4>
                  <div className="space-y-2">
                    {["Beginner", "Intermediate", "Advanced"].map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={level} />
                        <label htmlFor={level} className="text-sm text-gray-700">{level}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Location */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Location</h4>
                  <div className="space-y-2">
                    {["Current Location", "Downtown", "Midtown", "Eastside", "Westside", "Online"].map(loc => (
                      <div key={loc} className="flex items-center space-x-2">
                        <Checkbox id={loc} />
                        <label htmlFor={loc} className="text-sm text-gray-700">{loc}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Events Grid Section */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {events.length} events found
                </h2>
                <Select defaultValue="upcoming">
                  <SelectTrigger className="w-[150px] rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="soonest">Soonest</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="block">
                    <EventCard 
                      event={event} 
                      onBook={() => {
                        // Handle booking logic here
                        console.log('Booking event:', event.id);
                      }}
                    />
                  </Link>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Load More Events
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