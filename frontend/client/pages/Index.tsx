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

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation Header */}
      <header className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              VIBE<span className="text-vibecore-red">CORE</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Events
              </Link>
              <Link
                to="/trainers"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Trainers
              </Link>
              <Link
                to="/facilities"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Facilities
              </Link>
              <Link
                to="/shops"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Shops
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-6 rounded-full">
                Login/Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-[600px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://cdn.builder.io/api/v1/assets/89b2ce336c1e469faf0b11a3b6d20bdd/screencapture-localhost-8001-2025-07-16-03_28_36-de77e7?format=webp&width=800')`,
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

            {/* Join as Facility Card */}
            <div className="flex justify-end">
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl max-w-sm text-white">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face"
                    alt="Fitness professionals"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Join as a Facility
                    </h3>
                  </div>
                </div>
                <p className="text-white/90 mb-4 text-sm">
                  List your gym, studio, pool, or fitness center. Attract new
                  members and manage bookings with ease.
                </p>
                <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                  List Your Facility
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
          <ChevronLeft size={32} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
          <ChevronRight size={32} />
        </button>
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
      <footer className="bg-vibecore-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                VIBE<span className="text-vibecore-red">CORE</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Connect with fitness professionals, discover amazing facilities,
                and join exciting events in your area. Your ultimate fitness
                community platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/trainer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Join as a Trainer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/facility"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Join Your Facility
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Promote</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/shop"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Join Your Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Advertise Your Event With Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Info</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/pricing"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">© 2025 Made by BrandwithN.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.294 1.195-.334 1.362-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
