import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Categories.css";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axiosInstance from "../../utils/axiosInstance";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("api/products/categories/");
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formatCategoryName = (name) => {
    if (!name) return "";
    return name.replace(/'s/g, "'s").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage variant="danger">{error}</ErrorMessage>;
  }

  if (categories.length === 0) {
    return <ErrorMessage variant="info">No categories found.</ErrorMessage>;
  }

  return (
    <div className="home-page-container">
      {/* Carousel Section */}
      <div className="carousel-section mb-5">
        <Carousel fade controls indicators>
          {categories.slice(0, 4).map((category) => (
            <Carousel.Item key={category.slug} interval={3000}>
              <img
                className="d-block w-100 carousel-img"
                src={category.image || "https://via.placeholder.com/1200x400?text=No+Image"}
                alt={category.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x400?text=Image+Not+Available";
                }}
              />
              <Carousel.Caption className="carousel-caption">
                <h3>{formatCategoryName(category.name)}</h3>
                <p>{category.description || "Explore our premium collection."}</p>
                <Link 
                  to={`/category/${category.slug}`} 
                  className="btn btn-primary mt-2"
                >
                  Shop Now
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Categories Grid Section */}
      <div className="categories-section container">
        <h2 className="text-center mb-5 fw-bold" style={{ color: "#61099a" }} id="shop">
          Explore Our Categories
        </h2>
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.slug} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <Link to={`/category/${category.slug}`} className="text-decoration-none">
                <div className="card h-100 text-center p-3 category-card hover-effect">
                  <div className="category-img-container">
                    <img
                      src={category.image || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={category.name}
                      className="card-img-top img-fluid"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Available";
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{formatCategoryName(category.name)}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;