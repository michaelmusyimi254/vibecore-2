import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Wifi, Car, Building2, Users, ChevronLeft } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import { Link } from "react-router-dom";

export default function FacilityProfile() {
  // Mock facility data
  const facility = {
    id: 1,
    name: "Elite Fitness Center",
    type: "Gym",
    location: "123 Main St, Downtown",
    status: "Open",
    rating: 4.6,
    reviews: 248,
    openTime: "5:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    tags: ["24/7", "Pool", "Sauna", "Personal Training"],
    amenities: ["WiFi", "Parking", "Showers", "Lockers"],
    price: "$49/month",
    description:
      "Elite Fitness Center offers state-of-the-art equipment, group classes, personal training, and wellness amenities. Join our community and achieve your fitness goals!",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 pt-32 pb-16 max-w-5xl">
        <Link to="/facilities" className="flex items-center text-vibecore-red font-medium mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Facilities
        </Link>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column: image, status, quick stats */}
            <div className="md:w-1/3 flex flex-col items-center gap-6">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-56 object-cover rounded-xl shadow"
              />
              <Badge
                variant={facility.status === "Open" ? "default" : "secondary"}
                className="rounded-full px-4 py-1 text-base"
              >
                {facility.status}
              </Badge>
              <div className="w-full grid grid-cols-2 gap-4 mt-2">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-xl ml-1">{facility.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{facility.reviews} reviews</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-5 h-5 text-vibecore-red mr-1" />
                    <span className="font-bold text-xl">{facility.openTime}</span>
                  </div>
                  <p className="text-gray-600 text-sm">Hours</p>
                </div>
                <div className="text-center col-span-2">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-5 h-5 text-vibecore-red mr-1" />
                    <span className="font-bold text-xl">{facility.type}</span>
                  </div>
                  <p className="text-gray-600 text-sm">Type</p>
                </div>
              </div>
              <span className="font-semibold text-vibecore-red text-lg mt-2">{facility.price}</span>
            </div>
            {/* Right column: details and actions */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{facility.name}</h1>
              <p className="text-gray-600 text-base mb-2">{facility.type}</p>
              <p className="text-gray-500 text-sm mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {facility.location}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {facility.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
                {facility.amenities.map((amenity, index) => (
                  <span key={amenity} className="flex items-center">
                    {amenity === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                    {amenity === "Parking" && <Car className="w-3 h-3 mr-1" />}
                    {amenity.includes("Room") || amenity.includes("Area") || (amenity === "Showers" && <Building2 className="w-3 h-3 mr-1" />)}
                    {!["WiFi", "Parking"].includes(amenity) && !amenity.includes("Room") && !amenity.includes("Area") && amenity !== "Showers" && <Users className="w-3 h-3 mr-1" />}
                    {amenity}
                    {index < facility.amenities.length - 1 && " • "}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-base mb-8">{facility.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
                  Book Facility
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Message
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 