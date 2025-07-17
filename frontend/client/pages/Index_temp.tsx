{
  /* Modern Platform Features Section */
}
<section className="py-32 bg-gray-50 relative overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-20">
      <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200 mb-8">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
        <span className="text-sm font-semibold text-gray-700">
          Platform Features
        </span>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
        Everything you need for
        <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent block">
          wellness success
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Built for the modern wellness community with intelligent AI, seamless
        booking, and premium experiences
      </p>
    </div>

    {/* Featured Cards Grid */}
    <div className="grid lg:grid-cols-2 gap-8 mb-16">
      {/* Large Feature Card 1 */}
      <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10"></div>
        <div className="relative p-12">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="inline-flex items-center bg-red-100 rounded-full px-4 py-2">
              <span className="text-sm font-semibold text-red-600">
                ✨ AI-Powered
              </span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            Intelligent Coach Matching
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Our advanced AI analyzes your goals, preferences, and schedule to
            connect you with the perfect certified coaches. Book sessions
            instantly and start your transformation today.
          </p>
          <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
            <span>Discover coaches</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Large Feature Card 2 */}
      <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
        <div className="relative p-12">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2">
              <span className="text-sm font-semibold text-blue-600">
                🏢 Premium Network
              </span>
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            Exclusive Venues Access
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Access premium gyms, studios, pools, stadiums, and golf clubs
            worldwide. Seamless booking, flexible memberships, and exclusive
            amenities.
          </p>
          <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
            <span>Explore venues</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Secondary Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      {/* Feature Card 3 */}
      <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900">
          Curated Marketplace
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Premium wellness gear and supplements from verified sellers
        </p>
      </div>

      {/* Feature Card 4 */}
      <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 10V5a3 3 0 00-6 0v5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900">
          Events & Community
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Join exclusive wellness events and build meaningful connections
        </p>
      </div>

      {/* Feature Card 5 */}
      <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 4 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900">
          Smart Analytics
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Track progress with intelligent insights and actionable data
        </p>
      </div>

      {/* Feature Card 6 */}
      <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900">
          Enterprise Security
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Bank-level security with end-to-end encryption protection
        </p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
        <div className="text-gray-600">Certified Coaches</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
        <div className="text-gray-600">Premium Venues</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
        <div className="text-gray-600">Active Members</div>
      </div>
    </div>
  </div>
</section>;

{
  /* Modern CTA Section */
}
<section className="py-32 bg-white relative overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
        Ready to transform your
        <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent block">
          wellness journey?
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Choose your path and start building meaningful connections in the
        wellness community today
      </p>
    </div>

    {/* CTA Cards */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Coach CTA */}
      <div className="group relative bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          Become a Coach
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Share your expertise and build meaningful client relationships with
          our comprehensive platform
        </p>
        <Link to="/signup">
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105">
            Start Coaching
          </Button>
        </Link>
      </div>

      {/* Venue CTA */}
      <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          List Your Venue
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Showcase your wellness venue to thousands of enthusiasts and manage
          bookings seamlessly
        </p>
        <Link to="/signup">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105">
            Join as Venue
          </Button>
        </Link>
      </div>

      {/* Brand Seller CTA */}
      <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          Sell Premium Products
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Reach thousands of wellness enthusiasts with your high-quality gear
          and supplements
        </p>
        <Link to="/signup">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105">
            Start Selling
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>;
