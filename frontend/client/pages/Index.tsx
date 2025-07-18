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

// Feature card data for left column (trainer-style)
const featureCards = [
  {
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=600",
    featured: true,
    name: "Sharukh Kahn",
    role: "Gym Trainer",
    rating: 5,
    reviews: 5678,
    price: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=600",
    featured: false,
    name: "Kanae Asakura",
    role: "Nutrition Trainer",
    rating: 5,
    reviews: 9101,
    price: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=600",
    featured: false,
    name: "Alex Saint-Mleux",
    role: "Gym Trainer",
    rating: 5,
    reviews: 1121,
    price: 12,
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=600",
    featured: false,
    name: "Juminten Wasingten",
    role: "Yoga Trainer",
    rating: 5,
    reviews: 3141,
    price: 12,
  },
];

const ctaCards = [
  {
    title: "Become a Coach",
    desc: "Share your expertise and grow your coaching business",
    btn: "Get Started",
    btnClass: "vc-btn-primary",
  },
  {
    title: "List Your Venue",
    desc: "Showcase your space and attract new members",
    btn: "List Venue",
    btnClass: "vc-btn-secondary",
  },
  {
    title: "Sell Products",
    desc: "Reach more customers with our marketplace",
    btn: "Start Selling",
    btnClass: "vc-btn-secondary",
  },
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
  const [featureIdx, setFeatureIdx] = useState(0);
  const [ctaIdx, setCtaIdx] = useState(0);

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

  // Set default location without external API calls
  useEffect(() => {
    setUserLocation("Sigona ward");
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

  // Auto-slide logic
  useEffect(() => {
    const featureInterval = setInterval(() => {
      setFeatureIdx((prev) => (prev + 1) % featureCards.length);
    }, 4000);
    const ctaInterval = setInterval(() => {
      setCtaIdx((prev) => (prev + 1) % ctaCards.length);
    }, 4000);
    return () => {
      clearInterval(featureInterval);
      clearInterval(ctaInterval);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <NavBar />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center overflow-hidden">
<<<<<<< HEAD
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2F89b2ce336c1e469faf0b11a3b6d20bdd%2Fd753390aadd949fca87f57d0eb199371)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
=======
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
>>>>>>> 6e27c2b4a1e91adae6571b8de00d065b2031eb57
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

<<<<<<< HEAD
        <div
          className="vc-container relative z-10 pt-24 md:pt-32 flex flex-col items-center justify-center min-h-[790px]"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
=======
        <div className="vc-container relative z-10 pt-24 md:pt-32 flex flex-col items-center justify-center min-h-[80vh]">
>>>>>>> 6e27c2b4a1e91adae6571b8de00d065b2031eb57
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center w-full">
            <div className="flex flex-col items-start w-full space-y-8">
              <div className="animate-slide-up">
                <h1 className="vc-heading-1 text-responsive-xl mb-6 leading-tight text-gray-900">
<<<<<<< HEAD
                  <span style={{ color: "rgb(255, 255, 255)" }}>
                    Your AI-Powered
                  </span>
                  <span className="text-gradient block">Wellness Platform</span>
                </h1>
                <p
                  className="vc-body-large mb-8 max-w-lg"
                  style={{ color: "rgba(255, 255, 255, 1)" }}
                >
=======
                  Your AI-Powered
                  <span className="text-gradient block">Wellness Platform</span>
                </h1>
                <p className="vc-body-large text-gray-600 mb-8 max-w-lg">
>>>>>>> 6e27c2b4a1e91adae6571b8de00d065b2031eb57
                  Connect with certified coaches, discover premium venues, and
                  transform your wellness journey with intelligent AI
                  recommendations.
                </p>
              </div>

              {/* AI-Enhanced Search Form */}
              <div className="space-y-6 w-full max-w-lg animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full border border-purple-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(208, 2, 27, 1)" }}
                    >
                      ✨ AI-Powered Search
                    </span>
                  </div>
                  {userLocation && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span style={{ color: "rgba(255, 255, 255, 1)" }}>
                        {userLocation}
                      </span>
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderColor: "rgba(0, 0, 0, 0)",
                      }}
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
                          <span style={{ color: "rgba(208, 2, 27, 1)" }}>
                            Ask Me
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {!searchQuery && !searching && !awaitingClarification && (
                    <div
                      className="mt-4 space-y-2"
                      style={{ color: "rgba(255, 255, 255, 1)" }}
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span style={{ color: "rgba(255, 255, 255, 1)" }}>
                          AI suggests:{" "}
                        </span>
                        <span
                          className="font-medium animate-fade-in"
                          style={{
                            color: "rgba(255, 255, 255, 1)",
                            fontStyle: "italic",
                            fontSize: "15px",
                          }}
                        >
                          {exampleSearches[exampleIdx]}
                        </span>
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(255, 255, 255, 1)" }}
                      >
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
                          ���� Continue with AI
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              <div className="space-y-4">
                <p
                  className="font-medium"
                  style={{ color: "rgba(255, 255, 255, 1)" }}
                >
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

            <div
              className="flex justify-center lg:justify-end"
              style={{ paddingLeft: "24px" }}
            >
              <div className="relative max-w-md w-full h-96 rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F89b2ce336c1e469faf0b11a3b6d20bdd%2Fd753390aadd949fca87f57d0eb199371"
                  alt="Fitness training session"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="font-bold text-xl mb-2">{slide.title}</h3>
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
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

            <div className="flex items-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-red-500 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
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

<<<<<<< HEAD
      {/* Two-Column Features with Images and Floating Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col relative mt-5">
            <div className="gap-5 flex max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col relative min-h-[100px] p-5">
                  <section className="flex flex-col relative min-h-[100px] p-5 w-full self-stretch grow max-w-[1200px] mx-auto">
                    <div className="mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex flex-col">
                        <span className="mr-auto">Everything you need for</span>
                        <span className="text-red-500 mr-auto">
                          wellness success
                        </span>
                      </h2>
                      <p className="text-gray-600 text-lg max-w-2xl mr-auto text-left">
                        AI-powered platform with seamless booking and premium
                        experiences
                      </p>
                    </div>

                    <div className="mb-[149px]">
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl h-64">
                          <img
                            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
                            alt="Personal trainer with client"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                              <div className="flex text-yellow-400 text-sm">
                                ⭐⭐⭐⭐⭐{" "}
                                <span className="text-white ml-1">
                                  4.9 (324)
                                </span>
                              </div>
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                              AI Coach Matching
                            </h3>
                            <p className="text-white/90 text-sm">
                              Smart recommendations & instant booking with
                              certified professionals
                            </p>
                            <div className="mt-3 text-white/80 text-xs">
                              From $25/hour
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

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
                  </section>
                </div>
              </div>
              <div className="flex flex-col w-6/12 ml-5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col relative min-h-[100px] p-5">
                  <section className="flex flex-col relative min-h-[100px] p-5 w-full self-stretch grow max-w-[1200px] mx-auto">
                    {/* Right column content will be added here */}
                  </section>
                </div>
              </div>
            </div>
          </div>

          {/* Compact CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto mt-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to get started?
              </h3>
              <p className="text-gray-600">
                Choose your path in the wellness community
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <Link to="/signup" className="group">
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-red-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <h4 className="font-semibold text-lg mb-2">Become a Coach</h4>
                  <p className="text-gray-600 text-sm">
                    Share your expertise and grow your coaching business
                  </p>
                </div>
              </Link>

              <Link to="/signup" className="group">
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <h4 className="font-semibold text-lg mb-2">
                    List Your Venue
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Showcase your space and attract new members
                  </p>
                </div>
              </Link>

              <Link to="/signup" className="group">
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <h4 className="font-semibold text-lg mb-2">Sell Products</h4>
                  <p className="text-gray-600 text-sm">
                    Reach more customers with our marketplace
                  </p>
                </div>
              </Link>
=======
      {/* Featured Trainers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Our choice of{" "}
                <span className="text-red-500">Personal Trainer</span>
              </h2>
            <p className="text-gray-600">
                Top-rated certified professionals ready to transform your
                fitness journey
              </p>
            </div>
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
              See All
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Trainer 1 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
                  alt="Marcus Rodriguez - Personal Trainer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">5 (167)</span>
                  </div>
                  <h3 className="font-bold text-lg">Marcus Rodriguez</h3>
                  <p className="text-white/80 text-sm mb-2">
                    Strength & Conditioning Coach
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      $32<span className="text-sm font-normal">/hour</span>
                    </span>
                    <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                      Available Now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trainer 2 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 right-4 z-10">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=400&q=80"
                  alt="Sarah Chen - Yoga Instructor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">4.9 (203)</span>
                  </div>
                  <h3 className="font-bold text-lg">Sarah Chen</h3>
                  <p className="text-white/80 text-sm mb-2">
                    Yoga & Mindfulness Expert
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      $28<span className="text-sm font-normal">/hour</span>
                    </span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              </div>

            {/* Trainer 3 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 right-4 z-10">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80"
                  alt="Alex Thompson - HIIT Specialist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">4.8 (145)</span>
                  </div>
                  <h3 className="font-bold text-lg">Alex Thompson</h3>
                  <p className="text-white/80 text-sm mb-2">
                    HIIT & Cardio Specialist
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      $35<span className="text-sm font-normal">/hour</span>
                    </span>
                    <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">
                      Busy
                    </span>
                  </div>
                </div>
              </div>
              </div>

            {/* Trainer 4 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 right-4 z-10">
                <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative h-80">
                <img
                  src="https://images.unsplash.com/photo-1506629905496-7d4d7f67ba5c?auto=format&fit=crop&w=400&q=80"
                  alt="Emma Wilson - Pilates Instructor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">5.0 (98)</span>
                  </div>
                  <h3 className="font-bold text-lg">Emma Wilson</h3>
                  <p className="text-white/80 text-sm mb-2">
                    Pilates & Core Strength
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      $30<span className="text-sm font-normal">/hour</span>
                    </span>
                    <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Getting Started is <span className="text-red-500">Simple!</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Easy step to start your workout journey with our AI-powered
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-64 h-80 mx-auto bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80"
                    alt="Download VibeCore App"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">VibeCore</h4>
                          <div className="flex text-yellow-400 text-xs">
                            ★★★★★{" "}
                            <span className="text-gray-600 ml-1">4.8</span>
                          </div>
                        </div>
                        <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          GET
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Download The App
              </h3>
              <p className="text-gray-600 text-sm">
                You can download the App from App Store or Google Play Store
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-64 h-80 mx-auto bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&q=80"
                    alt="Create personalized account"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex flex-col">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-lg text-gray-900">
                        Create Account
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Tell us about your fitness goals
                      </p>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="text-xs text-gray-500">
                          Fitness Level
                        </div>
                        <div className="text-sm font-medium">Beginner</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="text-xs text-gray-500">
                          Preferred Workout
                        </div>
                        <div className="text-sm font-medium">
                          Strength Training
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Goals</div>
                        <div className="text-sm font-medium">Build Muscle</div>
                      </div>
                    </div>
                    <button className="bg-red-500 text-white py-2 rounded-lg text-sm font-semibold mt-4">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Create and Personalized
              </h3>
              <p className="text-gray-600 text-sm">
                Create your account and start personalized you preferences!
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-64 h-80 mx-auto bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80"
                    alt="Start your workout"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">
                          TODAY'S WORKOUT
                        </span>
                        <span className="text-xs text-gray-500">45 MIN</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">
                        Upper Body Strength
                      </h4>
                      <div className="bg-gray-200 rounded-full h-1 mb-2">
                        <div className="bg-red-500 h-1 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-xs text-gray-600">
                        3 of 4 exercises complete
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-red-500 text-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold">78%</div>
                      <div className="text-xs">Workout Complete</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Start Your Workout!
              </h3>
              <p className="text-gray-600 text-sm">
                Choose the workout based on your preferences
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-64 h-80 mx-auto bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=300&q=80"
                    alt="Analyze and repeat progress"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-lg text-gray-900">
                        Weekly Progress
                      </h4>
                      <p className="text-gray-600 text-xs">
                        You're crushing your goals!
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Workouts</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-500">
                            5
                          </span>
                          <span className="text-xs text-gray-500">/5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Calories</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-500">
                            2,340
                          </span>
                          <span className="text-xs text-gray-500">kcal</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Time</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-500">
                            4.2
                          </span>
                          <span className="text-xs text-gray-500">hrs</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-100 rounded-lg p-2 text-center">
                      <span className="text-green-600 text-xs font-semibold">
                        🎉 Goal Achieved!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Analyze and Repeat!
              </h3>
              <p className="text-gray-600 text-sm">
                Gain valuable insights into your progress and performance
              </p>
>>>>>>> 6e27c2b4a1e91adae6571b8de00d065b2031eb57
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
