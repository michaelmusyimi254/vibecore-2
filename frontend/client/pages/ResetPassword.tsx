import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/ui/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    title: "Reset your password",
    description: "Create a new password to regain access to your account.",
    button: "Back to Login",
    image: "/your-default-image-path.jpg",
    buttonLink: "/login",
  },
  {
    title: "Keep your account secure",
    description: "Choose a strong password you haven't used before.",
    button: "Back to Login",
    image: "/your-default-image-path.jpg",
    buttonLink: "/login",
  },
];

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
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
    setError("");
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
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
        {/* Right: Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md p-6">
            {/* Logo */}
            <div className="text-center mb-8 mt-16">
              <a href="/" className="text-3xl font-bold">
                VIBE<span className="text-vibecore-red">CORE</span>
              </a>
              <p className="text-gray-600 mt-2">
                Set a new password for your account.
              </p>
            </div>
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Reset Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {submitted ? (
                  <div className="text-center space-y-4">
                    <div className="text-green-600 font-semibold text-lg">Password reset successful!</div>
                    <div className="text-gray-600 text-sm">
                      You can now <a href="/login" className="text-vibecore-red font-medium underline">sign in</a> with your new password.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <div>
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={8}
                        placeholder="Enter new password"
                        className="rounded-xl mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm">Confirm Password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                        placeholder="Re-enter new password"
                        className="rounded-xl mt-2"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                      Reset Password
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