import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import axiosInstance from '../../utils/axiosInstance';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { Breadcrumb, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const slug = product?.category?.slug || 'default';
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }

    return stars;
  };

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post(`api/cart/add/`, {
        product_id: product.id,
        quantity: quantity,
      });
      alert('Product added to cart!');
      navigate('/cart');
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add to cart. Make sure you are logged in.');
    }
  };

  const handleshare = () => {
    alert("Thank you for your interest! Unfortunately, sharing isn’t available right now, but we’ll notify you once it’s back.")
  }

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} fullPage />;

  const safePrice = !isNaN(Number(product.price)) ? Number(product.price).toFixed(2) : '0.00';
  const safeOriginalPrice = !isNaN(Number(product.originalPrice)) ? Number(product.originalPrice).toFixed(2) : null;

  return (
    <div className="product-detail-page bg-light">
      <Breadcrumb className="container py-3">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
       <Breadcrumb.Item href={`/category/${slug}`}>Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="py-5">
        <Row className="bg-white rounded shadow-sm p-4">

          {/* Product Images */}
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="sticky-top" style={{ top: '20px' }}>
              <div className="mb-3 border rounded overflow-hidden">
                <img
                  src={product.images?.[selectedImage]?.url || product.image || "https://via.placeholder.com/800x600?text=No+Image"}
                  alt={product.name}
                  className="img-fluid w-100"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </div>

              {product.images?.length > 1 && (
                <div className="d-flex flex-wrap gap-2">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`border rounded p-1 cursor-pointer ${selectedImage === index ? 'border-primary' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      style={{ width: '80px', height: '80px' }}
                    >
                      <img
                        src={img.url}
                        alt={`thumbnail-${index}`}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <Badge bg="secondary" className="mb-2">
              {product.category?.name || 'Uncategorized'}
            </Badge>

            <h1 className="mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-3">
              <div className="me-2">{renderRatingStars(product.rating || 4.5)}</div>
              <span className="text-muted">({product.reviewCount || 0} reviews)</span>
            </div>

            <div className="d-flex align-items-center mb-4">
              <h2 className="text-primary mb-0">₹{safePrice}</h2>
              {safeOriginalPrice && (
                <del className="text-muted ms-2 fs-5">₹{safeOriginalPrice}</del>
              )}
            </div>

            <p className="mb-4">{product.description}</p>

            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <span className="fw-bold me-2">Quantity:</span>
                <div className="btn-group">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(-1)}>-</Button>
                  <Button variant="outline-secondary" size="sm" disabled>{quantity}</Button>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(1)}>+</Button>
                </div>
              </div>
              <div>
                <span className="fw-bold me-2">Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-success">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-grow-1"
                onClick={handleAddToCart}
                disabled={product.stock < 1}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </Button>

              <Button variant="outline-secondary" size="lg">
                <FaHeart className="me-2" />
                Wishlist
              </Button>

              <Button variant="outline-secondary" size="lg" onClick={handleshare}>
                <FaShare className="me-2" />
                Share
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default ProductDetail;
