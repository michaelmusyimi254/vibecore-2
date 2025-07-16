import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="relative z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              VIBE<span className="text-vibecore-red">CORE</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Events
              </Link>
              <Link
                to="/trainers"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Trainers
              </Link>
              <Link
                to="/facilities"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Facilities
              </Link>
              <Link
                to="/shops"
                className="text-gray-700 hover:text-vibecore-red transition-colors"
              >
                Shops
              </Link>
            </nav>
          </div>
          <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-6">
            Login/Register
          </Button>
        </div>
      </header>

      {/* Placeholder Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-gray-600 mb-8">
            This page will contain the search functionality with filters, tabs
            for Trainers/Facilities/Shops/Events, and results cards.
          </p>
          <Link to="/">
            <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
