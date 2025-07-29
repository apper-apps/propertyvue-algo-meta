import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ onSearch, favoritesCount = 0, showLogout = false }) => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigation = [
    { name: "Browse", href: "/", icon: "Home" },
    { name: "Map View", href: "/map", icon: "Map" },
    { name: "Favorites", href: "/favorites", icon: "Heart" }
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-surface shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-surface/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl group-hover:shadow-lg transition-all duration-200">
              <ApperIcon name="Home" size={24} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
              PropertyVue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  isActive(item.href)
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.name}</span>
                {item.name === "Favorites" && favoritesCount > 0 && (
                  <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            ))}
</nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Logout Button - Desktop */}
          {showLogout && (
            <div className="hidden lg:block">
              <Button
                onClick={logout}
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
              >
                <ApperIcon name="LogOut" size={18} />
                <span>Logout</span>
              </Button>
            </div>
          )}
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.name}</span>
{item.name === "Favorites" && favoritesCount > 0 && (
                    <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-0.5 ml-auto">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              ))}
              {showLogout && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                >
                  <ApperIcon name="LogOut" size={18} />
                  <span>Logout</span>
                </button>
)}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;