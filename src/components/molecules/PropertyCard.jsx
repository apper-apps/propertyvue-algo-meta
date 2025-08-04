import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { motion } from "framer-motion";

const PropertyCard = ({ property, onToggleFavorite }) => {
  const formatPrice = (price) => {
    if (property.listingType === "For Rent") {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(property.Id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden group"
    >
      <Link to={`/property/${property.Id}`}>
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge 
              variant={property.listingType === "For Rent" ? "accent" : "primary"}
              className="font-semibold"
            >
              {property.listingType}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            {formatPrice(property.price)}
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 group-hover:scale-110"
          >
            <ApperIcon
              name="Heart"
              size={16}
              className={`transition-colors duration-200 ${
                property.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {property.title}
</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <ApperIcon name="MapPin" size={14} className="mr-1" />
            <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={14} className="mr-1" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={14} className="mr-1" />
                <span>{property.bathrooms} bath</span>
              </div>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Maximize" size={14} className="mr-1" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;