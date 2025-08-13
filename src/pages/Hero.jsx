import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection"
import TourCard from "../components/TourCard"

const Hero = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-600 to-red-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">🇪🇹</span>
          </div>
          <h1 className="text-2xl font-bold text-white">TourMate Ethiopia</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {user?.name || 'Traveler'}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

        {/* hero section */}
        <HeroSection />
        {/*  top tour section */}
        <section className="top-tour-section">
          <h2>Our Top Tours</h2>
          <div className="top-tour-card-container">
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
            <TourCard rating={4.5} reviewCount={120} title="Ertale" />
          </div>
          <Link to="./tours" className="btn-primary">Explore More</Link>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {/* Featured Destinations */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 hover:bg-opacity-100 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ancient History</h3>
            <p className="text-gray-600">Explore the rock-hewn churches of Lalibela and ancient Axum</p>
          </div>
          
          <div className="bg-white bg-opacity-90 rounded-lg p-6 hover:bg-opacity-100 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏔️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Natural Wonders</h3>
            <p className="text-gray-600">Discover the Simien Mountains and Blue Nile Falls</p>
          </div>
          
          <div className="bg-white bg-opacity-90 rounded-lg p-6 hover:bg-opacity-100 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">☕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Coffee Culture</h3>
            <p className="text-gray-600">Experience the birthplace of coffee and traditional ceremonies</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 space-x-4">
          <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
            Plan Your Trip
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl animate-bounce">🏔️</div>
      <div className="absolute top-40 right-20 text-3xl animate-pulse">☕</div>
      <div className="absolute bottom-40 left-20 text-3xl animate-bounce">🏛️</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-pulse">🌿</div>
    </div>
  );
};

export default Hero; 
