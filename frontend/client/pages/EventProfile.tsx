import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ChevronLeft, Users, Mail, Share2, Heart } from "lucide-react";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import { Link } from "react-router-dom";

export default function EventProfile() {
  // Mock event data
  const event = {
    id: 1,
    title: "Morning Yoga Flow",
    date: "Dec 15, 2024",
    time: "7:00 AM",
    location: "Central Park",
    price: "Free",
    spots: "15 spots left",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    description:
      "Start your day with a rejuvenating yoga flow in the park. All levels welcome. Bring your own mat and water bottle. Enjoy the fresh air and connect with the community!",
    tags: ["Beginner Friendly", "Outdoor", "Free", "Yoga"],
    organizer: {
      name: "Jane Doe",
      email: "jane@yogaflow.com",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      highlights: ["Certified Yoga Instructor", "10+ Years Experience", "Community Leader"],
      perks: ["Free Snacks", "Goodie Bags", "Photo Session"],
    },
    agenda: [
      { time: "7:00 AM", activity: "Welcome & Registration" },
      { time: "7:15 AM", activity: "Yoga Flow Session" },
      { time: "8:00 AM", activity: "Cool Down & Meditation" },
      { time: "8:20 AM", activity: "Snacks & Networking" },
    ],
    reviews: [
      { name: "Alex", comment: "Loved the energy and the instructor!", rating: 5 },
      { name: "Sam", comment: "Great way to start the day.", rating: 4 },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Cover Image + Floating Card */}
      <section className="pt-24">
        <div className="h-64 bg-cover bg-center relative rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${event.image})` }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full md:w-1/3 flex flex-col gap-6">
              {/* Event Avatar & Organizer */}
              <div className="flex flex-col items-center text-center">
                <img src={event.organizer.avatar} alt={event.organizer.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-2 object-cover" />
                <div className="font-semibold text-lg">{event.organizer.name}</div>
                <div className="text-xs text-gray-500 mb-2">Organizer</div>
                <a href={`mailto:${event.organizer.email}`} className="text-vibecore-red text-xs hover:underline mb-2">{event.organizer.email}</a>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="rounded-full"><Heart className="w-4 h-4 mr-1" /> Save</Button>
                  <Button variant="outline" size="sm" className="rounded-full"><Share2 className="w-4 h-4 mr-1" /> Share</Button>
                </div>
              </div>
              {/* About & Highlights */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-semibold text-base mb-2">About</div>
                <div className="text-gray-700 text-sm mb-3">{event.description}</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full text-xs font-medium">{tag}</Badge>
                  ))}
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-base mb-1 text-gray-700">Highlights</div>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {event.organizer.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-base mb-1 text-gray-700">Perks</div>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {event.organizer.perks.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
              {/* Reviews */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="font-semibold mb-2">Reviews</div>
                <ul className="space-y-2 mb-2">
                  {event.reviews.map((r, i) => (
                    <li key={i} className="text-xs text-gray-700 border-b border-gray-200 pb-2 last:border-b-0">
                      <span className="font-semibold text-vibecore-red">{r.name}:</span> {r.comment} <span className="ml-2 text-yellow-500">{"★".repeat(r.rating)}</span>
                    </li>
                  ))}
                </ul>
                <form className="mt-2">
                  <input type="text" placeholder="Add a review..." className="w-full border rounded px-2 py-1 text-xs mb-1" />
                  <Button size="sm" className="w-full bg-vibecore-red text-white rounded-full text-xs">Submit</Button>
                </form>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 space-y-2">
              {/* Event Image with Date Overlay (FacilityProfile style) */}
              <div className="h-64 bg-cover bg-center relative rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-4 left-4 bg-vibecore-red text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg flex items-center gap-2 z-10">
                  <Calendar className="w-5 h-5 mr-1" /> {event.date}
                </div>
              </div>
              {/* Event Name & Info Row */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-2">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="flex flex-wrap gap-4 mb-4 text-gray-600 text-sm">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {event.spots}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <span className="font-semibold text-vibecore-red text-lg">{event.price}</span>
                  <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white rounded-full px-6 py-2 text-base w-full md:w-auto">Join Event</Button>
                  <Button className="w-full md:w-auto bg-white border border-vibecore-red text-vibecore-red rounded-full flex items-center justify-center hover:bg-vibecore-red hover:text-white transition-colors" variant="outline">
                    <Mail className="w-4 h-4 mr-2" /> Message Organizer
                  </Button>
                  <Button className="w-full md:w-auto bg-white border border-vibecore-red text-vibecore-red rounded-full flex items-center justify-center hover:bg-vibecore-red hover:text-white transition-colors" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" /> Share Event
                  </Button>
                </div>
              </div>
              {/* Description Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="font-semibold mb-2">Description</div>
                <div className="text-gray-700 text-base">{event.description}</div>
              </div>
              {/* Schedule/Agenda Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="font-semibold mb-2">Event Schedule</div>
                <ul className="space-y-2">
                  {event.agenda.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-vibecore-red w-20">{item.time}</span>
                      <span className="text-gray-700">{item.activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Gallery Placeholder Card */}
              <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400">
                <div className="font-semibold mb-1">Event Gallery</div>
                <div className="text-xs">Photos from the event will appear here.</div>
              </div>
            </main>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 