import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

const heroSlides = [
  {
    title: "Join as a Trainee",
    description:
      "Start your fitness journey, find trainers, and achieve your goals.",
    button: "Join as a Trainee",
    image: "/your-default-image-path.jpg", // Replace with your actual image path
  },
  {
    title: "Join as a Trainer",
    description:
      "Share your expertise, connect with clients, and grow your business.",
    button: "Become a Trainer",
    image: "/your-default-image-path.jpg",
  },
  {
    title: "Join as a Facility",
    description:
      "List your gym, studio, pool, or fitness center. Attract new members and manage bookings with ease.",
    button: "List Your Facility",
    image: "/your-default-image-path.jpg",
  },
  {
    title: "Become a Vendor",
    description:
      "Sell fitness equipment, supplements, and accessories to our community.",
    button: "Start Selling",
    image: "/your-default-image-path.jpg",
  },
  {
    title: "Promote Your Event",
    description: "Advertise your fitness events and reach a wider audience.",
    button: "Promote Event",
    image: "/your-default-image-path.jpg",
  },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const slideCount = heroSlides.length;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store user data in localStorage for now
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", "member"); // Default role, could be determined by login

      setIsLoading(false);
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", `user@${provider}.com`);
      localStorage.setItem("userRole", "member");

      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const slide = heroSlides[current];

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col lg:flex-row pt-16 md:pt-20">
        {/* Left: Enhanced Hero Section */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] md:min-h-[400px] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-red-200 rounded-full opacity-20 animate-float"></div>
            <div
              className="absolute -bottom-20 -left-20 w-48 h-48 md:w-72 md:h-72 bg-orange-200 rounded-full opacity-20 animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
          <div className="vc-card vc-card-3d p-6 md:p-8 max-w-sm bg-gradient-to-br from-white to-red-50 m-4 md:m-8 text-center relative z-10">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
              {slide.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {slide.description}
            </p>
            <Link to="/signup">
              <Button className="vc-btn-primary w-full">{slide.button}</Button>
            </Link>
          </div>
          {/* Enhanced Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() =>
                setCurrent((current - 1 + slideCount) % slideCount)
              }
              className="bg-white/10 backdrop-blur-sm border border-gray-200 text-gray-600 p-2 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-1">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? "bg-red-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((current + 1) % slideCount)}
              className="bg-white/10 backdrop-blur-sm border border-gray-200 text-gray-600 p-2 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        {/* Right: Enhanced Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative">
          <div className="w-full max-w-md p-4 md:p-6">
            {/* Logo */}
            <div className="text-center mb-6 md:mb-8">
              <Link
                to="/"
                className="text-2xl md:text-3xl font-bold vc-section-header"
              >
                VIBE
                <span className="text-[color:hsl(var(--vc-red))]">CORE</span>
              </Link>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Welcome back to your wellness journey
              </p>
            </div>
            {/* Enhanced Login Card */}
            <Card className="vc-card shadow-premium border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
                  Sign In
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Access your wellness dashboard
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-4 md:p-6">
                {/* Social Login */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                    className="w-full rounded-full border-gray-300 hover:border-vibecore-red hover:text-vibecore-red disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("facebook")}
                    disabled={isLoading}
                    className="w-full rounded-full border-gray-300 hover:border-vibecore-red hover:text-vibecore-red disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with email
                    </span>
                  </div>
                </div>
                {/* Email/Password Form */}
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 rounded-full border-gray-300 focus:border-vibecore-red focus:ring-vibecore-red"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 rounded-full border-gray-300 focus:border-vibecore-red focus:ring-vibecore-red"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Forgot password link */}
                  <div className="flex justify-end mb-2">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-vibecore-red hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </Label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full py-3 disabled:opacity-50"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                  </span>
                  <Link
                    to="/signup"
                    className="text-vibecore-red hover:text-vibecore-red-hover font-medium"
                  >
                    Sign up now
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-vibecore-red hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-vibecore-red hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
