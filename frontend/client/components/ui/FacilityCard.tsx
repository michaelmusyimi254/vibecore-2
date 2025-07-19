import React from "react";

interface FacilityCardProps {
  facility: {
    id: number;
    name: string;
    type: string;
    location: string;
    status: string;
    rating: number;
    reviews: number;
    openTime: string;
    price: string;
    image: string;
    tags: string[];
    amenities: string[];
    capacity?: number;
    spotsLeft?: number;
  };
  onBook?: () => void;
}

export function FacilityCard({ facility, onBook }: FacilityCardProps) {
  // Calculate progress percentage if capacity and spotsLeft are available
  const progress = facility.capacity && facility.spotsLeft !== undefined 
    ? Math.min(100, Math.max(0, ((facility.capacity - facility.spotsLeft) / facility.capacity) * 100))
    : 0;
    
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full max-w-sm mx-auto transition-all hover:shadow-md">
      {/* Image with Badge */}
      <div className="relative">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-48 object-cover"
        />
        {facility.status === "Popular" && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>

      {/* Facility Content */}
      <div className="p-4">
        {/* Name and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{facility.name}</h3>
          <span className="text-red-600 font-semibold">
            {facility.price}
          </span>
        </div>

        {/* Rating and Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{facility.rating}</span>
              <span className="text-gray-400 text-xs ml-1">({facility.reviews})</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">{facility.type}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{facility.location}</span>
        </div>

        {/* Open Time */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{facility.openTime}</span>
        </div>

        {/* Tags */}
        {facility.tags && facility.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {facility.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {facility.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                +{facility.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Progress Bar - Only show if capacity and spotsLeft are available */}
        {facility.capacity !== undefined && facility.spotsLeft !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>AVAILABILITY</span>
              <span>{facility.spotsLeft} spots left</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex -space-x-2 mr-2">
            {facility.amenities.slice(0, 4).map((amenity, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500"
              >
                {amenity[0]}
              </div>
            ))}
            {facility.amenities.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-400">
                +{facility.amenities.length - 4}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {facility.amenities.slice(0, 2).join(" • ")}
            {facility.amenities.length > 2 && " • more"}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onBook}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}