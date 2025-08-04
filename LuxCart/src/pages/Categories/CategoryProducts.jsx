import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ProductCard from "../Products/ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../utils/axiosInstance";

const CategoryProducts = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axiosInstance.get(
                    `api/products/categories/${slug}/`
                );
                setCategory(data.category);
                setProducts(data.products || []);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load category products.");
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [slug]);

    if (loading) return <LoadingSpinner fullPage />;
    if (error) return <ErrorMessage variant="danger" fullPage>{error}</ErrorMessage>;

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbar />
            <div className="container my-5 flex-grow-1">
                <div className="text-center mb-4">
                    <h1 className="display-5">{category?.name} Collection</h1>
                    <p className="text-muted">
                        {category?.description || "Premium selection of high-quality products"}
                    </p>
                    <span className="badge bg-secondary fs-6">
                        {products.length} {products.length === 1 ? "Product" : "Products"}
                    </span>
                </div>

                {products.length === 0 ? (
                    <div className="alert alert-info text-center py-5" role="alert">
                        No products found in this category.
                    </div>
                ) : (
                    <div className="container">
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id}>
                                    <ProductCard product={product} categoryStyle={slug} />
                                </div>
                            ))}
                        </div>
                    </div>

                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoryProducts;