import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaEye } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product, categoryStyle }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);


  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price);
  const originalPrice = product.originalPrice ?
    (typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(product.originalPrice)) :
    null;

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <article
      className={`product-card ${categoryStyle ? categoryStyle + '-card' : ''}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=No+Image"}
        />

        
        <div className="product-badges">
          {product.isNew && <span className="badge new-badge">New</span>}
          {originalPrice && (
            <span className="badge discount-badge">
              {Math.round((1 - price / originalPrice) * 100)}% OFF
            </span>
          )}
          {product.isPremium && <span className="badge premium-badge">Premium</span>}
        </div>

        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <FaHeart className={isWishlisted ? "wishlist-icon active" : "wishlist-icon"} />
        </button>
      </div>

      <div className="product-details">
        <h3
          className="product-title"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          style={{ cursor: "pointer" }}
        >
          {product.name || "Unnamed Product"}
  
        </h3>

        <div className="product-pricing">
          <span className="current-price">₹{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
        >
          <FaEye className="quick-view-icon" /> Quick View
        </button>
      </div>
    </article>



  );
};

export default ProductCard;