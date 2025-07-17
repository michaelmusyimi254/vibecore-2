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
import { useState, useEffect, useRef } from "react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import BlurText from "../../yes/BlurText/BlurText.jsx";

const heroSlides = [
  {
    title: "Start Your Wellness Journey",
    description:
      "Connect with certified trainers, discover fitness programs, and transform your lifestyle.",
    button: "Join as Member",
    icon: "🌟",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Empower Others as a Coach",
    description:
      "Share your expertise, build meaningful connections, and grow your coaching business.",
    button: "Become a Coach",
    icon: "💪",
    gradient: "from-green-500 to-teal-600",
  },
  {
    title: "Showcase Your Studio",
    description:
      "List your fitness facility, attract new members, and manage bookings seamlessly.",
    button: "List Your Studio",
    icon: "🏋️",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Sell Premium Products",
    description:
      "Offer high-quality fitness gear, supplements, and wellness products to our community.",
    button: "Start Selling",
    icon: "🛍️",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Host Amazing Events",
    description:
      "Create unforgettable fitness experiences and connect with wellness enthusiasts.",
    button: "Create Events",
    icon: "🎯",
    gradient: "from-indigo-500 to-blue-600",
  },
];

const exampleSearches = [
  "yoga classes near me",
  "affordable gyms with pool",
  "personal trainers for weight loss",
  "zumba events this weekend",
  "nutritionists in Nairobi",
  "HIIT bootcamps",
  "pilates studios open now",
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const slideCount = heroSlides.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [awaitingClarification, setAwaitingClarification] = useState(false);
  const [clarification, setClarification] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const inputRef = useRef(null);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExampleIdx((prev) => (prev + 1) % exampleSearches.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Get browser location (city/region if possible)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Use a free reverse geocoding API (e.g., Nominatim)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();
          setUserLocation(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              "your area",
          );
        } catch {
          setUserLocation("your area");
        }
      });
    }
  }, []);

  const followUpPrompts = [
    (region) =>
      `Hmm, just to be sure—are you looking for yoga classes, yoga trainers, or something else in ${region}?`,
    (region) =>
      `Could you clarify if you want a class, a trainer, or a facility in ${region}?`,
    (region) =>
      `Just checking—do you mean a group class, a private session, or something else in ${region}?`,
    (region) =>
      `I want to get this right! Are you after a class, a trainer, or a gym in ${region}?`,
  ];
  const friendlyClarifyResponses = [
    "Ah, I see what you mean! Let’s get you the best options.",
    "Crystal clear, let me find that for you!",
    "Got it! Searching for the best matches now…",
    "Thanks for clarifying! One moment…",
  ];
  const errorMessages = [
    "Oops! Something went wrong. Please try again in a moment.",
    "Sorry, I couldn't connect to the search service. Please check your connection and try again.",
    "Hmm, I had trouble searching. Want to try again?",
  ];

  // Add a simple spinner component
  function DotsLoader() {
    return (
      <div className="flex justify-center items-center py-2 space-x-1">
        <span
          className="block w-2 h-2 bg-vibecore-red rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></span>
        <span
          className="block w-2 h-2 bg-vibecore-red rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="block w-2 h-2 bg-vibecore-red rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    );
  }

  async function handleSearch(query) {
    setSearching(true);
    setSearchError(false);
    setAiMessage("Thinking… Let me help you find the best options!");
    try {
      const res = await fetch("http://localhost:8001/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, region: userLocation }),
      });
      if (!res.ok) throw new Error("AI API error");
      const data = await res.json();
      const topLabel = data.labels[0];
      const topScore = data.scores[0];
      let region = userLocation || "your area";
      if (topScore < 0.5) {
        const followUp =
          followUpPrompts[Math.floor(Math.random() * followUpPrompts.length)](
            region,
          );
        setAiMessage(followUp);
        setAwaitingClarification(true);
        setSearching(false);
        return;
      }
      setAiMessage(`Let's see what we have for ${topLabel} in ${region}…`);
      setTimeout(() => {
        window.location.href = `/search?type=${encodeURIComponent(topLabel)}&region=${encodeURIComponent(region)}`;
      }, 1200);
    } catch (err) {
      setAiMessage(
        errorMessages[Math.floor(Math.random() * errorMessages.length)],
      );
      setSearchError(true);
      setSearching(false);
    }
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  }

  function handleClarificationSubmit(e) {
    e.preventDefault();
    setAiMessage(
      friendlyClarifyResponses[
        Math.floor(Math.random() * friendlyClarifyResponses.length)
      ],
    );
    setTimeout(() => {
      handleSearch(clarification);
      setAwaitingClarification(false);
      setClarification("");
    }, 1000);
  }

  const slide = heroSlides[current];
  const backgroundImage = "url('/your-default-image-path.jpg')"; // Replace with the correct path to your uploaded image

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <NavBar />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full opacity-20 animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
        <div className="vc-container relative z-10 pt-24 md:pt-32 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center w-full">
            <div className="flex flex-col items-start w-full space-y-8">
              <div className="animate-slide-up">
                <h1 className="vc-heading-1 text-responsive-xl mb-6 leading-tight text-gray-900">
                  Your Complete
                  <span className="text-gradient block">Wellness Platform</span>
                </h1>
                <p className="vc-body-large text-gray-600 mb-8 max-w-lg">
                  Connect with certified coaches, discover premium studios, and
                  transform your wellness journey with our comprehensive
                  platform.
                </p>
              </div>
              {/* Enhanced Search Form */}
              <div className="space-y-6 w-full max-w-lg animate-fade-in">
                {userLocation && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Searching in {userLocation}</span>
                  </div>
                )}
                <form
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchQuery);
                  }}
                >
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      placeholder={
                        searching || awaitingClarification
                          ? ""
                          : "What wellness service are you looking for?"
                      }
                      className="vc-input h-14 text-lg pr-32 shadow-premium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      disabled={searching || awaitingClarification}
                    />
                    <button
                      type="submit"
                      className="vc-btn-primary absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 text-sm"
                      disabled={searching || awaitingClarification}
                    >
                      {searching ? "Searching..." : "Search"}
                    </button>
                  </div>
                  {/* Rotating example search below input */}
                  {!searchQuery && !searching && !awaitingClarification && (
                    <div className="mt-3 text-sm text-gray-500 animate-fade-in">
                      <span className="text-gray-400">Try: </span>
                      <span className="text-red-500 font-medium">
                        {exampleSearches[exampleIdx]}
                      </span>
                    </div>
                  )}
                </form>
                {searching && !searchError && (
                  <div className="vc-glass p-6 rounded-xl animate-scale-in">
                    <DotsLoader />
                    <div className="text-gray-700 text-center py-2 animate-fade-in font-medium">
                      {aiMessage}
                    </div>
                  </div>
                )}
                {searchError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl animate-scale-in">
                    <p className="mb-3">{aiMessage}</p>
                    <Button
                      className="vc-btn-primary w-full"
                      onClick={() => handleSearch(searchQuery)}
                    >
                      Try Again
                    </Button>
                  </div>
                )}
                {awaitingClarification && (
                  <form
                    onSubmit={handleClarificationSubmit}
                    className="vc-glass p-6 rounded-xl space-y-4 animate-scale-in"
                  >
                    <p className="text-gray-700 font-medium">{aiMessage}</p>
                    <Input
                      placeholder="Please clarify your search..."
                      value={clarification}
                      onChange={(e) => setClarification(e.target.value)}
                      className="vc-input"
                    />
                    <Button type="submit" className="vc-btn-primary w-full">
                      Continue Search
                    </Button>
                  </form>
                )}
              </div>
              {/* Popular searches */}
              <div className="space-y-4">
                <p className="text-gray-600 font-medium">
                  Popular in your area
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Yoga",
                    "Personal Training",
                    "Pilates",
                    "HIIT",
                    "Zumba",
                    "Meditation",
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        handleSearch(tag);
                      }}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Enhanced Card Slider */}
            <div className="flex justify-center lg:justify-end">
              <div
                className={`vc-card vc-card-3d p-8 max-w-md bg-gradient-to-br ${slide.gradient} text-white shadow-premium transition-all duration-700 relative overflow-hidden`}
              >
                {/* Background Icon */}
                <div className="absolute top-4 right-4 text-6xl opacity-10">
                  {slide.icon}
                </div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{slide.icon}</div>
                  <h3 className="font-bold text-xl mb-3">{slide.title}</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                  <Link to="/signup">
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                      {slide.button}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced Navigation */}
          <div className="flex justify-center mt-12 space-x-6">
            <button
              onClick={() =>
                setCurrent((current - 1 + slideCount) % slideCount)
              }
              className="bg-white/10 backdrop-blur-sm border border-gray-200 text-gray-600 p-3 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300 hover:scale-110"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-red-500 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((current + 1) % slideCount)}
              className="bg-white/10 backdrop-blur-sm border border-gray-200 text-gray-600 p-3 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300 hover:scale-110"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Platform Features Section with Left-Aligned Layout */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <span className="text-vibecore-red font-bold text-2xl uppercase tracking-wider block mb-2">
              Platform Features
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why VibeCore?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl">
              All-in-one platform for fitness, wellness, and community.
              Discover, connect, and grow with tools designed for every step of
              your journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="flex flex-col items-start">
              <div className="bg-vibecore-red/10 text-vibecore-red rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-2xl font-bold mb-2">Find & Book Experts</h3>
              <p className="text-gray-600 text-base">
                Browse trainers, nutritionists, and wellness pros. Book
                sessions, classes, or consultations in a few taps.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-blue-500/10 text-blue-600 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-2xl font-bold mb-2">
                Facility & Class Discovery
              </h3>
              <p className="text-gray-600 text-base">
                Find gyms, studios, pools, and classes near you. Filter by
                amenities, schedule, and reviews.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-green-500/10 text-green-600 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
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
              <h3 className="text-2xl font-bold mb-2">Shop Fitness Gear</h3>
              <p className="text-gray-600 text-base">
                Buy equipment, supplements, and apparel from trusted vendors.
                Exclusive deals for members.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-yellow-400/10 text-yellow-500 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8h-4m-4 0H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Events & Community</h3>
              <p className="text-gray-600 text-base">
                Join bootcamps, workshops, and wellness events. Connect, share,
                and grow with the VibeCore community.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-purple-500/10 text-purple-600 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 018 0v2M5 21v-2a4 4 0 018 0v2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Analytics & Insights</h3>
              <p className="text-gray-600 text-base">
                Track your progress, bookings, and earnings. Get actionable
                insights to grow your business or fitness journey.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-pink-500/10 text-pink-600 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8h-4m-4 0H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">AI-Driven Search</h3>
              <p className="text-gray-600 text-base">
                Type what you want—our AI guides you to the right trainers,
                classes, or products. Natural, human-like search experience.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-gray-800/10 text-gray-800 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 10V5a3 3 0 00-6 0v5m6 0a3 3 0 01-6 0"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-base">
                Your data is protected. We use best-in-class security and
                privacy practices for all users.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-orange-500/10 text-orange-600 rounded-xl p-4 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 10v4m8-8h-4m-4 0H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Marketing Tools</h3>
              <p className="text-gray-600 text-base">
                Promote your services, events, or products with built-in
                marketing and featured listing tools.
              </p>
            </div>
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
