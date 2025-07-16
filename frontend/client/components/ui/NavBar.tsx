import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isLogin = location.pathname === "/login";

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold">
            VIBE<span className="text-vibecore-red">CORE</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-vibecore-red transition-colors">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-vibecore-red transition-colors">Events</Link>
            <Link to="/trainers" className="text-gray-700 hover:text-vibecore-red transition-colors">Trainers</Link>
            <Link to="/facilities" className="text-gray-700 hover:text-vibecore-red transition-colors">Facilities</Link>
            <Link to="/shops" className="text-gray-700 hover:text-vibecore-red transition-colors">Shops</Link>
          </nav>
        </div>
        {isSignup ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link to="/login">
              <Button
                variant="outline"
                className="rounded-full border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : isLogin ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <Link to="/signup">
              <Button
                variant="outline"
                className="rounded-full border-vibecore-red text-vibecore-red hover:bg-vibecore-red hover:text-white"
              >
                Sign up
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button className="bg-vibecore-red hover:bg-vibecore-red-hover text-white px-6 rounded-full">
              Login/Register
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
} 