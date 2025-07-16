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
  ShoppingBag,
  Truck,
  Shield,
  Award,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";

export default function Shops() {
  const shops = [
    {
      id: 1,
      name: "FitGear Pro",
      category: "Fitness Equipment",
      location: "Online & 3 stores",
      rating: 4.5,
      reviews: 324,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      featured: "Premium Dumbbells - 20% Off",
      tags: ["Free Shipping", "Warranty", "Expert Support"],
      price: "From $29",
      verified: true,
    },
    {
      id: 2,
      name: "NutriMax Supplements",
      category: "Supplements",
      location: "456 Health St, Downtown",
      rating: 4.7,
      reviews: 198,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      featured: "Protein Powder Sale - Buy 2 Get 1 Free",
      tags: ["Organic", "Tested", "Fast Delivery"],
      price: "From $24",
      verified: true,
    },
    {
      id: 3,
      name: "ActiveWear Studio",
      category: "Apparel",
      location: "789 Fashion Ave, Midtown",
      rating: 4.3,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1506629905607-bb580a6e0dd5?w=400&h=300&fit=crop",
      featured: "New Spring Collection Available",
      tags: ["Sustainable", "Size Inclusive", "Free Returns"],
      price: "From $35",
      verified: false,
    },
    {
      id: 4,
      name: "Wellness Essentials",
      category: "Accessories",
      location: "321 Wellness Blvd, Eastside",
      rating: 4.6,
      reviews: 87,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      featured: "Yoga Mats & Recovery Tools",
      tags: ["Premium Quality", "Eco-Friendly", "Same Day Delivery"],
      price: "From $19",
      verified: true,
    },
    {
      id: 5,
      name: "PowerPlus Nutrition",
      category: "Supplements",
      location: "Online Store",
      rating: 4.4,
      reviews: 267,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      featured: "Pre-Workout Formula - New Flavors",
      tags: ["Lab Tested", "No Artificial Colors", "Subscription"],
      price: "From $31",
      verified: true,
    },
    {
      id: 6,
      name: "Tech Fitness",
      category: "Technology",
      location: "555 Tech Park, Westside",
      rating: 4.8,
      reviews: 143,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      featured: "Smart Fitness Trackers & Scales",
      tags: ["Latest Tech", "App Integration", "Warranty"],
      price: "From $79",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Page Header */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Fitness Shops</h1>
            <p className="text-gray-600">
              Discover equipment, supplements, apparel, and accessories from
              trusted fitness retailers
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for products, brands, or shops..."
                  className="pl-10 rounded-full border-gray-200"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[150px] rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="current">
                <SelectTrigger className="w-full md:w-[200px] rounded-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Location</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="local">Local Stores</SelectItem>
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>

                {/* Category */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {[
                      "Fitness Equipment",
                      "Supplements",
                      "Apparel",
                      "Accessories",
                      "Technology",
                    ].map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={category} />
                        <label
                          htmlFor={category}
                          className="text-sm text-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {["Under $25", "$25 - $50", "$50 - $100", "Over $100"].map(
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

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Features</h4>
                  <div className="space-y-2">
                    {[
                      "Free Shipping",
                      "Verified Seller",
                      "Same Day Delivery",
                      "Return Policy",
                      "Warranty",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={feature} />
                        <label
                          htmlFor={feature}
                          className="text-sm text-gray-700"
                        >
                          {feature}
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
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {shops.length} shops found
                </h2>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[150px] rounded-full">
                    <SelectValue />
                    <ChevronDown className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{shop.name}</h3>
                        {shop.verified && (
                          <Badge className="bg-green-100 text-green-800 rounded-full">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-2">
                        {shop.category}
                      </p>

                      <p className="text-gray-500 text-sm mb-3 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {shop.location}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {shop.rating}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            ({shop.reviews})
                          </span>
                        </div>
                        <span className="font-semibold text-vibecore-red">
                          {shop.price}
                        </span>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-green-800 text-sm font-medium">
                          {shop.featured}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {shop.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs rounded-full"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center mb-4 text-xs text-gray-500">
                        <Truck className="w-3 h-3 mr-1" />
                        <span className="mr-3">Fast Shipping</span>
                        <Award className="w-3 h-3 mr-1" />
                        <span>Quality Guarantee</span>
                      </div>

                      <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Visit Shop
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-2 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Load More Shops
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
