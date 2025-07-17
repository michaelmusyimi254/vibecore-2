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
      "Connect with certified coaches, discover wellness programs, and transform your lifestyle.",
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
    title: "Showcase Your Venue",
    description:
      "List your wellness venue, attract new members, and manage bookings seamlessly.",
    button: "List Your Venue",
    icon: "🏋️",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Sell Premium Products",
    description:
      "Offer high-quality wellness gear, supplements, and lifestyle products to our community.",
    button: "Start as Brand Seller",
    icon: "🛍️",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Curate Amazing Events",
    description:
      "Create unforgettable wellness experiences and connect with health enthusiasts.",
    button: "Become Event Curator",
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
    "Ah, I see what you mean! Let's get you the best options.",
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
                  Your AI-Powered
                  <span className="text-gradient block">Wellness Platform</span>
                </h1>
                <p className="vc-body-large text-gray-600 mb-8 max-w-lg">
                  Connect with certified coaches, discover premium venues, and
                  transform your wellness journey with intelligent AI
                  recommendations.
                </p>
              </div>
              {/* AI-Enhanced Search Form */}
              <div className="space-y-6 w-full max-w-lg animate-fade-in">
                {/* AI Indicator Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full border border-purple-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-purple-700">
                      ✨ AI-Powered Search
                    </span>
                  </div>
                  {userLocation && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{userLocation}</span>
                    </div>
                  )}
                </div>
                <form
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(searchQuery);
                  }}
                >
                  <div className="relative group">
                    {/* AI Search Icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      {searching && (
                        <div className="flex space-x-1">
                          <div
                            className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      )}
                    </div>

                    <Input
                      ref={inputRef}
                      placeholder={
                        searching || awaitingClarification
                          ? "🤖 AI is analyzing your request..."
                          : "Ask me anything about wellness services..."
                      }
                      className="vc-input h-16 text-lg pl-16 pr-36 shadow-premium border-2 border-transparent group-hover:border-purple-200 focus:border-purple-300 bg-gradient-to-r from-white to-purple-50/30"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      disabled={searching || awaitingClarification}
                    />

                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                      disabled={searching || awaitingClarification}
                    >
                      {searching ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>AI Thinking...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          <span>Ask AI</span>
                        </>
                      )}
                    </button>
                  </div>
                  {/* AI-Powered Example Suggestions */}
                  {!searchQuery && !searching && !awaitingClarification && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-400">AI suggests: </span>
                        <span className="text-purple-600 font-medium animate-fade-in">
                          {exampleSearches[exampleIdx]}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        💡 Our AI understands natural language - just type what
                        you're looking for!
                      </div>
                    </div>
                  )}
                </form>
                {searching && !searchError && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-xl animate-scale-in">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <span className="font-semibold text-purple-700">
                        🤖 AI Assistant
                      </span>
                    </div>
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
                    className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-xl space-y-4 animate-scale-in"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-purple-700 font-medium mb-3">
                          {aiMessage}
                        </p>
                        <Input
                          placeholder="Help me understand better..."
                          value={clarification}
                          onChange={(e) => setClarification(e.target.value)}
                          className="vc-input mb-3"
                        />
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white w-full"
                        >
                          🤖 Continue with AI
                        </Button>
                      </div>
                    </div>
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
                    "Yoga Coaches",
                    "Personal Trainers",
                    "Pilates Studios",
                    "HIIT Programs",
                    "Wellness Coaches",
                    "Meditation Centers",
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

      {/* Modern Platform Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                Platform Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                VibeCore
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your complete wellness ecosystem designed for the modern world
            </p>
          </div>

          {/* Modern Card Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="vc-card vc-card-hover p-6 text-center group animate-slide-up">
              <div className="bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Find & Book Experts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with certified coaches, nutritionists, and wellness
                professionals. Book sessions seamlessly.
              </p>
            </div>
            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Discover Venues
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore premium gyms, studios, and wellness centers. Filter by
                amenities and location.
              </p>
            </div>
            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Premium Marketplace
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shop high-quality fitness gear, supplements, and wellness
                products from trusted vendors.
              </p>
            </div>
            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 10V5a3 3 0 00-6 0v5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Events & Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join exclusive wellness events, workshops, and build meaningful
                connections with like-minded individuals.
              </p>
            </div>
            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Smart Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track progress, bookings, and performance with intelligent
                insights and actionable data.
              </p>
            </div>

            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                AI-Powered Search
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Natural language search that understands your needs and connects
                you instantly.
              </p>
            </div>

            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Enterprise Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Bank-level security with end-to-end encryption protecting your
                personal and business data.
              </p>
            </div>

            <div
              className="vc-card vc-card-hover p-6 text-center group animate-slide-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Marketing Suite
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in promotional tools, featured listings, and marketing
                automation for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="vc-section bg-gradient-to-br from-white via-red-50 to-orange-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-red-200 rounded-full animate-float"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="vc-container relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Join Our Community
            </span>
            <h2 className="vc-heading-2 text-responsive-lg mb-6">
              Ready to Transform Your
              <span className="text-gradient">Wellness Journey</span>?
            </h2>
            <p className="vc-body-large max-w-2xl mx-auto">
              Choose your path and start building meaningful connections in the
              wellness community today.
            </p>
          </div>

          {/* Mobile Scrollable, Desktop Grid */}
          <div className="overflow-x-auto md:overflow-visible">
            <div
              className="flex md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-4 md:pb-0"
              style={{ minWidth: "900px" }}
            >
              {/* Coach Card */}
              <div className="vc-card vc-card-3d p-8 text-center bg-gradient-to-br from-white to-red-50 min-w-[300px] md:min-w-0 animate-slide-up">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
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
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Become a Coach
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share your expertise, build meaningful client relationships,
                  and grow your wellness coaching business with our
                  comprehensive platform.
                </p>
                <Link to="/signup">
                  <Button className="vc-btn-primary w-full hover:scale-105 transition-transform duration-300">
                    Start Coaching
                  </Button>
                </Link>
              </div>

              {/* Venue Card */}
              <div
                className="vc-card vc-card-3d p-8 text-center bg-gradient-to-br from-white to-blue-50 min-w-[300px] md:min-w-0 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
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
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  List Your Venue
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Showcase your wellness venue to thousands of wellness
                  enthusiasts. Manage bookings and grow your member community.
                </p>
                <Link to="/signup">
                  <Button className="vc-btn-secondary w-full hover:scale-105 transition-transform duration-300">
                    Join as Venue
                  </Button>
                </Link>
              </div>

              {/* Brand Seller Card */}
              <div
                className="vc-card vc-card-3d p-8 text-center bg-gradient-to-br from-white to-green-50 min-w-[300px] md:min-w-0 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl mx-auto mb-6 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
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
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Sell Premium Products
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Reach thousands of wellness enthusiasts with your high-quality
                  fitness gear, supplements, and lifestyle products.
                </p>
                <Link to="/signup">
                  <Button className="vc-btn-secondary w-full hover:scale-105 transition-transform duration-300">
                    Start Selling
                  </Button>
                </Link>
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
