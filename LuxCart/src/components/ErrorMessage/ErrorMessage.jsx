import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    const navigate = useNavigate();
    
    return (
        <div className="error-message-container">
            <div className="error-message">
                <h3>Something went wrong</h3>
                <p>{message}</p>
                <button 
                    className="retry-btn"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
                <button 
                    className="home-btn"
                    onClick={() => navigate('/')}
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;