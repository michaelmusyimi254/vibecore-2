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
import { useState } from "react";

export default function TrainerProfile() {
  const trainer = {
    id: 1,
    name: "Sarah Johnson",
    title: "Certified Personal Trainer & Nutrition Coach",
    location: "Downtown Fitness Center, San Francisco",
    rating: 4.9,
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

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '', hearAbout: '', message: '', subscribe: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

                {/* Replace the grid of stats with a compact info row styled like Shop/Facility */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-base text-gray-800 font-medium">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold">{trainer.rating}</span>
                    <span className="text-gray-500">({trainer.reviews.length} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-5 h-5 text-vibecore-red" />
                    <span className="font-semibold">{trainer.yearsExperience} Years Experience</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-vibecore-red" />
                    <span className="font-semibold">{trainer.clientsHelped}+ Clients Helped</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">{trainer.certifications.length} Certifications</span>
                  </span>
                </div>
                {/* Show first four specialties as badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {trainer.specialties.slice(0, 4).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="rounded-full">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                {/* Place Book Session, Message, and Call buttons in a single row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8">Book Session</Button>
                  <Button variant="outline" className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"><MessageCircle className="w-4 h-4 mr-2" />Message</Button>
                  <Button variant="outline" className="rounded-full px-8 border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"><Phone className="w-4 h-4 mr-2" />Call</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left column: sidebar */}
            <div className="space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {trainer.name.split(' ')[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{trainer.bio}</p>
                </CardContent>
              </Card>
              {/* Contact & Social */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl"><Mail className="w-4 h-4 mr-3" />Email {trainer.name.split(' ')[0]}</Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl"><Phone className="w-4 h-4 mr-3" />Call {trainer.name.split(' ')[0]}</Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl"><Instagram className="w-4 h-4 mr-3" />Instagram</Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl"><Facebook className="w-4 h-4 mr-3" />Facebook</Button>
                  </div>
                </CardContent>
              </Card>
              {/* Trainer Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Trainer Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Years Experience:</span> {trainer.yearsExperience}</li>
                    <li><span className="font-medium">Clients Helped:</span> {trainer.clientsHelped}+</li>
                    <li><span className="font-medium">Certifications:</span> {trainer.certifications.length}</li>
                  </ul>
                </CardContent>
              </Card>
              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="rounded-full">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {trainer.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-100 rounded p-2 shadow-sm">
                        <div className="flex items-center mb-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span className="font-bold text-vibecore-red mr-2 text-sm">{review.rating}</span>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-1 text-xs">{review.comment}</p>
                        <span className="text-xs text-gray-500">{review.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Review form */}
                  <form className="mt-4">
                    <input type="text" className="w-full border rounded px-2 py-1 text-sm mb-2" placeholder="Your Name" required />
                    <select className="w-full border rounded px-2 py-1 text-sm mb-2">
                      {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <textarea className="w-full border rounded px-2 py-1 text-sm mb-2" placeholder="Comment" required />
                    <Button type="submit" size="sm" className="w-full bg-vibecore-red text-white rounded-full mt-2">Submit</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            {/* Right column: tabs and tab content */}
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="packages" className="w-full">
                <TabsList className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 mb-8 bg-gray-100 rounded-2xl p-1 scrollbar-hide pb-2">
                  <TabsTrigger value="packages" className="min-w-[120px] rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2">Packages</TabsTrigger>
                  <TabsTrigger value="schedule" className="min-w-[120px] rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2">Schedule</TabsTrigger>
                  <TabsTrigger value="events" className="min-w-[120px] rounded-xl font-bold transition-colors data-[state=active]:bg-vibecore-red data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-vibecore-red px-4 py-2">Events</TabsTrigger>
                </TabsList>
                {/* Packages Tab */}
                <TabsContent value="packages">
                  <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 mb-8 scrollbar-hide pb-2">
                    {trainer.services.map((pkg) => (
                      <Card key={pkg.name} className={`min-w-[260px] flex flex-col h-full justify-between border-2 transition-colors ${selectedPackage === pkg.name ? 'border-vibecore-red' : 'border-gray-200 hover:border-vibecore-red'}`}> 
                        <CardHeader>
                          <CardTitle className="text-lg font-bold mb-2">{pkg.name}</CardTitle>
                          <div className="text-3xl font-bold text-vibecore-red mb-1">${pkg.price}</div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
                          <div className="text-xs text-gray-500 mb-4">{pkg.duration}{pkg.priceNote ? ` • ${pkg.priceNote}` : ''}</div>
                          <Button className="w-full bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full mt-auto" onClick={() => { setSelectedPackage(pkg.name); setFormSubmitted(false); }}>Select</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Booking/Inquiry Form appears below selected package */}
                  {selectedPackage && !formSubmitted && (
                    <Card className="mb-4">
                      <CardHeader>
                        <CardTitle>Book: {selectedPackage} Package</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-3" onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }}>
                          <input type="text" className="w-full border rounded px-2 py-1 text-sm" placeholder="Your Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                          <input type="email" className="w-full border rounded px-2 py-1 text-sm" placeholder="Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                          <input type="tel" className="w-full border rounded px-2 py-1 text-sm" placeholder="Phone" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                          <textarea className="w-full border rounded px-2 py-1 text-sm" placeholder="Reason for your inquiry (e.g. session, consultation, group training, etc.)" rows={3} required value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} />
                          <div>
                            <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
                            <select className="w-full border rounded px-2 py-1 text-sm" required value={form.hearAbout} onChange={e => setForm(f => ({ ...f, hearAbout: e.target.value }))}>
                              <option value="">Select an option</option>
                              <option value="search">Search Engine</option>
                              <option value="social">Social Media</option>
                              <option value="friend">Friend/Referral</option>
                              <option value="event">Attended an Event</option>
                              <option value="ad">Advertisement</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <textarea className="w-full border rounded px-2 py-1 text-sm" placeholder="Additional message (optional)" rows={2} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" checked={form.subscribe} onChange={e => setForm(f => ({ ...f, subscribe: e.target.checked }))} />
                            Subscribe to trainer updates and offers
                          </label>
                          <Button type="submit" size="sm" className="bg-vibecore-red text-white rounded-full w-full">Submit Inquiry</Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                  {/* Confirmation message after submission */}
                  {formSubmitted && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800 text-center">
                      Thank you for your inquiry! The trainer will reach out to you soon.
                    </div>
                  )}
                  {/* Disclaimer always visible */}
                  <div className="mt-2 text-xs text-orange-700 bg-orange-50 border-l-4 border-orange-400 p-3 rounded flex items-start gap-2">
                    <span className="mt-0.5"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#f59e42" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#f59e42" strokeWidth="2" strokeLinecap="round"/></svg></span>
                    <span><b>Disclaimer:</b> Please do not make any payments until you have met the trainer and confirmed all details in person. VibeCore does not process payments for trainers directly. All bookings are subject to confirmation by the trainer.</span>
                  </div>
                </TabsContent>
                {/* Schedule Tab */}
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader><CardTitle>Weekly Availability</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 scrollbar-hide pb-2">
                        {trainer.availability.map((day) => (
                          <div key={day.day} className="min-w-[220px] flex-shrink-0 flex flex-col items-start justify-between p-4 bg-gray-50 rounded-xl md:min-w-0 md:w-full">
                            <h4 className="font-medium w-24">{day.day}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {day.times.map((time) => (
                                <Badge key={time} variant={time === "Rest Day" ? "secondary" : "default"} className="rounded-full">{time}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-8"><Calendar className="w-4 h-4 mr-2" />View Calendar & Book</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Events Tab */}
                <TabsContent value="events">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:gap-6 scrollbar-hide pb-2">
                      {[{title: 'Bootcamp Challenge', date: '2024-07-10', time: '10:00 AM', location: 'Main Gym', spots: '10 spots left', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop'}, {title: 'Nutrition Workshop', date: '2024-07-15', time: '2:00 PM', location: 'Studio B', spots: '20 spots left', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=300&h=200&fit=crop'}].map((event, idx) => (
                        <Card key={idx} className="min-w-[320px] md:min-w-0">
                          <CardContent className="p-4">
                            <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                            <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                            <div className="text-sm text-gray-600 mb-1">{event.date} • {event.time}</div>
                            <div className="text-sm text-gray-600 mb-2">{event.location}</div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{event.spots}</span>
                              <Button size="sm" className="bg-vibecore-red text-white rounded-full">Join</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
