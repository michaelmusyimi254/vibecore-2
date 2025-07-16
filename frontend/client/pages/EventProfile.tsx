import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ChevronLeft } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import { Link } from "react-router-dom";

export default function EventProfile() {
  // Mock event data
  const event = {
    id: 1,
    title: "Morning Yoga Flow",
    date: "Dec 15, 2024",
    time: "7:00 AM",
    location: "Central Park",
    price: "Free",
    spots: "15 spots left",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    description:
      "Start your day with a rejuvenating yoga flow in the park. All levels welcome. Bring your own mat and water bottle. Enjoy the fresh air and connect with the community!",
    tags: ["Beginner Friendly", "Outdoor", "Free", "Yoga"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
        <Link to="/events" className="flex items-center text-vibecore-red font-medium mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
        </Link>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mb-4 text-gray-600 text-sm">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {event.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {event.time}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {event.location}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-vibecore-red text-lg">
                {event.price}
              </span>
              <span className="text-sm text-gray-500">{event.spots}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-gray-700 text-base mb-8">
              {event.description}
            </p>
            <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full text-lg py-3">
              Join Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 