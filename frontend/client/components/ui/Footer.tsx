import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-bold mb-6">
                VIBE<span className="text-red-500">CORE</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
                Your AI-powered wellness platform connecting you with certified
                coaches, premium grounds, and amazing experiences.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.297 3.641 9.757 8.563 10.888.626-.101.855-.434.855-.965 0-.477-.018-2.066-.018-3.753-3.123.543-3.998-.922-4.247-1.77-.143-.366-.763-1.498-1.305-1.801-.445-.241-1.08-.837-.018-.855 1.001-.018 1.716.922 1.952 1.305 1.143 1.919 2.97 1.379 3.698 1.046.112-.837.445-1.379.81-1.696-2.829-.322-5.786-1.413-5.786-6.275 0-1.379.494-2.518 1.305-3.405-.131-.322-.577-1.636.131-3.405 0 0 1.062-.339 3.484 1.305a11.755 11.755 0 013.176-.434c1.077 0 2.162.146 3.176.434 2.422-1.644 3.484-1.305 3.484-1.305.708 1.769.262 3.083.131 3.405.81.887 1.305 2.026 1.305 3.405 0 4.879-2.975 5.953-5.804 6.275.459.395.859 1.156.859 2.341 0 1.696-.018 3.054-.018 3.472 0 .531.229.884.859.965C20.391 21.744 24.009 17.284 24.009 11.987 24.009 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Discover
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/trainers"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Find Coaches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/facilities"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Wellness Grounds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Events & Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shops"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Premium Gear
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Get Started
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Join as Member
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Become a Coach
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    List Your Venue
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} VibeCore. Made with ❤️ by
                BrandwithN.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <a
                  href="mailto:support@vibecore.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
