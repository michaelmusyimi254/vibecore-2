import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Wifi, Car, Building2, Users, ChevronLeft, ChevronRight, MessageCircle, Phone, CheckCircle, Heart, Share2, Mail, Globe, Instagram, Facebook, Twitter, Calendar as CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/ui/NavBar";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/ui/Footer";

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

  // Mock venue images
  const venueImages = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=200&fit=crop",
  ];
  // Auto-scroll state for facility images
  const [currentImage, setCurrentImage] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  useEffect(() => {
    if (isGalleryHovered) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % venueImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isGalleryHovered, venueImages.length]);
  const goToPrevImage = () => setCurrentImage((prev) => (prev - 1 + venueImages.length) % venueImages.length);
  const goToNextImage = () => setCurrentImage((prev) => (prev + 1) % venueImages.length);
  // Mock trainers
  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Personal Trainer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Certified personal trainer with 8 years of experience helping clients achieve their fitness goals.",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Yoga Instructor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Yoga and mindfulness coach specializing in Hatha and Vinyasa for all levels.",
    },
    {
      id: 3,
      name: "Emma Davis",
      specialty: "Group Fitness Coach",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Energetic group class instructor with a passion for HIIT and bootcamp workouts.",
    },
  ];
  // Mock services with descriptions
  const services = [
    { name: "Personal Training", description: "One-on-one sessions tailored to your goals with certified trainers." },
    { name: "Group Classes", description: "Fun and motivating group workouts including HIIT, yoga, and more." },
    { name: "Pool Access", description: "Unlimited access to our heated indoor pool for laps and relaxation." },
    { name: "Sauna & Wellness", description: "Relax and recover in our modern sauna and wellness area." },
    { name: "Nutrition Coaching", description: "Personalized nutrition plans and ongoing support from our experts." },
  ];
  // Mock weekly schedule for calendar
  const weeklySchedule = [
    { name: "Zumba Class", day: "Monday", time: "6:00 AM", description: "A fun, high-energy dance workout for all levels.", instructor: "Sarah Johnson", location: "Studio A", duration: "1 hour" },
    { name: "HIIT Bootcamp", day: "Tuesday", time: "7:00 PM", description: "Intense interval training to boost strength and endurance.", instructor: "Mike Chen", location: "Main Gym", duration: "45 minutes" },
    { name: "Yoga Flow", day: "Wednesday", time: "8:00 AM", description: "Gentle flow yoga to improve flexibility and mindfulness.", instructor: "Emma Davis", location: "Yoga Room", duration: "1 hour" },
    { name: "Pilates", day: "Thursday", time: "5:30 PM", description: "Core-focused pilates for strength and posture.", instructor: "Sarah Johnson", location: "Studio B", duration: "1 hour" },
    { name: "Open Swim", day: "Friday", time: "10:00 AM", description: "Open pool time for laps and relaxation.", instructor: "-", location: "Pool", duration: "2 hours" },
    { name: "Strength Training", day: "Saturday", time: "9:00 AM", description: "Guided strength training for all levels.", instructor: "Mike Chen", location: "Main Gym", duration: "1 hour" },
    { name: "Restorative Yoga", day: "Sunday", time: "4:00 PM", description: "Relaxing yoga to restore body and mind.", instructor: "Emma Davis", location: "Yoga Room", duration: "1 hour" },
  ];
  const [openEventIdx, setOpenEventIdx] = useState<number>(0);
  // Mock packages for Price tab
  const packages = [
    { name: "Monthly", price: "$49", description: "Access to all facilities, classes, and amenities for one month." },
    { name: "3 Months", price: "$129", description: "Save more with a 3-month membership. Includes all classes and amenities." },
    { name: "6 Months", price: "$239", description: "Best value for regulars. Priority booking and free guest passes." },
    { name: "Annual", price: "$449", description: "Full year access, exclusive events, and premium perks." },
  ];
  // Mock events for Events tab
  const facilityEvents = [
    {
      id: 1,
      title: "Morning Yoga Flow",
      date: "2024-07-01",
      time: "7:00 AM",
      location: "Studio A",
      price: "Free",
      spots: "15 spots left",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Zumba Party",
      date: "2024-07-03",
      time: "6:00 PM",
      location: "Main Hall",
      price: "$10",
      spots: "8 spots left",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "HIIT Bootcamp",
      date: "2024-07-05",
      time: "5:30 PM",
      location: "Outdoor Field",
      price: "$15",
      spots: "12 spots left",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=300&h=200&fit=crop",
    },
  ];

  // 1. Add state for selected package, form fields, submission, and confirmation
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '', hearAbout: '', message: '', subscribe: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Cover Image + Floating Card (Shop style) */}
      <section className="pt-24">
        <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${facility.image})` }}>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: image and stats grid */}
              <div className="flex-shrink-0">
                <img src={facility.image} alt={facility.name} className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{facility.name}</h1>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-gray-600 font-semibold">{facility.type}</span>
                    </div>
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
                {/* Compact info row - slightly smaller */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-base text-gray-800 font-medium">
                  <span className="flex items-center gap-1">
                    <Badge variant={facility.status === "Open" ? "default" : "secondary"} className="rounded-full px-3 py-1 text-sm font-semibold">
                      {facility.status}
                    </Badge>
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">{facility.rating}</span>
                    <span className="text-gray-500">({facility.reviews} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-5 h-5 text-vibecore-red" />
                    <span className="font-semibold">{facility.openTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-vibecore-red" />
                    <span className="font-semibold">{facility.type}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-5 h-5 text-vibecore-red" />
                    <span className="font-semibold">{facility.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left column: sidebar */}
            <div className="space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {facility.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{facility.description}</p>
                </CardContent>
              </Card>
              {/* Message/Call */}
              <div className="flex flex-col gap-2">
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" /> Message
                </Button>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
              {/* Contact & Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href="mailto:support@elitefitness.com" className="hover:underline">support@elitefitness.com</a>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href="tel:+15551234567" className="hover:underline">+1 (555) 123-4567</a>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <Globe className="w-4 h-4 mr-2 text-vibecore-red" />
                    <a href="https://elitefitness.com" target="_blank" rel="noopener noreferrer" className="hover:underline">https://elitefitness.com</a>
                  </div>
                  {/* Social Icons */}
                  <div className="flex items-center gap-3 mb-2 mt-1">
                    <a href="https://instagram.com/elitefitness" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="w-5 h-5 text-vibecore-red hover:text-vibecore-red-hover transition-colors" />
                    </a>
                    <a href="https://facebook.com/elitefitness" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="w-5 h-5 text-vibecore-red hover:text-vibecore-red-hover transition-colors" />
                    </a>
                    <a href="https://twitter.com/elitefitness" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="w-5 h-5 text-vibecore-red hover:text-vibecore-red-hover transition-colors" />
                    </a>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-vibecore-red" />
                    123 Main St, Downtown
                    <span className="ml-2 text-xs text-gray-500">2.5 km away</span>
                  </div>
                </CardContent>
              </Card>
              {/* Perks */}
              <Card>
                <CardHeader>
                  <CardTitle>Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {facility.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Amenities (moved up) */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {facility.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="rounded-full text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Facility Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Facility Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Years in Business:</span> 7</li>
                    <li><span className="font-medium">Shipping:</span> Free towels for members</li>
                    <li><span className="font-medium">Return Policy:</span> 30-day hassle-free cancellation</li>
                    <li><span className="font-medium">Featured Offer:</span> 1 Month Free Personal Training</li>
                  </ul>
                </CardContent>
              </Card>
              {/* Categories (moved from main tabs) */}
              <Card>
                <CardHeader>
                  <CardTitle>Facility Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">All</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Gym</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Pool</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Sauna</Button>
                    <Button variant="outline" size="sm" className="rounded-full">Classes</Button>
                  </div>
                </CardContent>
              </Card>
              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-2 max-h-64 overflow-y-auto pr-1">
                    {/* Example reviews, replace with dynamic data as needed */}
                    <li className="text-xs text-gray-700 border-b border-gray-200 pb-2 last:border-b-0"><span className="font-semibold text-vibecore-red">Jane D.:</span> Great quality products and fast shipping! Highly recommend. <span className="ml-2 text-yellow-500">★★★★★</span></li>
                    <li className="text-xs text-gray-700 border-b border-gray-200 pb-2 last:border-b-0"><span className="font-semibold text-vibecore-red">Mike S.:</span> Good selection and prices. Customer support was helpful. <span className="ml-2 text-yellow-500">★★★★</span></li>
                    <li className="text-xs text-gray-700 border-b border-gray-200 pb-2 last:border-b-0"><span className="font-semibold text-vibecore-red">Lisa K.:</span> Love my new yoga mat! Will shop again. <span className="ml-2 text-yellow-500">★★★★★</span></li>
                  </ul>
                  <form className="mt-2">
                    <input type="text" placeholder="Add a review..." className="w-full border rounded px-2 py-1 text-xs mb-1" />
                    <Button size="sm" className="w-full bg-vibecore-red text-white rounded-full text-xs">Submit</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            {/* Right column: main tab content */}
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 rounded-2xl p-1">
                  <TabsTrigger
                    value="services"
                    className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                  >
                    Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="calendar"
                    className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                  >
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger
                    value="packages"
                    className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                  >
                    Packages
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" /> Events
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="services">
                  {/* Facility Images Gallery */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">Facility Images</h3>
                    <div
                      className="relative flex items-center justify-center w-full"
                      onMouseEnter={() => { setIsGalleryHovered(true); setShowArrows(true); }}
                      onMouseLeave={() => { setIsGalleryHovered(false); setShowArrows(false); }}
                      style={{ minHeight: '420px' }}
                    >
                      <img
                        src={venueImages[currentImage]}
                        alt={`Facility ${currentImage + 1}`}
                        className="w-full h-[400px] object-cover rounded-lg shadow"
                      />
                      {showArrows && (
                        <>
                          <button
                            onClick={goToPrevImage}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-1 shadow-sm transition-opacity flex items-center justify-center"
                            aria-label="Previous image"
                            style={{ width: 32, height: 32 }}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={goToNextImage}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white rounded-full p-1 shadow-sm transition-opacity flex items-center justify-center"
                            aria-label="Next image"
                            style={{ width: 32, height: 32 }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Services List with Descriptions */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm text-gray-700 space-y-4">
                        {services.map((service) => (
                          <li key={service.name}>
                            <div className="font-semibold text-base">{service.name}</div>
                            <div className="text-gray-600 text-sm">{service.description}</div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {/* Trainers Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Meet Our Trainers</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {trainers.map((trainer) => (
                        <Card key={trainer.id} className="flex flex-row items-center gap-4 p-4">
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-vibecore-red"
                          />
                          <div>
                            <div className="font-semibold">{trainer.name}</div>
                            <div className="text-xs text-vibecore-red mb-1">{trainer.specialty}</div>
                            <div className="text-xs text-gray-600">{trainer.bio}</div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="calendar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar of Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {weeklySchedule.map((event, idx) => (
                          <div key={idx}>
                            <button
                              className="w-full flex items-center justify-between py-3 focus:outline-none hover:bg-gray-50 transition rounded"
                              onClick={() => setOpenEventIdx(openEventIdx === idx ? null : idx)}
                              aria-expanded={openEventIdx === idx}
                            >
                              <div className="font-semibold text-base text-vibecore-red text-left">{event.name}</div>
                              <div className="flex items-center gap-4 text-sm text-gray-700">
                                <span className="font-medium">{event.day}</span>
                                <span className="text-gray-500">{event.time}</span>
                              </div>
                            </button>
                            {openEventIdx === idx && (
                              <div className="bg-gray-50 rounded-xl p-4 mb-2 mt-1 text-sm text-gray-700 animate-fade-in">
                                <div className="mb-1"><span className="font-semibold">Description:</span> {event.description}</div>
                                <div className="mb-1"><span className="font-semibold">Instructor:</span> {event.instructor}</div>
                                <div className="mb-1"><span className="font-semibold">Location:</span> {event.location}</div>
                                <div><span className="font-semibold">Duration:</span> {event.duration}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="packages">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {packages.map((pkg) => (
                      <Card key={pkg.name} className={`flex flex-col h-full justify-between border-2 transition-colors ${selectedPackage === pkg.name ? 'border-vibecore-red' : 'border-gray-200 hover:border-vibecore-red'}`}> 
                        <CardHeader>
                          <CardTitle className="text-lg font-bold mb-2">{pkg.name}</CardTitle>
                          <div className="text-3xl font-bold text-vibecore-red mb-1">{pkg.price}</div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                          <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full mt-auto" onClick={() => { setSelectedPackage(pkg.name); setFormSubmitted(false); }}>Select</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Booking/Inquiry Form appears below selected package */}
                  {selectedPackage && !formSubmitted && (
                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle>Book: {selectedPackage} Package</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-3" onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }}>
                          <input type="text" className="w-full border rounded px-2 py-1 text-sm" placeholder="Your Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                          <input type="email" className="w-full border rounded px-2 py-1 text-sm" placeholder="Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                          <input type="tel" className="w-full border rounded px-2 py-1 text-sm" placeholder="Phone" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                          <textarea className="w-full border rounded px-2 py-1 text-sm" placeholder="Reason for your inquiry (e.g. tour, membership, event, partnership, etc.)" rows={3} required value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} />
                          <div>
                            <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
                            <select className="w-full border rounded px-2 py-1 text-sm" required value={form.hearAbout} onChange={e => setForm(f => ({ ...f, hearAbout: e.target.value }))}>
                              <option value="">Select an option</option>
                              <option value="search">Search Engine</option>
                              <option value="social">Social Media</option>
                              <option value="friend">Friend/Referral</option>
                              <option value="event">Attended an Event</option>
                              <option value="ad">Advertisement</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <textarea className="w-full border rounded px-2 py-1 text-sm" placeholder="Additional message (optional)" rows={2} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" checked={form.subscribe} onChange={e => setForm(f => ({ ...f, subscribe: e.target.checked }))} />
                            Subscribe to facility updates and offers
                          </label>
                          <Button type="submit" size="sm" className="bg-vibecore-red text-white rounded-full w-full">Submit Inquiry</Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                  {/* Confirmation message after submission */}
                  {formSubmitted && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800 text-center">
                      Thank you for your inquiry! The facility will reach out to you soon.
                    </div>
                  )}
                  {/* Disclaimer always visible */}
                  <div className="mt-2 text-xs text-orange-700 bg-orange-50 border-l-4 border-orange-400 p-3 rounded flex items-start gap-2">
                    <span className="mt-0.5"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#f59e42" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#f59e42" strokeWidth="2" strokeLinecap="round"/></svg></span>
                    <span><b>Disclaimer:</b> Please do not make any payments until you have visited the facility and confirmed all details in person. VibeCore does not process payments for facilities directly. All bookings are subject to confirmation by the facility.</span>
                  </div>
                </TabsContent>
                <TabsContent value="events">
                  <div className="mb-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {facilityEvents.map((event) => (
                      <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="space-y-2 mb-4">
                          <p className="text-gray-600 text-sm flex items-center">
                            <CalendarIcon className="w-3 h-3 mr-2" />
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
                          <span className="font-semibold text-vibecore-red">{event.price}</span>
                          <span className="text-sm text-gray-500">{event.spots}</span>
                        </div>
                        <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                          Join Event
                        </Button>
                      </div>
                    ))}
                  </div>
                  {/* Placeholder for calendar UI */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center text-gray-500">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-vibecore-red" />
                    <div className="font-semibold mb-1">Calendar View Coming Soon</div>
                    <div className="text-sm">A full calendar of events will be available here.</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 