import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Clock,
  MapPin,
  Star,
  Calendar,
  Users,
  Package,
  CreditCard,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Gift,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userRole, setUserRole] = useState<string>("trainee"); // This would come from auth
  const [userName, setUserName] = useState("Sarah"); // This would come from auth
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Mock user data - would come from authentication
  const userData = {
    name: "Sarah Johnson",
    role: "trainer", // trainee, trainer, shop_owner, event_manager
    email: "sarah@example.com",
    hasCompletedOnboarding: false,
  };

  const roleConfig = {
    trainee: {
      title: "Trainee",
      color: "bg-blue-500",
      steps: [
        { title: "Fitness Goals", icon: Star },
        { title: "Preferences", icon: Clock },
        { title: "Location", icon: MapPin },
      ],
    },
    trainer: {
      title: "Trainer",
      color: "bg-vibecore-red",
      steps: [
        { title: "Specialties", icon: Star },
        { title: "Certifications", icon: CheckCircle },
        { title: "Availability", icon: Clock },
      ],
    },
    shop_owner: {
      title: "Shop Owner",
      color: "bg-green-500",
      steps: [
        { title: "Store Category", icon: Package },
        { title: "Products", icon: Package },
        { title: "Delivery Range", icon: MapPin },
      ],
    },
    event_manager: {
      title: "Event Manager",
      color: "bg-purple-500",
      steps: [
        { title: "Event Types", icon: Calendar },
        { title: "Schedule", icon: Clock },
        { title: "Capacity", icon: Users },
      ],
    },
  };

  const plans = {
    monthly: {
      price:
        userData.role === "trainer"
          ? 29
          : userData.role === "shop_owner"
            ? 49
            : 39,
      period: "month",
    },
    yearly: {
      price:
        userData.role === "trainer"
          ? 279
          : userData.role === "shop_owner"
            ? 459
            : 379,
      period: "year",
      savings: "Save 20%",
    },
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStartFreeTrial = () => {
    setHasActivePlan(true);
    setSelectedPlan("trial");
  };

  const handlePayment = () => {
    if (paymentMethod && selectedPlan) {
      setHasActivePlan(true);
      // Handle payment processing
    }
  };

  if (hasActivePlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
        {/* Success State - Dashboard Access Granted */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to VibeCore!
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              {selectedPlan === "trial"
                ? "Your 7-day free trial has started. Complete your profile to get the most out of VibeCore."
                : "Payment successful! Your subscription is now active."}
            </p>
            <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
              Access Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              VIBE<span className="text-vibecore-red">CORE</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back,{" "}
                <span className="font-semibold">{userData.name}</span>
              </div>
              <Badge
                className={`${roleConfig[userData.role as keyof typeof roleConfig].color} text-white rounded-full`}
              >
                {roleConfig[userData.role as keyof typeof roleConfig].title}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to VibeCore, {userData.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Let's get your{" "}
            {roleConfig[
              userData.role as keyof typeof roleConfig
            ].title.toLowerCase()}{" "}
            profile set up in just 3 quick steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {roleConfig[userData.role as keyof typeof roleConfig].steps.map(
              (step, index) => {
                const StepIcon = step.icon;
                const isActive = index + 1 === currentStep;
                const isCompleted = index + 1 < currentStep;

                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? roleConfig[userData.role as keyof typeof roleConfig]
                              .color
                          : isCompleted
                            ? "bg-green-500"
                            : "bg-gray-200"
                      } text-white`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-2">
                      <div
                        className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}
                      >
                        Step {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">{step.title}</div>
                    </div>
                    {index <
                      roleConfig[userData.role as keyof typeof roleConfig].steps
                        .length -
                        1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* Onboarding Steps */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {
                roleConfig[userData.role as keyof typeof roleConfig].steps[
                  currentStep - 1
                ].title
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trainer Steps */}
            {userData.role === "trainer" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label>What are your main specialties?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Weight Loss",
                        "Strength Training",
                        "Yoga",
                        "Pilates",
                        "HIIT",
                        "Nutrition",
                        "Rehabilitation",
                        "Sports Training",
                      ].map((specialty) => (
                        <label
                          key={specialty}
                          className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm">{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label>Your Certifications</Label>
                    <Input
                      placeholder="e.g., NASM-CPT, ACE, ACSM"
                      className="rounded-xl"
                    />
                    <Label>Years of Experience</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label>Available Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Weekdays</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (6-12 PM)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12-6 PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (6-10 PM)
                            </SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">Weekends</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (6-12 PM)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12-6 PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (6-10 PM)
                            </SelectItem>
                            <SelectItem value="not-available">
                              Not Available
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Shop Owner Steps */}
            {userData.role === "shop_owner" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label>Store Category</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select your main category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">
                          Fitness Equipment
                        </SelectItem>
                        <SelectItem value="supplements">Supplements</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label>What products do you sell?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Dumbbells",
                        "Treadmills",
                        "Yoga Mats",
                        "Protein Powder",
                        "Workout Clothes",
                        "Water Bottles",
                        "Resistance Bands",
                        "Heart Rate Monitors",
                      ].map((product) => (
                        <label
                          key={product}
                          className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label>Delivery Range</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select delivery range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local (5 miles)</SelectItem>
                        <SelectItem value="city">
                          City-wide (25 miles)
                        </SelectItem>
                        <SelectItem value="regional">
                          Regional (50 miles)
                        </SelectItem>
                        <SelectItem value="national">National</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            {/* Event Manager Steps */}
            {userData.role === "event_manager" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label>What types of events do you organize?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Fitness Classes",
                        "Workshops",
                        "Competitions",
                        "Bootcamps",
                        "Yoga Retreats",
                        "Sports Tournaments",
                        "Wellness Events",
                        "Corporate Fitness",
                      ].map((event) => (
                        <label
                          key={event}
                          className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm">{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label>Event Schedule Preference</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="How often do you host events?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label>Typical Event Capacity</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select capacity range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">
                          Small (5-20 people)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (20-50 people)
                        </SelectItem>
                        <SelectItem value="large">
                          Large (50-100 people)
                        </SelectItem>
                        <SelectItem value="xlarge">
                          Extra Large (100+ people)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            {/* Trainee Steps */}
            {userData.role === "trainee" && (
              <>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label>What are your fitness goals?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Weight Loss",
                        "Muscle Gain",
                        "Improve Endurance",
                        "Increase Flexibility",
                        "Build Strength",
                        "General Fitness",
                        "Rehabilitation",
                        "Sports Performance",
                      ].map((goal) => (
                        <label
                          key={goal}
                          className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label>Preferred Workout Times</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="When do you prefer to workout?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early-morning">
                          Early Morning (5-8 AM)
                        </SelectItem>
                        <SelectItem value="morning">
                          Morning (8-11 AM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12-5 PM)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (5-8 PM)
                        </SelectItem>
                        <SelectItem value="night">Night (8-11 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label>Location Preferences</Label>
                    <Input
                      placeholder="Enter your city or area"
                      className="rounded-xl"
                    />
                    <Label>Workout Environment</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Where do you prefer to workout?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gym">Traditional Gym</SelectItem>
                        <SelectItem value="studio">Fitness Studio</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="home">Home/Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === 3}
                className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Summary & Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Package Summary */}
          <Card className="shadow-lg border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-vibecore-red" />
                Your Package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <Timer className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">
                    7-Day Free Trial
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Try all premium features risk-free. Cancel anytime during your
                  trial.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">What's included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Complete profile setup
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Advanced booking system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Analytics dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Customer support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Mobile app access
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-sm text-gray-600">After trial:</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${plans.monthly.price}
                  <span className="text-sm font-normal">/month</span>
                </div>
                <div className="text-sm text-green-600">
                  {plans.yearly.savings} with yearly plan
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="shadow-lg border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gray-600" />
                Unlock Your Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Free Trial Option */}
              <Button
                onClick={handleStartFreeTrial}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg"
              >
                Start 7-Day Free Trial
              </Button>

              <div className="text-center text-gray-500 text-sm">or</div>

              {/* Payment Plans */}
              <div className="space-y-3">
                <Label>Choose a plan:</Label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="plan"
                        value="monthly"
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Monthly</div>
                        <div className="text-sm text-gray-500">
                          ${plans.monthly.price}/month
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="plan"
                        value="yearly"
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Yearly</div>
                        <div className="text-sm text-gray-500">
                          ${plans.yearly.price}/year
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 rounded-full">
                      {plans.yearly.savings}
                    </Badge>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <Label>Payment Method:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex items-center justify-center p-4 border rounded-xl ${
                      paymentMethod === "mpesa"
                        ? "border-vibecore-red bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    M-Pesa
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-center p-4 border rounded-xl ${
                      paymentMethod === "card"
                        ? "border-vibecore-red bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Card
                  </button>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!selectedPlan || !paymentMethod}
                className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-xl py-3"
              >
                Pay & Access Dashboard
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Secure payment. Cancel anytime. No setup fees.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Access Blocked Notice */}
        <Card className="mt-6 border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start">
              <Lock className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">
                  Dashboard Access Required
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Complete your profile setup and start your free trial or
                  subscribe to access your VibeCore dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
