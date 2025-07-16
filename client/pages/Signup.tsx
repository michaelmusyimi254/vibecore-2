import { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    {
      id: "trainee",
      title: "Join as a Trainee",
      description:
        "Start your fitness journey, find trainers, and achieve your goals",
      icon: Dumbbell,
      features: [
        "Find and book qualified trainers",
        "Access facilities and classes",
        "Track your fitness progress",
        "Join community events",
      ],
    },
    {
      id: "trainer",
      title: "Join as a Trainer",
      description:
        "Share your expertise, connect with clients, and grow your fitness business",
      icon: User,
      features: [
        "Create detailed trainer profile",
        "Set your own rates and schedule",
        "Connect with potential clients",
        "Track earnings and bookings",
      ],
    },
    {
      id: "facility",
      title: "Join as a Facility",
      description:
        "List your gym, studio, or fitness center to attract new members",
      icon: Building2,
      features: [
        "Showcase your facility",
        "Manage bookings and memberships",
        "Promote classes and events",
        "Analytics and insights",
      ],
    },
    {
      id: "vendor",
      title: "Join as a Vendor",
      description:
        "Sell fitness equipment, supplements, and accessories to our community",
      icon: ShoppingBag,
      features: [
        "List your products",
        "Reach fitness enthusiasts",
        "Manage inventory and orders",
        "Promotional opportunities",
      ],
    },
  ];

  const progressSteps = [
    { step: 1, title: "Choose Role" },
    { step: 2, title: "Basic Info" },
    { step: 3, title: "Profile Details" },
    { step: 4, title: "Verification" },
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getRoleData = () => {
    return roles.find((role) => role.id === selectedRole);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              VIBE<span className="text-vibecore-red">CORE</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Already have an account?
              </span>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-full border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {progressSteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.step <= currentStep
                      ? "bg-vibecore-red text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.step < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.step
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step.step <= currentStep
                      ? "text-vibecore-red"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
                {index < progressSteps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      step.step < currentStep
                        ? "bg-vibecore-red"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
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

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <Card
                      key={role.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
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
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">
                          {role.description}
                        </p>
                        <ul className="space-y-2">
                          {role.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <Check className="w-4 h-4 text-vibecore-red mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button
                onClick={nextStep}
                disabled={!selectedRole}
                className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8 py-3"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
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
                  {selectedRole === "trainer"
                    ? "yourself"
                    : selectedRole === "facility"
                      ? "your facility"
                      : "your business"}
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">
                        {selectedRole === "trainer"
                          ? "First Name"
                          : selectedRole === "facility"
                            ? "Facility Name"
                            : "Business Name"}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={
                          selectedRole === "trainer"
                            ? "Enter your first name"
                            : selectedRole === "facility"
                              ? "Enter facility name"
                              : "Enter business name"
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">
                        {selectedRole === "trainer"
                          ? "Last Name"
                          : "Contact Person"}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={
                          selectedRole === "trainer"
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
                  {selectedRole === "trainer"
                    ? "you"
                    : selectedRole === "facility"
                      ? "your facility"
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
                  {selectedRole === "trainee" && (
                    <>
                      <div>
                        <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select your primary fitness goal" />
                          </SelectTrigger>
                          <SelectContent>
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
                          placeholder="e.g., Yoga, Weightlifting, Cardio, HIIT"
                          className="rounded-xl"
                        />
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

                  {selectedRole === "trainer" && (
                    <>
                      <div>
                        <Label htmlFor="specialties">Specialties</Label>
                        <Input
                          id="specialties"
                          placeholder="e.g., Weight Loss, Strength Training, Yoga"
                          className="rounded-xl"
                        />
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

                  {selectedRole === "facility" && (
                    <>
                      <div>
                        <Label htmlFor="facilityType">Facility Type</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select facility type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gym">Gym</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="spa">Spa</SelectItem>
                            <SelectItem value="pool">Pool</SelectItem>
                            <SelectItem value="wellness">
                              Wellness Center
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="amenities">Amenities</Label>
                        <Input
                          id="amenities"
                          placeholder="e.g., Pool, Sauna, Parking, WiFi"
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

                  {selectedRole === "vendor" && (
                    <>
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equipment">
                              Fitness Equipment
                            </SelectItem>
                            <SelectItem value="supplements">
                              Supplements
                            </SelectItem>
                            <SelectItem value="apparel">Apparel</SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
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
                      {selectedRole === "trainer"
                        ? "About You"
                        : selectedRole === "facility"
                          ? "About Your Facility"
                          : "About Your Business"}
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder={`Tell people about ${
                        selectedRole === "trainer"
                          ? "yourself and your training philosophy"
                          : selectedRole === "facility"
                            ? "your facility and what makes it special"
                            : "your business and what you offer"
                      }...`}
                      className="rounded-xl"
                      rows={4}
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

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Verification</h2>
                <p className="text-gray-600">
                  Upload documents to verify your{" "}
                  {selectedRole === "trainer"
                    ? "credentials"
                    : selectedRole === "facility"
                      ? "business"
                      : "business"}
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  {selectedRole === "trainee" && (
                    <>
                      <div>
                        <Label>Health & Fitness Assessment (Optional)</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload any medical clearance or fitness assessments
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
                          <strong>Welcome!</strong> As a trainee, you can start
                          exploring trainers and facilities immediately.
                          Complete your profile to get personalized
                          recommendations.
                        </p>
                      </div>
                    </>
                  )}

                  {selectedRole === "trainer" && (
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

                  {selectedRole === "facility" && (
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
                        <Label>Facility Photos</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload photos of your facility
                          </p>
                          <Button variant="outline" className="rounded-xl">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedRole === "vendor" && (
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
                        <Label>Product Images</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload images of your products
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
                <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
                  Submit Application
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
