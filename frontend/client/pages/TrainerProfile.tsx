import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Star,
  Clock,
  Award,
  Users,
  MessageCircle,
  Share2,
  Heart,
  Phone,
  Mail,
  Instagram,
  Facebook,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/ui/NavBar";

export default function TrainerProfile() {
  const trainer = {
    id: 1,
    name: "Sarah Johnson",
    title: "Certified Personal Trainer & Nutrition Coach",
    location: "Downtown Fitness Center, San Francisco",
    rating: 4.9,
    reviews: 127,
    yearsExperience: 8,
    clientsHelped: 200,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=300&fit=crop",
    bio: "Passionate about helping people transform their lives through fitness and nutrition. With 8 years of experience, I specialize in weight loss, strength training, and sustainable lifestyle changes. My approach combines evidence-based training methods with personalized nutrition guidance to help you achieve lasting results.",
    certifications: [
      "NASM Certified Personal Trainer",
      "Precision Nutrition Level 1",
      "TRX Suspension Training",
      "Yoga Alliance RYT 200",
    ],
    specialties: [
      "Weight Loss",
      "Strength Training",
      "Nutrition Coaching",
      "HIIT Training",
      "Functional Movement",
      "Injury Prevention",
    ],
    services: [
      {
        name: "Personal Training Session",
        duration: "60 minutes",
        price: 75,
        description: "One-on-one personalized training session",
      },
      {
        name: "Nutrition Consultation",
        duration: "45 minutes",
        price: 60,
        description: "Comprehensive nutrition assessment and meal planning",
      },
      {
        name: "Group Training (2-4 people)",
        duration: "60 minutes",
        price: 45,
        priceNote: "per person",
        description: "Small group training with friends or family",
      },
      {
        name: "Online Coaching Package",
        duration: "Monthly",
        price: 200,
        description: "Custom workout plans + weekly check-ins",
      },
    ],
    availability: [
      { day: "Monday", times: ["6:00 AM", "7:00 AM", "5:00 PM", "6:00 PM"] },
      { day: "Tuesday", times: ["6:00 AM", "7:00 AM", "12:00 PM", "1:00 PM"] },
      {
        day: "Wednesday",
        times: ["6:00 AM", "7:00 AM", "5:00 PM", "6:00 PM"],
      },
      { day: "Thursday", times: ["6:00 AM", "7:00 AM", "12:00 PM", "1:00 PM"] },
      { day: "Friday", times: ["6:00 AM", "7:00 AM", "5:00 PM"] },
      { day: "Saturday", times: ["8:00 AM", "9:00 AM", "10:00 AM"] },
      { day: "Sunday", times: ["Rest Day"] },
    ],
    reviews: [
      {
        name: "Jennifer M.",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Sarah is amazing! I've lost 25 pounds in 4 months and feel stronger than ever. Her nutrition guidance was a game changer.",
        verified: true,
      },
      {
        name: "Michael R.",
        rating: 5,
        date: "1 month ago",
        comment:
          "Best trainer I've ever worked with. Really knows how to push you while keeping workouts fun and engaging.",
        verified: true,
      },
      {
        name: "Lisa K.",
        rating: 5,
        date: "2 months ago",
        comment:
          "Professional, knowledgeable, and motivating. Sarah helped me prepare for my wedding and I felt incredible!",
        verified: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Profile Header */}
      <section className="pt-24">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${trainer.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={trainer.image} alt={trainer.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
                    <p className="text-gray-600 mb-2">{trainer.title}</p>
                    <p className="text-gray-500 text-sm flex items-center mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {trainer.location}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-xl ml-1">
                        {trainer.rating}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {trainer.reviews.length} reviews
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-5 h-5 text-vibecore-red mr-1" />
                      <span className="font-bold text-xl">
                        {trainer.yearsExperience}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Years Experience</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-5 h-5 text-vibecore-red mr-1" />
                      <span className="font-bold text-xl">
                        {trainer.clientsHelped}+
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Clients Helped</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                      <span className="font-bold text-xl">
                        {trainer.certifications.length}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Certifications</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {trainer.specialties.slice(0, 4).map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
                    Book Session
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 rounded-2xl p-1">
              <TabsTrigger
                value="about"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                Services
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Sarah</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {trainer.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {trainer.specialties.map((specialty) => (
                          <div
                            key={specialty}
                            className="flex items-center p-3 bg-gray-50 rounded-xl"
                          >
                            <CheckCircle className="w-5 h-5 text-vibecore-red mr-3" />
                            <span className="font-medium">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {trainer.certifications.map((cert) => (
                          <li key={cert} className="flex items-center">
                            <Award className="w-4 h-4 text-vibecore-red mr-3" />
                            <span className="text-sm">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact & Social</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <Mail className="w-4 h-4 mr-3" />
                          Email Sarah
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <Phone className="w-4 h-4 mr-3" />
                          Call Sarah
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <Instagram className="w-4 h-4 mr-3" />
                          Instagram
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <Facebook className="w-4 h-4 mr-3" />
                          Facebook
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="grid md:grid-cols-2 gap-6">
                {trainer.services.map((service) => (
                  <Card
                    key={service.name}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">
                          {service.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-vibecore-red">
                            ${service.price}
                          </span>
                          {service.priceNote && (
                            <p className="text-sm text-gray-500">
                              {service.priceNote}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full">
                        Book This Service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {trainer.availability.map((day) => (
                      <div
                        key={day.day}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <h4 className="font-medium w-24">{day.day}</h4>
                        <div className="flex flex-wrap gap-2">
                          {day.times.map((time) => (
                            <Badge
                              key={time}
                              variant={
                                time === "Rest Day" ? "secondary" : "default"
                              }
                              className="rounded-full"
                            >
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Calendar & Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    Client Reviews ({trainer.reviews.length})
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-lg ml-1">
                      {trainer.rating}
                    </span>
                    <span className="text-gray-600 ml-1">out of 5</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {trainer.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <Avatar className="w-10 h-10 mr-3">
                              <AvatarFallback>
                                {review.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">{review.name}</h4>
                                {review.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                                )}
                              </div>
                              <p className="text-gray-500 text-sm">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: review.rating }).map(
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline" className="rounded-full px-8">
                    View All Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
