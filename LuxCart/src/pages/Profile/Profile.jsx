import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/axiosInstance'

const Profile = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const jwt_access = localStorage.getItem('access')
  const refresh = localStorage.getItem('refresh')

  useEffect(() => {
    if (!jwt_access || !user) {
      navigate("/SignIn")
    } else {
      getSomeData()
    }
  }, [])

  const getSomeData = async () => {
    try {
      const res = await axiosInstance.get("api/users/profile/")
      if (res.status === 200) {
        console.log(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }


  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        "api/users/logout/",
        { refresh_token: refresh },
        {
          headers: {
            Authorization: `Bearer ${jwt_access}`,
          }
        }
      )

      if (res.status === 204) {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        toast.success("Logout successful")
        navigate("/SignIn")
      }
    } catch (error) {
      toast.error("Logout failed")
      console.error("Logout error:", error.response?.data || error.message)
    }
  }

  return (
    <div className="text-center mt-5">
      <h2>Hi {user?.email || 'Guest'}</h2>
      <p>Welcome to your profile</p>
      <button className="btn btn-success m-2" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile