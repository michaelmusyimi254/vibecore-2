import { Star, MapPin, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CoachCardProps {
  coach: {
    id: number;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    reviews: number;
    experience: string;
    hourlyRate: number;
    image: string;
    specialties: string[];
    available: string;
    responseTime: string;
    verified: boolean;
    sessions?: number;
  };
  onBook?: () => void;
  onMessage?: () => void;
}

export function CoachCard({ coach, onBook, onMessage }: CoachCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Coach Header with Image and Basic Info */}
      <div className="relative">
        <div className="h-40 bg-gray-100 overflow-hidden">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
        </div>
        {coach.verified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center text-xs font-medium text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      {/* Coach Content */}
      <div className="p-4">
        {/* Name and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{coach.name}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-700">{coach.rating}</span>
            <span className="text-gray-400 text-xs ml-1">({coach.reviews})</span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-sm text-gray-600 mb-3">{coach.specialty}</p>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{coach.location}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <div className="text-xs text-gray-500">Experience</div>
            <div className="font-semibold text-sm">{coach.experience}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <div className="text-xs text-gray-500">Sessions</div>
            <div className="font-semibold text-sm">{coach.sessions || '500+'}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <div className="text-xs text-gray-500">Rate</div>
            <div className="font-semibold text-sm">${coach.hourlyRate}/hr</div>
          </div>
        </div>

        {/* Specialties */}
        {coach.specialties && coach.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-2">SPECIALTIES</h4>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.slice(0, 3).map((specialty, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {coach.specialties.length > 3 && (
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                  +{coach.specialties.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{coach.available}</span>
          </div>
          <span className="text-xs text-gray-500">{coach.responseTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onBook} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Book Session
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-lg"
            onClick={onMessage}
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
