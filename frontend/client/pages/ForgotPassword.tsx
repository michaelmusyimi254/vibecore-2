import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/ui/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    title: "Forgot your password?",
    description: "No worries! Enter your email and we'll send you a reset link.",
    button: "Back to Login",
    image: "/your-default-image-path.jpg",
    buttonLink: "/login",
  },
  {
    title: "Reset securely",
    description: "We use secure, time-limited links to keep your account safe.",
    button: "Back to Login",
    image: "/your-default-image-path.jpg",
    buttonLink: "/login",
  },
];

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const slideCount = heroSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount]);

  const slide = heroSlides[current];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Sliding Image and Card */}
        <div
          className="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('${slide.image}')`,
          }}
        >
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl max-w-md text-white m-8">
            <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
            <p className="mb-4">{slide.description}</p>
            <a href={slide.buttonLink} className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-6 py-2 rounded-full inline-block">
              {slide.button}
            </a>
          </div>
          {/* Arrows for manual navigation */}
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
        {/* Right: Forgot Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md p-6">
            {/* Logo */}
            <div className="text-center mb-8 mt-16">
              <a href="/" className="text-3xl font-bold">
                VIBE<span className="text-vibecore-red">CORE</span>
              </a>
              <p className="text-gray-600 mt-2">
                Trouble signing in? Reset your password below.
              </p>
            </div>
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {submitted ? (
                  <div className="text-center space-y-4">
                    <div className="text-green-600 font-semibold text-lg">Check your email!</div>
                    <div className="text-gray-600 text-sm">
                      If an account exists for <span className="font-medium">{email}</span>, you'll receive a password reset link shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="you@email.com"
                        className="rounded-xl mt-2"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                      Send Reset Link
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 