import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ResetPassword = () => {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState({
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword.password !== newPassword.confirm_password) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await axiosInstance.patch('/api/users/set-new-password/', {
                password: newPassword.password,
                confirm_password: newPassword.confirm_password,
                uidb64: uidb64,
                token: token
            });

            if (response.status === 200) {
                setSuccess('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/SignIn');
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Reset Your Password</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-600 mb-4">{success}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        required
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        required
                        placeholder="Confirm new password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-warning"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
