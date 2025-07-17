import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Star,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const welcomeSteps = [
  {
    id: 1,
    title: "Welcome to VibeCore!",
    subtitle: "Your wellness journey starts here",
    icon: Sparkles,
    content:
      "You've successfully joined the VibeCore community! Let's get you started with a quick tour.",
    animation: "animate-bounce",
  },
  {
    id: 2,
    title: "Discover Amazing Coaches",
    subtitle: "Find your perfect wellness match",
    icon: Users,
    content:
      "Browse through hundreds of certified coaches, trainers, and wellness experts ready to help you achieve your goals.",
    animation: "animate-pulse",
  },
  {
    id: 3,
    title: "Book Sessions Instantly",
    subtitle: "Easy scheduling at your fingertips",
    icon: Calendar,
    content:
      "Schedule sessions, classes, and consultations with just a few taps. Your calendar, your way.",
    animation: "animate-bounce",
  },
  {
    id: 4,
    title: "Track Your Progress",
    subtitle: "Watch yourself grow stronger",
    icon: Trophy,
    content:
      "Monitor your wellness journey with detailed progress tracking, achievements, and personalized insights.",
    animation: "animate-pulse",
  },
  {
    id: 5,
    title: "Join the Community",
    subtitle: "Connect with like-minded people",
    icon: Heart,
    content:
      "Share your journey, get motivated, and celebrate wins with our supportive wellness community.",
    animation: "animate-bounce",
  },
];

export default function Welcome() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userRole = searchParams.get("role") || "member";

  useEffect(() => {
    setProgress((currentStep / welcomeSteps.length) * 100);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < welcomeSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete walkthrough, redirect to dashboard
      navigate("/dashboard");
    }
  };

  const skipTour = () => {
    navigate("/dashboard");
  };

  const currentStepData = welcomeSteps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {welcomeSteps.length}
            </span>
            <button
              onClick={skipTour}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip tour
            </button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card
          className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
          style={{
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.transform =
              "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.transform =
              "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
          }}
        >
          <CardContent className="p-12 text-center">
            {/* Icon */}
            <div className={`mb-8 ${currentStepData.animation}`}>
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-vibecore-red to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <currentStepData.icon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentStepData.title}
              </h1>
              <p className="text-xl text-vibecore-red font-semibold mb-6">
                {currentStepData.subtitle}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                {currentStepData.content}
              </p>
            </div>

            {/* Role Badge */}
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-lg capitalize">
                {userRole.replace("-", " ")} Account
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentStep < welcomeSteps.length ? (
                <>
                  <Button
                    onClick={nextStep}
                    className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={skipTour}
                    variant="outline"
                    className="px-8 py-3 text-lg rounded-full border-2 hover:scale-105 transition-all duration-300"
                  >
                    Skip to Dashboard
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-vibecore-red to-pink-500 hover:from-vibecore-red-hover hover:to-pink-600 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Target className="w-6 h-6 mr-3" />
                  Start Your Journey
                  <Sparkles className="w-6 h-6 ml-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {welcomeSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index + 1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                index + 1 <= currentStep
                  ? "bg-vibecore-red"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Features Preview */}
        {currentStep === welcomeSteps.length && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Find Coaches",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Calendar,
                title: "Book Sessions",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Star,
                title: "Track Progress",
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/60 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 mx-auto bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
