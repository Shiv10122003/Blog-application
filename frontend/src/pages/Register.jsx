import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api.jsx";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }  
    setLoading(true);
    try {
      const response = await registerUser(formData);
     
       console.log(response.data);
       
       alert(response.data.message || "Registration successful! Please login");
      //Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      if(error.response){
       const  status = error.response.status;
       if(status === 400){
         setError("User already exists with this email");
       } else{
         setError("Registration failed. Please try again.");
       }
      }

    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-[slideUp_0.5s_ease-out]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">
            Join us today! Please fill in your details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/50 border-l-4 border-red-500 text-red-300 p-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-lg focus:border-gray-500 focus:ring-4 focus:ring-gray-700 outline-none transition-all disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-lg focus:border-gray-500 focus:ring-4 focus:ring-gray-700 outline-none transition-all disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white rounded-lg focus:border-gray-500 focus:ring-4 focus:ring-gray-700 outline-none transition-all disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-linear-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-500 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-6"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-gray-300 hover:text-white font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
