import { useState } from "react"
import React from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP code.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/verify-email/", { otp });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/SignIn');  // Use a proper route with `/`
      } else if (response.status === 204) {
        toast.info("Account already verified.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Verification failed.");
      } else {
        toast.error("Network or server error.");
      }
    }
  };


  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="">Enter your otp code:</label>
          <input
            type='text'
            className='email-form'
            name='otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />


        </div>
        <input type="submit" className='btn btn-primary' value="Send" />
      </form>
    </div>
  )
}

export default VerifyEmail