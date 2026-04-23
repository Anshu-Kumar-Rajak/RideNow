import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser,
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white shadow-sm p-6 flex items-center gap-3 border-b border-gray-100">
        <i className="ri-car-line text-3xl text-blue-600"></i>
        <h1 className="text-2xl font-bold text-gray-900">RideNow</h1>
      </div>
      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-600 text-sm">
              Join us and start your journey
            </p>
          </div>
          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2">
                  <i className="ri-user-line text-blue-600"></i>
                  First Name
                </label>
                <input
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none bg-white transition-colors"
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2">
                  <i className="ri-user-line text-blue-600"></i>
                  Last Name
                </label>
                <input
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none bg-white transition-colors"
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Email Fields */}
            <div>
              <label className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2">
                <i className="ri-mail-line text-blue-600"></i>
                Email Address
              </label>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none bg-white transition-colors"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            {/* Password */}
            <div>
              <label className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 mb-2 lg:mb-3 flex items-center gap-2">
                <i className="ri-lock-line text-blue-600"></i>
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none bg-white transition-colors"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                placeholder="••••••••"
              />
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <i className="ri-login-box-line"></i>
              Create Account
            </button>
          </form>
          {/* Signup */}
          <div className="mt-5 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-semibold ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 items-center"></div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-6 text-center text-xs text-gray-500 space-y-2">
        <p>This site is protected by reCAPTCHA and the</p>
        <p>
          <span className="underline cursor-pointer hover:text-gray-700">
            Google Privacy Policy
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer hover:text-gray-700">
            Terms of Service
          </span>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
