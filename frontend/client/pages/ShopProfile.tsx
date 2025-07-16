import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  ChevronLeft,
  ShoppingBag,
  Mail,
  Phone,
  Globe,
  MapPin as MapIcon,
  ShoppingCart,
  Flame, // <-- Add for On Offer
  Sparkles, // <-- Add for Popular
} from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// Add Shop type to support both single and multiple locations
interface ShopLocation {
  name: string;
  address: string;
  distance?: string;
}

interface Shop {
  id: number;
  name: string;
  category: string;
  location: string;
  locations: ShopLocation[];
  rating: number;
  reviews: number;
  image: string;
  coverImage: string;
  featured: string;
  price: string;
  description: string;
  tags: string[];
  email: string;
  phone: string;
  website: string;
  yearsInBusiness: number;
  shipping: string;
  returnPolicy: string;
  gallery: string[];
}

export default function ShopProfile() {
  // Example: single location
  // const shop = { ... location: "Lagos, Nigeria", ... }
  // Example: multiple locations
  // const shop = { ... locations: [ { name: "Downtown Branch", address: "123 Main St, Lagos", distance: "2.5 km" }, ... ], ... }
  const shop: Shop = {
    id: 1,
    name: "FitGear Pro",
    category: "Fitness Equipment",
    // Single location with distance
    location: "Lagos, Nigeria",
    locations: [],
    rating: 4.5,
    reviews: 324,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=800&h=300&fit=crop",
    featured: "Premium Dumbbells - 20% Off",
    price: "From $29",
    description:
      "FitGear Pro offers a wide range of premium fitness equipment for all levels. Shop online or visit our stores for expert advice and exclusive deals!",
    tags: ["Free Shipping", "Warranty", "Expert Support"],
    email: "support@fitgearpro.com",
    phone: "+1 (555) 123-4567",
    website: "https://fitgearpro.com",
    yearsInBusiness: 7,
    shipping: "Free shipping on orders over $50",
    returnPolicy: "30-day hassle-free returns",
    gallery: [
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=400&fit=crop",
    ],
  };

  // Mock products
  const products = [
    {
      id: 1,
      name: "Adjustable Dumbbells (Pair)",
      price: "$99",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=300&h=200&fit=crop",
      shortDescription: "Space-saving, easy to adjust, perfect for home workouts.",
      category: "Equipment",
      offer: true,
      createdAt: new Date("2024-06-01T10:00:00Z"),
      popular: true, // <-- Add popular flag
    },
    {
      id: 2,
      name: "Yoga Mat Pro",
      price: "$35",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
      shortDescription: "Non-slip, eco-friendly, extra thick for comfort.",
      category: "Accessories",
      offer: false,
      createdAt: new Date("2024-06-03T09:00:00Z"),
      popular: false,
    },
    {
      id: 3,
      name: "Resistance Bands Set",
      price: "$24",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=300&h=200&fit=crop",
      shortDescription: "5 resistance levels, portable, great for travel.",
      category: "Equipment",
      offer: true,
      createdAt: new Date("2024-06-02T12:00:00Z"),
      popular: true, // <-- Add popular flag
    },
    {
      id: 4,
      name: "Kettlebell 16kg",
      price: "$49",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      shortDescription: "Durable cast iron, wide handle, powder-coated finish.",
      category: "Equipment",
      offer: false,
      createdAt: new Date("2024-05-28T15:00:00Z"),
    },
    {
      id: 5,
      name: "Foam Roller",
      price: "$19",
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=300&h=200&fit=crop",
      shortDescription: "Relieve muscle soreness, improve flexibility.",
      category: "Recovery",
      offer: true,
      createdAt: new Date("2024-06-04T08:00:00Z"),
    },
    {
      id: 6,
      name: "Pull-Up Bar",
      price: "$39",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
      shortDescription: "Easy install, fits most doorways, supports up to 300lbs.",
      category: "Equipment",
      offer: false,
      createdAt: new Date("2024-05-30T11:00:00Z"),
    },
  ];

  // Mock reviews
  const reviews = [
    {
      name: "Jane D.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Great quality products and fast shipping! Highly recommend.",
    },
    {
      name: "Mike S.",
      rating: 4,
      date: "1 month ago",
      comment: "Good selection and prices. Customer support was helpful.",
    },
    {
      name: "Lisa K.",
      rating: 5,
      date: "2 months ago",
      comment: "Love my new yoga mat! Will shop again.",
    },
  ];

  // State for review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  // TODO: Replace with API call to fetch reviews from backend
  // Add 'response' field to each review for owner replies
  const [reviewList, setReviewList] = useState(reviews.map(r => ({ ...r, response: "" })));
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // --- Cart state ---
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  // --- Tab state ---
  const [activeTab, setActiveTab] = useState('products');

  // Auto-scroll reviews to top when a new review is added
  useEffect(() => {
    if (!isUserInteracting && reviewsContainerRef.current) {
      reviewsContainerRef.current.scrollTop = 0;
    }
  }, [reviewList, isUserInteracting]);

  // Handle Add to Cart
  const handleAddToCart = async (product: any) => {
    setCart((prev) => {
      // If already in cart, increase quantity
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartMessage(`Added ${product.name} to cart! The shop owner will be notified.`);
    // TODO: Call backend API to notify shop owner by email
    // await fetch('/api/notify-shop-owner', { method: 'POST', body: JSON.stringify({ product, shop }) })
    setTimeout(() => setCartMessage(""), 3000);
  };

  // Handle review form submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewList([
      { ...reviewForm, date: "Just now", response: "" },
      ...reviewList,
    ]);
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  const [cartMessage, setCartMessage] = useState("");

  // --- Expanded Product filter state ---
  // Extract unique categories from products
  const productCategories = Array.from(new Set(products.map(p => p.category || "Other")));
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [offersOnly, setOffersOnly] = useState(false);
  // TODO: Add more attribute filters as needed

  // Helper to parse price string (e.g., "$99")
  const parsePrice = (price: string) => {
    const match = price.match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  let filteredProducts = products.filter(p => {
    // Name search
    if (!p.name.toLowerCase().includes(productSearch.toLowerCase())) return false;
    // Category
    if (selectedCategory && p.category !== selectedCategory) return false;
    // Price
    const price = parsePrice(p.price);
    if (minPrice && price < parseFloat(minPrice)) return false;
    if (maxPrice && price > parseFloat(maxPrice)) return false;
    // Offers only
    if (offersOnly && !p.offer) return false;
    // TODO: Add more attribute filters here
    return true;
  });

  // Sorting
  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "recent") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortBy === "oldest") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    } else if (sortBy === "priceLow") {
      return parsePrice(a.price) - parsePrice(b.price);
    } else if (sortBy === "priceHigh") {
      return parsePrice(b.price) - parsePrice(a.price);
    }
    return 0;
  });

  // Calculate total cost of cart
  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty, 0);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Cover Image */}
      <section className="pt-24">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${shop.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={shop.image} alt={shop.name} />
                  <AvatarFallback>FG</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                    <p className="text-gray-600 mb-2">{shop.category}</p>
                    <p className="text-gray-500 text-sm flex items-center mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {shop.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Heart className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-xl ml-1">{shop.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{shop.reviews} reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <ShoppingBag className="w-5 h-5 text-vibecore-red mr-1" />
                      <span className="font-bold text-xl">{products.length}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Products</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="font-bold text-xl text-vibecore-red">
                        {shop.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Starting Price</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Badge className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-medium">
                        {shop.featured}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">Featured Offer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content Layout (no tabs) */}
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              {/* Left Sidebar */}
              <div className="md:w-1/3 space-y-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-xl font-bold mb-2">About {shop.name}</h4>
                  <p className="text-gray-700 text-base mb-4">{shop.description}</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" /> Message
                    </Button>
                    <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Contact & Location</h4>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href={`mailto:${shop.email}`} className="hover:underline">{shop.email}</a>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href={`tel:${shop.phone}`} className="hover:underline">{shop.phone}</a>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Globe className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href={shop.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{shop.website}</a>
                  </div>
                  {/* Location(s) */}
                  {shop.location && (
                    <div className="flex items-center mb-2 text-sm text-gray-700">
                      <MapIcon className="w-4 h-4 mr-2 text-vibecore-red" />
                      {shop.location}
                      <span className="ml-2 text-xs text-gray-500">2.5 km away</span>
                    </div>
                  )}
                  {shop.locations && shop.locations.length > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center mb-1 text-sm text-gray-700">
                        <MapIcon className="w-4 h-4 mr-2 text-vibecore-red" />
                        <span className="font-semibold">Store Locations:</span>
                      </div>
                      <ul className="ml-6 mt-1 space-y-1">
                        {shop.locations.map((loc, i) => (
                          <li key={i} className="text-xs text-gray-700">
                            <span className="font-medium">{loc.name}:</span> {loc.address}
                            {loc.distance && <span className="ml-2 text-gray-500">({loc.distance})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Shop Highlights</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Years in Business:</span> {shop.yearsInBusiness}</li>
                    <li><span className="font-medium">Shipping:</span> {shop.shipping}</li>
                    <li><span className="font-medium">Return Policy:</span> {shop.returnPolicy}</li>
                    <li><span className="font-medium">Featured Offer:</span> {shop.featured}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Perks</h4>
                  <div className="flex flex-wrap gap-2">
                    {shop.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Shop Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">All</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Equipment</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Accessories</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Recovery</Button>
                  </div>
                </div>
                {/* Reviews Section in Sidebar */}
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col h-[350px]">
                  <h4 className="text-xl font-bold mb-2">Reviews</h4>
                  <div
                    ref={reviewsContainerRef}
                    className="space-y-3 flex-1 max-h-48 overflow-y-auto pr-1 mb-2 scrollbar-hide"
                    onMouseEnter={() => setIsUserInteracting(true)}
                    onMouseLeave={() => setIsUserInteracting(false)}
                    onScroll={() => setIsUserInteracting(true)}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {reviewList.map((review, idx) => (
                      <div key={idx} className="bg-gray-100 rounded p-2 shadow-sm">
                        <div className="flex items-center mb-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="font-bold text-vibecore-red mr-2 text-sm">{review.rating}</span>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-1 text-xs">{review.comment}</p>
                        <span className="text-xs text-gray-500">{review.name}</span>
                        {/* Owner response (display only) */}
                        {review.response && (
                          <div className="mt-2 ml-4 p-2 bg-white border-l-4 border-vibecore-red rounded">
                            <span className="text-xs font-semibold text-vibecore-red">Owner reply:</span>
                            <p className="text-xs text-gray-700 mt-1">{review.response}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleReviewSubmit} className="bg-white rounded-xl p-3 shadow mt-auto">
                    <div className="mb-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={reviewForm.name}
                        onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={reviewForm.rating}
                        onChange={e => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      >
                        {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="mb-2">
                      <textarea
                        placeholder="Comment"
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={reviewForm.comment}
                        onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" size="sm" className="bg-vibecore-red text-white rounded-full w-full">Submit</Button>
                  </form>
                </div>
              </div>
              {/* Right Main Content */}
              <div className="md:w-2/3">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
                  <TabsList className="flex w-full justify-between items-center mb-4">
                    <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                      <TabsTrigger
                        value="products"
                        className="data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 px-4 py-1 rounded-full font-bold transition-colors"
                      >
                        Shop Products
                      </TabsTrigger>
                      <TabsTrigger
                        value="cart"
                        className="data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 px-4 py-1 rounded-full font-bold transition-colors"
                      >
                        Cart
                      </TabsTrigger>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="relative p-2 rounded-full hover:bg-gray-100"
                        onClick={() => setActiveTab('cart')}
                        aria-label="View Cart"
                      >
                        <ShoppingCart className="w-6 h-6 text-vibecore-red" />
                        {cart.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-vibecore-red text-white text-xs rounded-full px-1.5 py-0.5">
                            {cart.reduce((sum, item) => sum + item.qty, 0)}
                          </span>
                        )}
                      </button>
                      <Button
                        size="sm"
                        className="bg-vibecore-red text-white rounded-full"
                        onClick={() => setActiveTab('cart')}
                      >
                        View Cart
                      </Button>
                    </div>
                  </TabsList>
                  <TabsContent value="products">
                    {/* Expanded Smart Filter Bar */}
                    <div className="mb-4 flex flex-col sm:flex-row flex-wrap gap-2 items-center">
                      {/* Name search */}
                      <input
                        type="text"
                        className="border rounded px-3 py-2 text-sm w-full sm:w-48"
                        placeholder="Search products..."
                        value={productSearch}
                        onChange={e => setProductSearch(e.target.value)}
                      />
                      {/* Category dropdown */}
                      <select
                        className="border rounded px-3 py-2 text-sm w-full sm:w-40"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {productCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {/* Min price */}
                      <input
                        type="number"
                        className="border rounded px-3 py-2 text-sm w-24"
                        placeholder="Min $"
                        value={minPrice}
                        min={0}
                        onChange={e => setMinPrice(e.target.value)}
                      />
                      {/* Max price */}
                      <input
                        type="number"
                        className="border rounded px-3 py-2 text-sm w-24"
                        placeholder="Max $"
                        value={maxPrice}
                        min={0}
                        onChange={e => setMaxPrice(e.target.value)}
                      />
                      {/* Offers only checkbox */}
                      <label className="flex items-center gap-1 text-xs font-medium">
                        <input
                          type="checkbox"
                          checked={offersOnly}
                          onChange={e => setOffersOnly(e.target.checked)}
                        />
                        Offers only
                      </label>
                      {/* Sort by dropdown */}
                      <select
                        className="border rounded px-3 py-2 text-sm w-full sm:w-40"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="oldest">Oldest</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                      </select>
                      {/* TODO: Add more attribute filters here (e.g., Brand, In Stock, etc.) */}
                    </div>
                    {cartMessage && (
                      <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">{cartMessage}</div>
                    )}
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                          <div className="relative w-full mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            {product.offer && (
                              <span className="absolute top-2 left-2 flex items-center gap-1 text-white text-xs font-bold" style={{textShadow: '0 1px 4px rgba(0,0,0,0.5)'}}>
                                <Flame className="w-4 h-4" /> On Offer
                              </span>
                            )}
                            {product.popular && (
                              <span className="absolute top-2 right-2 flex items-center gap-1 text-white text-xs font-bold" style={{textShadow: '0 1px 4px rgba(0,0,0,0.5)'}}>
                                <Sparkles className="w-4 h-4" /> Popular
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-1 text-center">{product.name}</h3>
                          <span className="font-bold text-vibecore-red text-lg mb-2">{product.price}</span>
                          <p className="text-gray-500 text-sm mb-2 text-center">{product.shortDescription}</p>
                          <Button
                            size="sm"
                            className="w-32 bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="cart">
                    <div className="bg-white rounded-xl shadow p-6 mt-4">
                      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
                      {cart.length === 0 ? (
                        <div className="text-gray-500 text-center mb-4">Your cart is empty.</div>
                      ) : (
                        <>
                          <ul className="mb-4 divide-y">
                            {cart.map((item) => (
                              <li key={item.id} className="py-2 flex items-center gap-2">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                  <div className="font-semibold text-sm">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.price} × {item.qty}</div>
                                </div>
                                <div className="text-sm font-bold text-vibecore-red">${(parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty).toFixed(2)}</div>
                              </li>
                            ))}
                          </ul>
                          <div className="mb-4 flex justify-end">
                            <span className="font-bold text-lg text-vibecore-red">Total: ${cartTotal.toFixed(2)}</span>
                          </div>
                        </>
                      )}
                      {/* Shipping time */}
                      <div className="mb-4 text-sm text-gray-700">
                        <span className="font-semibold">Estimated Shipping Time:</span> Ships in 2-4 days
                      </div>
                      {/* Checkout Form */}
                      <form className="space-y-3">
                        <h4 className="font-semibold mb-1">Your Details</h4>
                        <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Full Name" required />
                        <input type="email" className="border rounded px-3 py-2 w-full" placeholder="Email Address" required />
                        <input type="tel" className="border rounded px-3 py-2 w-full" placeholder="Phone Number" required />
                        <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Delivery Address" required />
                        <textarea className="border rounded px-3 py-2 w-full" placeholder="Delivery Instructions (optional)" rows={2} />
                        {/* TODO: Add more fields as needed */}
                        <Button type="submit" className="w-full bg-vibecore-red text-white rounded-full">Checkout</Button>
                      </form>
                      {/* Disclaimer */}
                      <div className="mt-4 text-xs text-gray-500 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <strong>Disclaimer:</strong> Please do not make payments until you have confirmed the legitimacy of the shop and your order. VibeCore is not responsible for transactions made outside the platform. Always verify before sending money to avoid scams.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hide scrollbar utility for reviews */}
      {/* Add this to your global CSS if not already present: */}
      {/* .scrollbar-hide::-webkit-scrollbar { display: none; } */}
      {/* .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } */}
      {/* TODO: Implement /api/notify-shop-owner endpoint in Laravel backend to send email to shop owner when a product is added to cart. */}
    </div>
  );
}
/* Hide scrollbar utility for reviews */
/* Add this to your global CSS if not already present: */
/* .scrollbar-hide::-webkit-scrollbar { display: none; } */
/* .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } */
// TODO: Implement /api/notify-shop-owner endpoint in Laravel backend to send email to shop owner when a product is added to cart. 