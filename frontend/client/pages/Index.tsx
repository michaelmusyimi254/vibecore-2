import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

const heroSlides = [
  {
    title: "Join as a Trainee",
    description: "Start your fitness journey, find trainers, and achieve your goals.",
    button: "Join as a Trainee",
  },
  {
    title: "Join as a Trainer",
    description: "Share your expertise, connect with clients, and grow your business.",
    button: "Become a Trainer",
  },
  {
    title: "Join as a Facility",
    description: "List your gym, studio, pool, or fitness center. Attract new members and manage bookings with ease.",
    button: "List Your Facility",
  },
  {
    title: "Become a Vendor",
    description: "Sell fitness equipment, supplements, and accessories to our community.",
    button: "Start Selling",
  },
  {
    title: "Promote Your Event",
    description: "Advertise your fitness events and reach a wider audience.",
    button: "Promote Event",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const slideCount = heroSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount]);

  const slide = heroSlides[current];
  const backgroundImage = "url('/your-default-image-path.jpg')"; // Replace with the correct path to your uploaded image

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative min-h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${backgroundImage}`,
        }}
      >
        <div className="container mx-auto px-4 pt-24 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Complete
                <br />
                Fitness & Wellness
                <br />
                Platform
              </h1>

              {/* Search Form with Curved Buttons */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl space-y-4 max-w-md">
                <Input
                  placeholder="Search for trainers, facilities, or events..."
                  className="bg-white/20 border-white/30 placeholder:text-white/70 text-white rounded-full px-4"
                />
                <Select>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-full">
                    <SelectValue placeholder="Detect my location..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      Use Current Location
                    </SelectItem>
                    <SelectItem value="custom">Enter Location</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  Search
                </Button>
              </div>

              <p className="mt-4 text-white/80">
                Popular searches within my area
              </p>
              <div className="flex flex-wrap gap-2 mt-2 pb-10">
                {["Yoga", "Personal Training", "Pilates", "HIIT", "Zumba"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/40 hover:bg-vibecore-red hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Floating Card Slider */}
            <div className="flex justify-end">
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl max-w-sm text-white transition-all duration-500">
                <h3 className="font-semibold text-lg">{slide.title}</h3>
                <p className="text-white/90 mb-4 text-sm">{slide.description}</p>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  {slide.button}
                </Button>
              </div>
            </div>
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrent((current - 1 + slideCount) % slideCount)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => setCurrent((current + 1) % slideCount)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            aria-label="Next Slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      {/* Platform Features Section with Left-Aligned Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Left-aligned heading with content underneath */}
          <div className="mb-8">
            <span className="text-vibecore-red font-semibold text-sm uppercase tracking-wider">
              Platform Features
            </span>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Everything you need
              </h3>
              <p className="text-gray-600 text-sm">
                A comprehensive platform that connects fitness enthusiasts with
                trainers, facilities, and products.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Join Events</h3>
              <p className="text-gray-600 text-sm">
                Participate in bootcamps, workshops, competitions, and wellness
                retreats organized by fitness professionals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Shop Fitness Gear</h3>
              <p className="text-gray-600 text-sm">
                Browse and purchase equipment, supplements, apparel, and fitness
                accessories from trusted vendors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600 text-sm">
                Connect with like-minded fitness enthusiasts, share your
                journey, and get motivated by others' progress.
              </p>
            </div>
          </div>

          {/* Navigation arrows positioned underneath */}
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full border-2 border-vibecore-red text-vibecore-red flex items-center justify-center hover:bg-vibecore-red hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-vibecore-red text-vibecore-red flex items-center justify-center hover:bg-vibecore-red hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Ready to Join Section with Images and Mobile Scrolling */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Join VibeCore?</h2>
            <p className="text-gray-600">
              Choose your path and start building your fitness business today
            </p>
          </div>

          {/* Mobile Scrollable, Desktop Grid */}
          <div className="md:overflow-visible overflow-x-auto">
            <div className="flex md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto space-x-6 md:space-x-0 pb-4 md:pb-0">
              {/* Trainer Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow min-w-[300px] md:min-w-0">
                <div className="w-20 h-20 bg-gradient-to-br from-vibecore-red to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Join as a Trainer
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Share your expertise, connect with clients, and grow your
                  fitness business. Offer personal training, group classes, and
                  wellness coaching services.
                </p>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  Become a Trainer
                </Button>
              </div>

              {/* Facility Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow min-w-[300px] md:min-w-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Join as a Facility
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  List your gym, studio, or fitness center. Attract new members,
                  manage bookings, and showcase your facilities to fitness
                  enthusiasts.
                </p>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  List Your Facility
                </Button>
              </div>

              {/* Vendor Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow min-w-[300px] md:min-w-0">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Join as a Vendor</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Sell fitness equipment, supplements, apparel, and accessories.
                  Reach thousands of fitness enthusiasts looking for quality
                  products.
                </p>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  Start Selling
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
