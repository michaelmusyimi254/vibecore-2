import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const isLogin = location.pathname === "/login";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole") || "";
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/search", label: "Search" },
    { to: "/events", label: "Events" },
    { to: "/trainers", label: "Trainers" },
    { to: "/facilities", label: "Facilities" },
    { to: "/shops", label: "Shops" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("justSignedUp");
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 md:top-4 md:left-4 md:right-4 md:rounded-2xl md:border md:border-white/20 shadow-lg font-sans">
      <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold vc-section-header tracking-tight"
          >
            VIBE<span className="text-[color:hsl(var(--vc-red))]">CORE</span>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="vc-body-text hover:text-[color:hsl(var(--vc-red))] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Desktop & Tablet Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="rounded-full">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Avatar
                className="h-8 w-8 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback className="bg-vibecore-red text-white text-xs">
                  {userRole.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="rounded-full border-gray-300 hover:border-red-500 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : isSignup ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm vc-body-text">
                Already have an account?
              </span>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-full border-[color:hsl(var(--vc-red))] text-[color:hsl(var(--vc-red))] hover:bg-[color:hsl(var(--vc-red))] hover:text-white"
                >
                  Login
                </Button>
              </Link>
            </div>
          ) : isLogin ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm vc-body-text">
                Don't have an account?
              </span>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="rounded-full border-[color:hsl(var(--vc-red))] text-[color:hsl(var(--vc-red))] hover:bg-[color:hsl(var(--vc-red))] hover:text-white"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-[color:hsl(var(--vc-red))] hover:bg-[color:hsl(var(--vc-red-hover))] text-white px-6 rounded-full">
                Login/Register
              </Button>
            </Link>
          )}
        </div>
        {/* Hamburger Icon for Mobile (right-aligned, no border) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none bg-white/80 ml-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span
            className={`block w-6 h-0.5 bg-[color:hsl(var(--vc-red))] mb-1 transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[color:hsl(var(--vc-red))] mb-1 transition-all ${mobileOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[color:hsl(var(--vc-red))] transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </button>
      </div>
      {/* Slender, right-aligned Mobile Nav Dropdown (no border, simplified) */}
      {mobileOpen && (
        <nav className="md:hidden absolute top-full right-4 w-72 max-w-[90vw] bg-white/95 shadow-xl rounded-xl z-50 animate-fade-in-down">
          <ul className="flex flex-col items-stretch py-4 px-2 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="vc-body-text text-base py-2 px-4 rounded-lg hover:bg-[color:hsl(var(--vc-light-red))] hover:text-[color:hsl(var(--vc-red))] w-full block text-right transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="w-full flex flex-col items-stretch space-y-2 mt-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    variant="outline"
                    className="w-full rounded-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="bg-[color:hsl(var(--vc-red))] hover:bg-[color:hsl(var(--vc-red-hover))] text-white px-6 rounded-full w-full">
                    Login/Register
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
