import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Building2,
  ShoppingBag,
  Check,
  Upload,
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Award,
  MapPin,
  Phone,
  Mail,
  Camera,
  Calendar,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const navigate = useNavigate();

  // Refs for scrollable containers
  const stepperRef = useRef<HTMLDivElement>(null);
  const roleScrollRef = useRef<HTMLDivElement>(null);
  const planScrollRef = useRef<HTMLDivElement>(null);

  // Scroll helpers
  const scrollByAmount = (
    ref: React.RefObject<HTMLDivElement>,
    amount: number,
  ) => {
    if (ref.current) {
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const roles = [
    {
      id: "member",
      title: "Join as a Member",
      description:
        "Start your wellness journey, find coaches, and achieve your goals",
      icon: Heart,
      features: [
        "Find and book qualified coaches",
        "Access studios and classes",
        "Track your wellness progress",
        "Join community events",
      ],
    },
    {
      id: "coach",
      title: "Join as a Coach",
      description:
        "Share your expertise, connect with clients, and grow your wellness business",
      icon: User,
      features: [
        "Create detailed coach profile",
        "Set your own rates and schedule",
        "Connect with potential clients",
        "Track earnings and bookings",
      ],
    },
    {
      id: "studio",
      title: "Join as a Studio",
      description:
        "List your studio, gym, or wellness center to attract new members",
      icon: Building2,
      features: [
        "Showcase your studio",
        "Manage bookings and memberships",
        "Promote classes and events",
        "Analytics and insights",
      ],
    },
    {
      id: "brand-seller",
      title: "Join as a Brand Seller",
      description:
        "Sell wellness gear, supplements, and accessories to our community",
      icon: ShoppingBag,
      features: [
        "List your products",
        "Reach wellness enthusiasts",
        "Manage inventory and orders",
        "Promotional opportunities",
      ],
    },
    {
      id: "event-curator",
      title: "Join as an Event Curator",
      description:
        "Create and manage wellness events, workshops, and experiences",
      icon: Calendar,
      features: [
        "Create event listings",
        "Manage bookings and attendees",
        "Promote wellness experiences",
        "Track event success",
      ],
    },
  ];

  const progressSteps = [
    { step: 1, title: "Choose Role" },
    { step: 2, title: "Basic Info" },
    { step: 3, title: "Profile Details" },
    { step: 4, title: "Choose Plan" },
    { step: 5, title: "Verification" },
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getRoleData = () => {
    return roles.find((role) => role.id === selectedRole);
  };

  const handleCompleteRegistration = () => {
    // Store signup data
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", selectedRole);
    localStorage.setItem("justSignedUp", "true");

    // Redirect to welcome page with role parameter
    navigate(`/welcome?role=${selectedRole}`);
  };

  useEffect(() => {
    const ref = roleScrollRef.current;
    if (!ref) return;
    const handleScroll = () => {
      const cardWidth = 220; // min-w-[220px] for each card
      const idx = Math.round(ref.scrollLeft / cardWidth);
      setActiveRoleIdx(idx);
    };
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Progress Bar removed */}
      {/* Main Content */}
      <main className="container mx-auto px-2 md:px-4 py-12 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Step 1: Choose Role */}
          {currentStep === 1 && (
            <div className="text-center space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  Choose Your Path on VibeCore
                </h1>
                <p className="text-gray-600 text-lg">
                  Select the option that best describes how you want to join our
                  fitness community
                </p>
              </div>

              {/* Mobile nav buttons for role cards */}
              <div className="relative">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onClick={() => scrollByAmount(roleScrollRef, -240)}
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onClick={() => scrollByAmount(roleScrollRef, 240)}
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </button>
                <div
                  ref={roleScrollRef}
                  className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto snap-x pb-4 scrollbar-hide"
                >
                  {roles.map((role, index) => {
                    const IconComponent = role.icon;
                    return (
                      <Card
                        key={role.id}
                        className={`min-w-[220px] max-w-xs mx-2 md:mx-0 cursor-pointer transition-all hover:shadow-lg snap-center ${
                          selectedRole === role.id
                            ? "ring-2 ring-vibecore-red border-vibecore-red"
                            : "hover:border-vibecore-red"
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <CardHeader className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-vibecore-red to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-xl">
                            {role.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm mb-4">
                            {role.description}
                          </p>
                          <ul className="text-xs text-left text-gray-500 space-y-1">
                            {role.features.map((f) => (
                              <li key={f}>• {f}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center mt-2 space-x-2">
                {roles.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${idx === activeRoleIdx ? "bg-vibecore-red" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <Button
                className="w-full md:w-auto mt-4"
                onClick={nextStep}
                disabled={!selectedRole}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                <p className="text-gray-600">
                  Let's start with some basic details about{" "}
                  {selectedRole === "coach"
                    ? "yourself"
                    : selectedRole === "studio"
                      ? "your studio"
                      : selectedRole === "member"
                        ? "yourself"
                      : "your business"}
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">
                        {selectedRole === "coach" || selectedRole === "member"
                          ? "First Name"
                          : selectedRole === "studio"
                            ? "Studio Name"
                            : "Business Name"}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={
                          selectedRole === "coach" || selectedRole === "member"
                            ? "Enter your first name"
                            : selectedRole === "studio"
                              ? "Enter studio name"
                              : "Enter business name"
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">
                        {selectedRole === "coach" || selectedRole === "member"
                          ? "Last Name"
                          : "Contact Person"}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={
                          selectedRole === "coach" || selectedRole === "member"
                            ? "Enter your last name"
                            : "Enter contact person name"
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="location"
                        placeholder="Enter your city/address"
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="rounded-xl"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Profile Details */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
                <p className="text-gray-600">
                  Add details that will help people find and choose{" "}
                  {selectedRole === "coach" || selectedRole === "member"
                    ? "you"
                    : selectedRole === "studio"
                      ? "your studio"
                      : "your business"}
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Profile Photo */}
                  <div>
                    <Label>Profile Photo</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <Button variant="outline" className="rounded-xl">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {selectedRole === "member" && (
                    <>
                      <div>
                        <Label htmlFor="wellnessGoals">Wellness Goals</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select your primary wellness goal" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] overflow-y-auto">
                            <SelectItem value="weight-loss">
                              Weight Loss
                            </SelectItem>
                            <SelectItem value="muscle-gain">
                              Muscle Gain
                            </SelectItem>
                            <SelectItem value="strength">
                              Build Strength
                            </SelectItem>
                            <SelectItem value="endurance">
                              Improve Endurance
                            </SelectItem>
                            <SelectItem value="flexibility">
                              Increase Flexibility
                            </SelectItem>
                            <SelectItem value="general">
                              General Fitness
                            </SelectItem>

                            {/* Rehabilitation & Medical */}
                            <SelectItem value="rehabilitation">
                              Physical Rehabilitation
                            </SelectItem>
                            <SelectItem value="injury-recovery">
                              Injury Recovery
                            </SelectItem>
                            <SelectItem value="post-surgery">
                              Post-Surgery Recovery
                            </SelectItem>
                            <SelectItem value="chronic-pain">
                              Chronic Pain Management
                            </SelectItem>
                            <SelectItem value="mobility">
                              Improve Mobility
                            </SelectItem>
                            <SelectItem value="balance">
                              Balance & Stability
                            </SelectItem>
                            <SelectItem value="joint-health">
                              Joint Health
                            </SelectItem>
                            <SelectItem value="muscle-therapy">
                              Muscle Therapy
                            </SelectItem>

                            {/* Accessibility & Adaptive */}
                            <SelectItem value="adaptive-fitness">
                              Adaptive Fitness
                            </SelectItem>
                            <SelectItem value="wheelchair-fitness">
                              Wheelchair Fitness
                            </SelectItem>
                            <SelectItem value="prosthetic-training">
                              Prosthetic Training
                            </SelectItem>
                            <SelectItem value="visual-impaired">
                              Visual Impairment Fitness
                            </SelectItem>
                            <SelectItem value="hearing-impaired">
                              Hearing Impairment Fitness
                            </SelectItem>
                            <SelectItem value="cognitive-support">
                              Cognitive Support Fitness
                            </SelectItem>
                            <SelectItem value="elderly-fitness">
                              Senior/Elderly Fitness
                            </SelectItem>

                            {/* Sport-Specific */}
                            <SelectItem value="olympic-training">
                              Olympic Sport Training
                            </SelectItem>
                            <SelectItem value="paralympic-training">
                              Paralympic Training
                            </SelectItem>
                            <SelectItem value="competitive-sport">
                              Competitive Sport
                            </SelectItem>
                            <SelectItem value="youth-development">
                              Youth Sport Development
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="experience">
                          Fitness Experience Level
                        </Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="preferences">Workout Preferences</Label>
                        <Input
                          id="preferences"
                          placeholder="e.g., Adaptive Yoga, Wheelchair Sports, Aqua Therapy, Paralympic Training"
                          className="rounded-xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include any accessibility needs, medical
                          considerations, or adaptive equipment requirements
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="schedule">
                          Preferred Workout Times
                        </Label>
                        <Input
                          id="schedule"
                          placeholder="e.g., Morning (6-9 AM), Evening (6-8 PM)"
                          className="rounded-xl"
                        />
                      </div>
                    </>
                  )}

                  {selectedRole === "coach" && (
                    <>
                      <div>
                        <Label htmlFor="specialties">Specialties</Label>
                        <Input
                          id="specialties"
                          placeholder="e.g., Adaptive Fitness, Physical Therapy, Paralympic Training, Muscle Mobility"
                          className="rounded-xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Include: Disability/Adaptive Fitness, Medical Rehab,
                          Olympic Sports, Muscle & Joint Therapy
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="experience">Years of Experience</Label>
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

                      <div>
                        <Label htmlFor="certifications">Certifications</Label>
                        <Textarea
                          id="certifications"
                          placeholder="List your certifications..."
                          className="rounded-xl"
                        />
                      </div>
                    </>
                  )}

                  {selectedRole === "studio" && (
                    <>
                      <div>
                        <Label htmlFor="studioType">Studio/Facility Type</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select studio/facility type" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] overflow-y-auto">
                            {/* Multi-Purpose & Mixed-Use Venues */}
                            <SelectItem value="multi-sport">
                              Multi-Sport Complex
                            </SelectItem>
                            <SelectItem value="recreation-center">
                              Recreation Center (Multi-Use)
                            </SelectItem>
                            <SelectItem value="community-center">
                              Community Center (Multi-Function)
                            </SelectItem>
                            <SelectItem value="country-club">
                              Country Club (Golf + Tennis + Dining)
                            </SelectItem>
                            <SelectItem value="resort">
                              Resort & Spa (Multi-Activity)
                            </SelectItem>
                            <SelectItem value="university-campus">
                              University Sports Campus
                            </SelectItem>
                            <SelectItem value="school-complex">
                              School Sports Complex
                            </SelectItem>
                            <SelectItem value="ymca">
                              YMCA / YWCA (Multi-Service)
                            </SelectItem>
                            <SelectItem value="health-club">
                              Health & Wellness Club
                            </SelectItem>
                            <SelectItem value="fitness-resort">
                              Fitness Resort (All-Inclusive)
                            </SelectItem>
                            <SelectItem value="sports-village">
                              Sports Village / Campus
                            </SelectItem>
                            <SelectItem value="athletic-club">
                              Athletic Club (Multi-Sport)
                            </SelectItem>

                            {/* Fitness & Gym */}
                            <SelectItem value="gym">
                              Gym / Fitness Center
                            </SelectItem>
                            <SelectItem value="studio">
                              Fitness Studio
                            </SelectItem>
                            <SelectItem value="crossfit">
                              CrossFit Box
                            </SelectItem>
                            <SelectItem value="martial-arts">
                              Martial Arts Dojo
                            </SelectItem>
                            <SelectItem value="boxing">Boxing Gym</SelectItem>
                            <SelectItem value="yoga">Yoga Studio</SelectItem>
                            <SelectItem value="pilates">
                              Pilates Studio
                            </SelectItem>
                            <SelectItem value="dance">Dance Studio</SelectItem>

                            {/* Aquatic */}
                            <SelectItem value="pool">Swimming Pool</SelectItem>
                            <SelectItem value="aquatic-center">
                              Aquatic Center
                            </SelectItem>
                            <SelectItem value="water-park">
                              Water Park
                            </SelectItem>
                            <SelectItem value="surf">
                              Surf School / Beach Club
                            </SelectItem>

                            {/* Outdoor & Adventure */}
                            <SelectItem value="hiking">
                              Hiking Trails
                            </SelectItem>
                            <SelectItem value="climbing">
                              Rock Climbing Gym
                            </SelectItem>
                            <SelectItem value="rock-climbing">
                              Rock Climbing Wall/Center
                            </SelectItem>
                            <SelectItem value="indoor-climbing">
                              Indoor Climbing Facility
                            </SelectItem>
                            <SelectItem value="bouldering">
                              Bouldering Gym
                            </SelectItem>
                            <SelectItem value="adventure-park">
                              Adventure Park
                            </SelectItem>
                            <SelectItem value="zip-line">
                              Zip Line Course
                            </SelectItem>
                            <SelectItem value="obstacle-course">
                              Obstacle Course
                            </SelectItem>

                            {/* Racquet Sports */}
                            <SelectItem value="tennis">Tennis Club</SelectItem>
                            <SelectItem value="badminton">
                              Badminton Center
                            </SelectItem>
                            <SelectItem value="squash">Squash Club</SelectItem>
                            <SelectItem value="racquetball">
                              Racquetball Center
                            </SelectItem>
                            <SelectItem value="table-tennis">
                              Table Tennis Center
                            </SelectItem>

                            {/* Team Sports */}
                            <SelectItem value="basketball">
                              Basketball Court
                            </SelectItem>
                            <SelectItem value="volleyball">
                              Volleyball Center
                            </SelectItem>
                            <SelectItem value="soccer">
                              Soccer Field / Futsal
                            </SelectItem>
                            <SelectItem value="baseball">
                              Baseball Field
                            </SelectItem>
                            <SelectItem value="cricket">
                              Cricket Ground
                            </SelectItem>

                            {/* Golf */}
                            <SelectItem value="golf-course">
                              Golf Course
                            </SelectItem>
                            <SelectItem value="driving-range">
                              Golf Driving Range
                            </SelectItem>
                            <SelectItem value="mini-golf">Mini Golf</SelectItem>
                            <SelectItem value="topgolf">
                              TopGolf / Golf Entertainment
                            </SelectItem>

                            {/* Specialty Sports */}
                            <SelectItem value="archery">
                              Archery Range
                            </SelectItem>
                            <SelectItem value="shooting">
                              Shooting Range
                            </SelectItem>
                            <SelectItem value="bowling">
                              Bowling Alley
                            </SelectItem>
                            <SelectItem value="ice-skating">
                              Ice Skating Rink
                            </SelectItem>
                            <SelectItem value="roller-skating">
                              Roller Skating Rink
                            </SelectItem>
                            <SelectItem value="skateboard">
                              Skate Park
                            </SelectItem>
                            <SelectItem value="bmx">BMX Park</SelectItem>

                            {/* Equestrian */}
                            <SelectItem value="horse-riding">
                              Horse Riding School
                            </SelectItem>
                            <SelectItem value="equestrian">
                              Equestrian Center
                            </SelectItem>
                            <SelectItem value="polo">Polo Club</SelectItem>

                            {/* Motorsports */}
                            <SelectItem value="go-kart">
                              Go-Kart Track
                            </SelectItem>
                            <SelectItem value="racing">Racing Track</SelectItem>
                            <SelectItem value="motocross">
                              Motocross Track
                            </SelectItem>

                            {/* Winter Sports */}
                            <SelectItem value="ski">Ski Resort</SelectItem>
                            <SelectItem value="snowboard">
                              Snowboard Park
                            </SelectItem>
                            <SelectItem value="ice-hockey">
                              Ice Hockey Rink
                            </SelectItem>

                            {/* Olympic & Paralympic Sports */}
                            <SelectItem value="athletics">
                              Athletics Track & Field
                            </SelectItem>
                            <SelectItem value="gymnastics">
                              Gymnastics Center
                            </SelectItem>
                            <SelectItem value="weightlifting">
                              Olympic Weightlifting
                            </SelectItem>
                            <SelectItem value="wrestling">
                              Wrestling Center
                            </SelectItem>
                            <SelectItem value="judo">Judo Center</SelectItem>
                            <SelectItem value="taekwondo">
                              Taekwondo Center
                            </SelectItem>
                            <SelectItem value="fencing">
                              Fencing Club
                            </SelectItem>
                            <SelectItem value="cycling">
                              Cycling Velodrome
                            </SelectItem>
                            <SelectItem value="rowing">Rowing Club</SelectItem>
                            <SelectItem value="canoe-kayak">
                              Canoe/Kayak Center
                            </SelectItem>
                            <SelectItem value="sailing">
                              Sailing Club
                            </SelectItem>
                            <SelectItem value="triathlon">
                              Triathlon Training
                            </SelectItem>
                            <SelectItem value="pentathlon">
                              Pentathlon Center
                            </SelectItem>
                            <SelectItem value="paralympic">
                              Paralympic Training Center
                            </SelectItem>

                            {/* Combat Sports */}
                            <SelectItem value="karate">Karate Dojo</SelectItem>
                            <SelectItem value="muay-thai">
                              Muay Thai Gym
                            </SelectItem>
                            <SelectItem value="bjj">
                              Brazilian Jiu-Jitsu
                            </SelectItem>
                            <SelectItem value="mma">
                              MMA Training Center
                            </SelectItem>
                            <SelectItem value="krav-maga">
                              Krav Maga Center
                            </SelectItem>

                            {/* Water Sports */}
                            <SelectItem value="diving">
                              Diving Center
                            </SelectItem>
                            <SelectItem value="water-polo">
                              Water Polo Facility
                            </SelectItem>
                            <SelectItem value="synchronized-swimming">
                              Synchronized Swimming
                            </SelectItem>
                            <SelectItem value="surfing">
                              Surfing School
                            </SelectItem>
                            <SelectItem value="wakeboarding">
                              Wakeboarding Center
                            </SelectItem>
                            <SelectItem value="jet-ski">
                              Jet Ski Rental
                            </SelectItem>

                            {/* Camps & Training */}
                            <SelectItem value="sports-camp">
                              Sports Training Camp
                            </SelectItem>
                            <SelectItem value="summer-camp">
                              Summer Sports Camp
                            </SelectItem>
                            <SelectItem value="boot-camp">
                              Fitness Boot Camp
                            </SelectItem>
                            <SelectItem value="youth-camp">
                              Youth Sports Camp
                            </SelectItem>
                            <SelectItem value="specialty-camp">
                              Specialty Sports Camp
                            </SelectItem>
                            <SelectItem value="overnight-camp">
                              Overnight Sports Camp
                            </SelectItem>
                            <SelectItem value="day-camp">
                              Day Sports Camp
                            </SelectItem>

                            {/* Accessibility & Medical */}
                            <SelectItem value="adaptive-sports">
                              Adaptive Sports Center
                            </SelectItem>
                            <SelectItem value="disability-fitness">
                              Disability Fitness Center
                            </SelectItem>
                            <SelectItem value="wheelchair-sports">
                              Wheelchair Sports Facility
                            </SelectItem>
                            <SelectItem value="blind-sports">
                              Visually Impaired Sports
                            </SelectItem>
                            <SelectItem value="deaf-sports">
                              Deaf Sports Center
                            </SelectItem>
                            <SelectItem value="rehabilitation">
                              Physical Rehabilitation Center
                            </SelectItem>
                            <SelectItem value="physical-therapy">
                              Physical Therapy Clinic
                            </SelectItem>
                            <SelectItem value="sports-medicine">
                              Sports Medicine Clinic
                            </SelectItem>
                            <SelectItem value="muscle-therapy">
                              Muscle & Joint Therapy
                            </SelectItem>
                            <SelectItem value="mobility-clinic">
                              Mobility Enhancement Clinic
                            </SelectItem>
                            <SelectItem value="orthopedic">
                              Orthopedic Sports Center
                            </SelectItem>
                            <SelectItem value="chiropractic">
                              Chiropractic Sports Clinic
                            </SelectItem>
                            <SelectItem value="massage-therapy">
                              Massage Therapy Center
                            </SelectItem>

                            {/* Extreme & Adventure */}
                            <SelectItem value="bungee">
                              Bungee Jumping
                            </SelectItem>
                            <SelectItem value="skydiving">
                              Skydiving Center
                            </SelectItem>
                            <SelectItem value="paragliding">
                              Paragliding School
                            </SelectItem>
                            <SelectItem value="mountaineering">
                              Mountaineering School
                            </SelectItem>
                            <SelectItem value="caving">
                              Caving/Spelunking
                            </SelectItem>

                            {/* Traditional & Cultural Sports */}
                            <SelectItem value="capoeira">
                              Capoeira School
                            </SelectItem>
                            <SelectItem value="aikido">Aikido Dojo</SelectItem>
                            <SelectItem value="tai-chi">
                              Tai Chi Center
                            </SelectItem>
                            <SelectItem value="qigong">
                              Qigong Studio
                            </SelectItem>
                            <SelectItem value="sumo">Sumo Wrestling</SelectItem>

                            {/* Large Venues */}
                            <SelectItem value="stadium">Stadium</SelectItem>
                            <SelectItem value="arena">Sports Arena</SelectItem>
                            <SelectItem value="complex">
                              Sports Complex
                            </SelectItem>
                            <SelectItem value="recreation-center">
                              Recreation Center
                            </SelectItem>
                            <SelectItem value="olympic-center">
                              Olympic Training Center
                            </SelectItem>
                            <SelectItem value="multi-sport">
                              Multi-Sport Facility
                            </SelectItem>

                            {/* Wellness */}
                            <SelectItem value="spa">Spa</SelectItem>
                            <SelectItem value="wellness">
                              Wellness Center
                            </SelectItem>
                            <SelectItem value="meditation">
                              Meditation Center
                            </SelectItem>
                            <SelectItem value="sauna">
                              Sauna / Steam Room
                            </SelectItem>
                            <SelectItem value="recovery">
                              Recovery & Regeneration Center
                            </SelectItem>

                            {/* Other */}
                            <SelectItem value="trampoline">
                              Trampoline Park
                            </SelectItem>
                            <SelectItem value="laser-tag">
                              Laser Tag Arena
                            </SelectItem>
                            <SelectItem value="paintball">
                              Paintball Field
                            </SelectItem>
                            <SelectItem value="escape-room">
                              Escape Room
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>
                          Additional Functions & Services (Smart Selector)
                        </Label>
                        <p className="text-sm text-gray-600 mb-3">
                          🎯 Click to add functions your facility offers, or
                          type custom ones:
                        </p>

                        {/* Quick Add Buttons */}
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                          {[
                            "Gym",
                            "Pool",
                            "Tennis",
                            "Basketball",
                            "Yoga",
                            "Pilates",
                            "Rock Climbing",
                            "Golf",
                            "Spa",
                            "Restaurant",
                            "Archery",
                            "Martial Arts",
                            "Dance",
                            "Rehabilitation",
                            "Massage",
                            "Sauna",
                            "Childcare",
                            "Pro Shop",
                            "Personal Training",
                            "Group Classes",
                            "Aqua Fitness",
                            "Squash",
                            "Boxing",
                            "CrossFit",
                            "Cycling",
                            "Running Track",
                            "Soccer",
                            "Baseball",
                            "Ice Skating",
                            "Bowling",
                            "Volleyball",
                            "Badminton",
                            "Climbing Wall",
                            "Weight Room",
                            "Cardio Area",
                            "Stretching Zone",
                            "Locker Rooms",
                          ].map((func) => (
                            <button
                              key={func}
                              type="button"
                              className="text-xs px-3 py-2 border border-gray-300 rounded-full hover:bg-vibecore-red hover:text-white hover:border-vibecore-red transition-colors text-gray-700"
                            >
                              + {func}
                            </button>
                          ))}
                        </div>

                        {/* Selected Functions Display */}
                        <div className="mb-3">
                          <Label className="text-sm">Selected Functions:</Label>
                          <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border border-gray-200 rounded-xl bg-gray-50 mt-1">
                            <span className="text-sm text-gray-500 italic">
                              Selected functions will appear here as removable
                              badges...
                            </span>
                            {/* Example badges - in real implementation these would be dynamic */}
                            <Badge variant="secondary" className="rounded-full">
                              Gym{" "}
                              <span className="ml-1 cursor-pointer hover:text-red-600">
                                ×
                              </span>
                            </Badge>
                            <Badge variant="secondary" className="rounded-full">
                              Pool{" "}
                              <span className="ml-1 cursor-pointer hover:text-red-600">
                                ×
                              </span>
                            </Badge>
                          </div>
                        </div>

                        {/* Custom Function Input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type any function not listed above..."
                            className="rounded-xl flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl"
                          >
                            Add Custom
                          </Button>
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          💡 Examples: Physiotherapy, Nutrition Counseling,
                          Equipment Rental, Event Hosting, Cryotherapy, etc.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="services">
                          Services Description (Optional)
                        </Label>
                        <Textarea
                          id="services"
                          placeholder="List all services/activities your venue offers: e.g., Gym, Pool, Tennis Courts, Basketball, Yoga Classes, Spa Services, Dining, Events, etc."
                          className="rounded-xl"
                          rows={3}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          For multi-function venues, please list all activities
                          and services available
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="amenities">Amenities & Features</Label>
                        <Input
                          id="amenities"
                          placeholder="e.g., Parking, WiFi, Equipment Rental, Lessons, Pro Shop, Changing Rooms"
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor="hours">Operating Hours</Label>
                        <Input
                          id="hours"
                          placeholder="e.g., Mon-Fri: 5AM-11PM, Sat-Sun: 7AM-9PM"
                          className="rounded-xl"
                        />
                      </div>
                    </>
                  )}

                  {(selectedRole === "brand-seller" ||
                    selectedRole === "event-curator") && (
                    <>
                      <div>
                        <Label htmlFor="businessType">
                          {selectedRole === "brand-seller"
                            ? "Product Category"
                            : "Event Type Focus"}
                        </Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue
                              placeholder={
                                selectedRole === "brand-seller"
                                  ? "Select product category"
                                  : "Select event focus"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedRole === "brand-seller" ? (
                              <>
                            <SelectItem value="equipment">
                              Fitness Equipment
                            </SelectItem>
                            <SelectItem value="supplements">
                              Supplements
                            </SelectItem>
                                <SelectItem value="apparel">
                                  Wellness Apparel
                                </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                                <SelectItem value="nutrition">
                                  Nutrition
                                </SelectItem>
                                <SelectItem value="tech">
                                  Wellness Tech
                                </SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="workshops">
                                  Workshops & Seminars
                                </SelectItem>
                                <SelectItem value="retreats">
                                  Wellness Retreats
                                </SelectItem>
                                <SelectItem value="classes">
                                  Group Fitness Classes
                                </SelectItem>
                                <SelectItem value="competitions">
                                  Competitions & Challenges
                                </SelectItem>
                                <SelectItem value="festivals">
                                  Wellness Festivals
                                </SelectItem>
                                <SelectItem value="corporate">
                                  Corporate Wellness
                                </SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                          id="website"
                          placeholder="https://yourwebsite.com"
                          className="rounded-xl"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="bio">
                      {selectedRole === "coach" || selectedRole === "member"
                        ? "About You"
                        : selectedRole === "studio"
                          ? "About Your Studio"
                          : "About Your Business"}
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder={`Tell people about ${
                        selectedRole === "coach"
                          ? "yourself and your coaching philosophy"
                          : selectedRole === "member"
                            ? "yourself, your wellness goals, and what you're looking for"
                            : selectedRole === "studio"
                              ? "your studio, all services offered, what makes it special"
                              : selectedRole === "event-curator"
                                ? "your event planning experience and the types of wellness events you create"
                            : "your business and what you offer"
                      }...`}
                      className="rounded-xl"
                      rows={4}
                    />
                    {selectedRole === "studio" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Describe all your wellness services, target audiences,
                        and what makes your studio unique
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-6"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Choose Plan */}
          {currentStep === 4 && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">
                  Select the plan that works best for your{" "}
                  {selectedRole === "coach"
                    ? "coaching business"
                    : selectedRole === "studio"
                      ? "studio"
                      : selectedRole === "member"
                        ? "wellness journey"
                      : "business"}
                </p>
              </div>

              {/* Mobile nav buttons for plan cards */}
              <div className="relative">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onClick={() => scrollByAmount(planScrollRef, -260)}
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onClick={() => scrollByAmount(planScrollRef, 260)}
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </button>
                <div
                  ref={planScrollRef}
                  className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto snap-x scrollbar-hide"
                >
                  {/* Starter Plan */}
                  <div className="bg-white border-2 border-green-400 rounded-2xl p-6 hover:border-green-600 transition-colors shadow-sm">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-green-700">
                        Starter
                      </h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        $5
                      </div>
                      <p className="text-gray-600 text-sm mb-6">per month</p>
                      <ul className="text-left space-y-3 mb-6">
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Profile listing on platform
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Client booking system
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Basic analytics
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          Email support
                        </li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full">
                        Select Starter
                      </Button>
                    </div>
                  </div>
                  {/* Pro (Monthly) Plan */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-vibecore-red transition-colors">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Pro</h3>
                      <div className="text-3xl font-bold text-vibecore-red mb-1">
                        $49
                      </div>
                      <p className="text-gray-600 text-sm mb-6">per month</p>
                      <ul className="text-left space-y-3 mb-6">
                            <li className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Everything in Starter
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Advanced analytics
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Priority support
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Featured listing boost
                            </li>
                      </ul>
                      <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-full">
                        Select Pro
                      </Button>
                    </div>
                  </div>
                  {/* Growth (6 Months) Plan - Most Popular */}
                  <div className="bg-white border-2 border-vibecore-red rounded-2xl p-6 relative shadow-lg">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-vibecore-red text-white rounded-full px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        Growth (6 Months)
                      </h3>
                      <div className="text-3xl font-bold text-vibecore-red mb-1">
                        $249
                      </div>
                      <p className="text-gray-600 text-sm mb-2">total</p>
                      <p className="text-green-600 text-sm font-medium mb-4">
                        Save $45!
                      </p>
                      <ul className="text-left space-y-3 mb-6">
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Everything in Pro
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Extra marketing tools
                        </li>
                      </ul>
                      <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                        Select Growth
                      </Button>
                    </div>
                  </div>
                  {/* Elite (Yearly) Plan */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-vibecore-red transition-colors">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        Elite (Yearly)
                      </h3>
                      <div className="text-3xl font-bold text-vibecore-red mb-1">
                        $459
                      </div>
                      <p className="text-gray-600 text-sm mb-2">per year</p>
                      <p className="text-green-600 text-sm font-medium mb-4">
                        Save $129!
                      </p>
                      <ul className="text-left space-y-3 mb-6">
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Everything in Growth
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Premium analytics & insights
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Dedicated account manager
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          Marketing toolkit
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-vibecore-red mr-2" />
                          API access
                        </li>
                      </ul>
                      <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                        Select Elite
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Note:</strong> You collect payments directly from your
                  clients using your own systems. VibeCore subscription covers
                  platform access, listing, and tools only.
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-6"
                >
                  Continue to Verification
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Verification */}
          {currentStep === 5 && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Verification</h2>
                <p className="text-gray-600">
                  Upload documents to verify your{" "}
                  {selectedRole === "coach"
                    ? "credentials"
                    : selectedRole === "studio"
                      ? "business"
                      : selectedRole === "member"
                        ? "profile"
                      : "business"}
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {selectedRole === "member" && (
                    <>
                      <div>
                        <Label>Health & Wellness Assessment (Optional)</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload any medical clearance or wellness assessments
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Profile Photo</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload a profile photo (optional)
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-800 text-sm">
                          <strong>Welcome!</strong> As a member, you can start
                          exploring coaches and studios immediately. Complete
                          your profile to get personalized recommendations.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedRole === "coach" && (
                    <>
                      <div>
                        <Label>Certification Documents</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload your certification documents
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Profile Photos</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload professional photos
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedRole === "studio" && (
                    <>
                      <div>
                        <Label>Business License</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload your business license
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Studio Photos</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload photos of your studio
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {(selectedRole === "brand-seller" ||
                    selectedRole === "event-curator") && (
                    <>
                      <div>
                        <Label>Business Registration</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload business registration documents
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>
                          {selectedRole === "brand-seller"
                            ? "Product Images"
                            : "Event Portfolio"}
                        </Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            {selectedRole === "brand-seller"
                              ? "Upload images of your products"
                              : "Upload photos from previous events you've organized"}
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> All documents will be reviewed
                      within 24-48 hours. You'll receive an email once your
                      account is approved.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleCompleteRegistration}
                  className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8"
                >
                  Complete Registration
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
