// pages/signin.js
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "../../components/hook/useAuth";
export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      login(data.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true); // Set loading to true

  //   try {
  //     const response = await fetch("/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Registration failed");
  //     }

  //     const data = await response.json();
  //     router.push("/dashboard");
  //   } catch (err) {
  //     setError("Registration failed. Please try again.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false); // Reset loading to false
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white mx-4 py-12 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          {/* Logo */}
          <img
            src="/logo.png" // Replace with your logo path
            alt="Children's House Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-sm text-gray-600">
            Please provide your sign-in information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}  className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Admin
            </label>
            <div className="relative flex items-center mt-1 w-full px-3 py-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <svg
                className="pr-1"
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.6155 14.2245C1.15517 14.2245 0.770833 14.0703 0.4625 13.762C0.154167 13.4537 0 13.0693 0 12.609V1.83999C0 1.37965 0.154167 0.995321 0.4625 0.686987C0.770833 0.378654 1.15517 0.224487 1.6155 0.224487H16.3845C16.8448 0.224487 17.2292 0.378654 17.5375 0.686987C17.8458 0.995321 18 1.37965 18 1.83999V12.609C18 13.0693 17.8458 13.4537 17.5375 13.762C17.2292 14.0703 16.8448 14.2245 16.3845 14.2245H1.6155ZM9 7.33999L1 2.10899V12.609C1 12.7885 1.05767 12.936 1.173 13.0515C1.2885 13.1668 1.436 13.2245 1.6155 13.2245H16.3845C16.564 13.2245 16.7115 13.1668 16.827 13.0515C16.9423 12.936 17 12.7885 17 12.609V2.10899L9 7.33999ZM9 6.22449L16.6923 1.22449H1.30775L9 6.22449ZM1 2.10899V1.22449V12.609C1 12.7885 1.05767 12.936 1.173 13.0515C1.2885 13.1668 1.436 13.2245 1.6155 13.2245H1V2.10899Z"
                  fill="gray"
                />
              </svg>
              <input
                type="text"
                id="email"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="py-2 w-full outline-none"
                placeholder="Enter your admin"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative flex items-center mt-1 w-full px-2 py-1 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <svg
                className="pr-1"
                width="30"
                height="30"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_227_274"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="25"
                >
                  <rect y="0.224487" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_227_274)">
                  <path
                    d="M10.9808 14.7245H13.0193L12.4635 11.634C12.7583 11.5315 13.0016 11.3507 13.1932 11.0917C13.3849 10.8327 13.4808 10.5436 13.4808 10.2245C13.4808 9.81548 13.3362 9.46648 13.047 9.17748C12.758 8.88832 12.409 8.74373 12 8.74373C11.591 8.74373 11.242 8.88832 10.953 9.17748C10.6638 9.46648 10.5192 9.81548 10.5192 10.2245C10.5192 10.5436 10.6151 10.8327 10.8067 11.0917C10.9984 11.3507 11.2417 11.5315 11.5365 11.634L10.9808 14.7245ZM12 21.186C9.991 20.5898 8.32208 19.3728 6.99325 17.535C5.66442 15.6971 5 13.627 5 11.3245V5.91673L12 3.30148L19 5.91673V11.3245C19 13.627 18.3356 15.6971 17.0068 17.535C15.6779 19.3728 14.009 20.5898 12 21.186ZM12 20.1245C13.7333 19.5745 15.1667 18.4745 16.3 16.8245C17.4333 15.1745 18 13.3411 18 11.3245V6.59948L12 4.36873L6 6.59948V11.3245C6 13.3411 6.56667 15.1745 7.7 16.8245C8.83333 18.4745 10.2667 19.5745 12 20.1245Z"
                    fill="gray"
                  />
                </g>
              </svg>

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none py-2"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
