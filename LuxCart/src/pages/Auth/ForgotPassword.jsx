import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const res = await axiosInstance.post("/api/users/password-reset/", { email });

        if (res.status === 200) {
          toast.success("A reset link has been sent to your email");
        }
      } catch (error) {
        console.error(error);
        toast.error("Email not found or something went wrong.");
      }
    }

    setEmail("");
  };

  return (
    <div>
      <ToastContainer />
      <h2 className='text'>Enter your Registered Email Address</h2>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              className='email-form'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn btn-success'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
