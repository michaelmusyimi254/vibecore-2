import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Star,
  User,
  Heart,
  ShoppingCart,
  Filter,
  Search,
  Plus,
  Minus,
  X,
  Clock,
  Users,
  Building,
  Home,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function MobileApp() {
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedTrainer, setExpandedTrainer] = useState<number | null>(null);
  const [expandedFacility, setExpandedFacility] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Mock data
  const events = [
    {
      id: 1,
      name: "Morning Yoga Flow",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
      date: "Dec 15, 2024",
      time: "7:00 AM",
      location: "Central Park",
      organizer: "Zen Studio",
      organizerLogo:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=50&h=50&fit=crop",
      category: "Yoga",
      price: "Free",
      spots: 15,
      about:
        "Start your day with a peaceful yoga session in the heart of the city.",
    },
    {
      id: 2,
      name: "HIIT Bootcamp",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      date: "Dec 16, 2024",
      time: "6:00 PM",
      location: "Fitness Park",
      organizer: "Iron Fitness",
      organizerLogo:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=50&h=50&fit=crop",
      category: "HIIT",
      price: "$25",
      spots: 8,
      about: "High-intensity interval training to boost your fitness level.",
    },
  ];

  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
      specialties: ["Weight Loss", "Strength"],
      location: "Downtown",
      avatar:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face",
      price: "$60/session",
      available: "Today",
      certifications: ["NASM-CPT", "Nutrition Coach"],
      experience: "8 years",
      bio: "Passionate trainer specializing in sustainable fitness transformations.",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4.8,
      reviews: 89,
      specialties: ["Yoga", "Flexibility"],
      location: "Midtown",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      price: "$45/session",
      available: "Tomorrow",
      certifications: ["RYT-500", "Meditation"],
      experience: "6 years",
      bio: "Bringing mindfulness and movement together for holistic wellness.",
    },
  ];

  const shops = [
    {
      id: 1,
      name: "FitGear Pro",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
      category: "Equipment",
      rating: 4.5,
    },
    {
      id: 2,
      name: "NutriMax",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop",
      category: "Supplements",
      rating: 4.7,
    },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Dumbbells",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      shop: "FitGear Pro",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Protein Powder",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
      price: 34.99,
      originalPrice: 44.99,
      discount: 22,
      shop: "NutriMax",
      rating: 4.8,
    },
  ];

  const facilities = [
    {
      id: 1,
      name: "Elite Fitness Center",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
      type: "Gym",
      location: "Downtown",
      rating: 4.6,
      price: "$49/month",
      amenities: ["Pool", "Sauna", "Classes"],
      hours: "5AM - 11PM",
      availableToday: true,
    },
    {
      id: 2,
      name: "Zen Wellness Spa",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
      type: "Spa",
      location: "Uptown",
      rating: 4.8,
      price: "$79/session",
      amenities: ["Massage", "Yoga", "Meditation"],
      hours: "8AM - 8PM",
      availableToday: false,
    },
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-[#D91E36]" />
    </div>
  );

  const EmptyState = ({ icon: Icon, title, description }: any) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Icon className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  // 1. Events Explorer Cards
  const EventsSection = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Filter className="w-4 h-4 mr-2" />
          Category
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Upcoming
        </Button>
      </div>

      {/* Event Cards */}
      <div className="space-y-4 px-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden rounded-xl border-0 shadow-sm"
            onClick={() =>
              setExpandedEvent(expandedEvent === event.id ? null : event.id)
            }
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-[#D91E36] text-white rounded-full">
                  {event.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <div className="flex items-center">
                  <img
                    src={event.organizerLogo}
                    alt={event.organizer}
                    className="w-6 h-6 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#D91E36]">
                    {event.price}
                  </span>
                  <span className="text-xs">{event.spots} spots left</span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedEvent === event.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">About</h4>
                    <p className="text-sm text-gray-600">{event.about}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Organizer</h4>
                    <div className="flex items-center">
                      <img
                        src={event.organizerLogo}
                        alt={event.organizer}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-[#D91E36] hover:bg-[#B91C32] text-white rounded-xl">
                      Book Now
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // 2. Trainer Directory
  const TrainersSection = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Clock className="w-4 h-4 mr-2" />
          Available
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Star className="w-4 h-4 mr-2" />
          Rating
        </Button>
      </div>

      {/* Trainer Cards */}
      <div className="space-y-4 px-4">
        {trainers.map((trainer) => (
          <Card
            key={trainer.id}
            className="rounded-xl border-0 shadow-sm"
            onClick={() =>
              setExpandedTrainer(
                expandedTrainer === trainer.id ? null : trainer.id,
              )
            }
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-3">
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{trainer.name}</h3>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(trainer.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {trainer.rating} ({trainer.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {trainer.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {trainer.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs rounded-full"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#D91E36]">
                  {trainer.price}
                </span>
                <div className="flex gap-2">
                  <Badge className="bg-green-100 text-green-800 text-xs rounded-full">
                    {trainer.available}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-[#D91E36] hover:bg-[#B91C32] text-white rounded-xl"
                  >
                    Book
                  </Button>
                </div>
              </div>

              {/* Expanded Profile */}
              {expandedTrainer === trainer.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Bio</h4>
                    <p className="text-sm text-gray-600">{trainer.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Experience</h4>
                    <p className="text-sm text-gray-600">
                      {trainer.experience}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Certifications</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs rounded-full"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#D91E36] hover:bg-[#B91C32] text-white rounded-xl">
                    View Full Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // 3. Shops + Products
  const ShopsSection = () => (
    <div className="space-y-4">
      {/* Shop Scroller */}
      <div className="px-4">
        <h3 className="font-semibold mb-3">Shops</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {shops.map((shop) => (
            <div key={shop.id} className="flex-shrink-0 text-center">
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-16 h-16 rounded-xl object-cover mx-auto mb-2"
              />
              <p className="text-xs font-medium">{shop.name}</p>
              <p className="text-xs text-gray-500">{shop.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sort & Filter */}
      <div className="flex justify-between items-center px-4">
        <h3 className="font-semibold">Products</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Select>
            <SelectTrigger className="w-20 h-8 rounded-full text-xs">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="rounded-xl border-0 shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>
              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-[#D91E36] text-white text-xs rounded-full">
                  -{product.discount}%
                </Badge>
              )}
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm mb-1">{product.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{product.shop}</p>

              <div className="flex items-center mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-[#D91E36]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Button
                onClick={addToCart}
                size="sm"
                className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white rounded-xl text-xs"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // 4. Facilities Viewer
  const FacilitiesSection = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Building className="w-4 h-4 mr-2" />
          Type
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full whitespace-nowrap"
        >
          <Star className="w-4 h-4 mr-2" />
          Rating
        </Button>
      </div>

      {/* Facility Cards */}
      <div className="space-y-4 px-4">
        {facilities.map((facility) => (
          <Card
            key={facility.id}
            className="rounded-xl border-0 shadow-sm overflow-hidden"
            onClick={() =>
              setExpandedFacility(
                expandedFacility === facility.id ? null : facility.id,
              )
            }
          >
            <div className="relative">
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  className={`rounded-full text-white ${
                    facility.availableToday ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {facility.availableToday ? "Available Today" : "Closed"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{facility.name}</h3>
                  <p className="text-sm text-gray-600">{facility.type}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{facility.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {facility.location}
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {facility.amenities.map((amenity, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs rounded-full"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#D91E36]">
                  {facility.price}
                </span>
                <span className="text-xs text-gray-500">{facility.hours}</span>
              </div>

              {/* Expanded Content */}
              {expandedFacility === facility.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Available Times Today</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "9:00 AM",
                        "11:00 AM",
                        "2:00 PM",
                        "4:00 PM",
                        "6:00 PM",
                        "8:00 PM",
                      ].map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-xl"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#D91E36] hover:bg-[#B91C32] text-white rounded-xl">
                    Book Facility
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Profile Section
  const ProfileSection = () => (
    <div className="px-4 space-y-4">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Sarah Johnson</h2>
        <Badge className="bg-[#D91E36] text-white rounded-full">Trainer</Badge>
      </div>

      <div className="space-y-3">
        {[
          { icon: User, label: "Edit Profile", value: "" },
          { icon: Calendar, label: "My Bookings", value: "3 upcoming" },
          { icon: Heart, label: "Favorites", value: `${favorites.size} items` },
          { icon: Building, label: "My Facilities", value: "2 locations" },
        ].map((item, index) => (
          <Card key={index} className="rounded-xl border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.value && (
                  <span className="text-sm text-gray-500">{item.value}</span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Cart Modal
  const CartModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Cart ({cartItems})</h3>
          <button onClick={() => setShowCart(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Add some products to get started"
          />
        ) : (
          <div className="space-y-4">
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-[#D91E36] mx-auto mb-4" />
              <p className="text-gray-600">Cart items would appear here</p>
            </div>
            <Button className="w-full bg-[#D91E36] hover:bg-[#B91C32] text-white rounded-xl">
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-inter">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">
            VIBE<span className="text-[#D91E36]">CORE</span>
          </h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <button onClick={() => setShowCart(true)} className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#D91E36] text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {cartItems}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeTab === "events" && <EventsSection />}
            {activeTab === "trainers" && <TrainersSection />}
            {activeTab === "shop" && <ShopsSection />}
            {activeTab === "facilities" && <FacilitiesSection />}
            {activeTab === "profile" && <ProfileSection />}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "events", icon: Calendar, label: "Events" },
            { id: "trainers", icon: User, label: "Trainers" },
            { id: "shop", icon: ShoppingCart, label: "Shop" },
            { id: "facilities", icon: Building, label: "Facilities" },
            { id: "profile", icon: Home, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${
                activeTab === tab.id
                  ? "text-[#D91E36] bg-red-50"
                  : "text-gray-600"
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && <CartModal />}
    </div>
  );
}
