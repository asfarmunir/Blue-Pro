"use client";
import React, { useState } from "react";
import Image from "next/image";
import BlueBtn from "@/components/shared/auth/BlueBtn";
import { GoogleBtn } from "@/components/shared/GoogleBtn";
import Link from "next/link";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";
 import {  toast } from 'react-toastify';
 import { useSession } from "next-auth/react";
const Signup = () => {
  const [name, setName] = useState("asfar munir asfi");
  const [email, setEmail] = useState("asfarma2815@gmail.com");
  const [password, setPassword] = useState("asfarasfar");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router= useRouter();


  if (session.data) {
    router.push("/");
  }

  // Simple validation logic
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

  
    return valid;
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate form submission (replace this with actual API call)
          const data = { name, email, password };

          const response = await axios.post("/api/signup", data);
          console.log("Server response", response.data);
        if (response.data.status === 200) {
          toast.success('Account created successfully');
          router.push("/auth/login");
        }
        else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error during form submission", error);
        toast.error("Error during form submission");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="lg:mt-24 xl:mt-18">
        <div className="text-2xl mb-4 flex items-center flex-col space-y-1">
          <Image
            src="/hands.svg"
            width={100}
            height={100}
            alt="logo icon"
            className="mr-2"
            priority={false}
          />
          <div
            style={{
              fontWeight: 800,
              fontSize: "32.36px",
              lineHeight: "35.6px",
              color: "#333333",
            }}
          >
            Sign up
          </div>
          <p
            className="pt-2"
            style={{
              color: "#828282",
              fontSize: "16px",
              lineHeight: "22px",
              letterSpacing: "3%",
            }}
          >
            Enter your credentials to access your account.{" "}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-start mt-8">
        {/* Name Field */}
        <label
          htmlFor="name"
          className="mb-2 font-semibold"
          style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "16px" }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10"
          style={{
            height: "60px",
          }}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Email Field */}
        <label
          htmlFor="email"
          className="mt-4 font-semibold mb-2"
          style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "16px" }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10"
          style={{
            height: "60px",
          }}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password Field */}
        <label
          htmlFor="password"
          className="mt-4 font-semibold mb-2 flex justify-between items-center w-full"
          style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "16px" }}
        >
          Password
          
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10"
          style={{
            height: "60px",
          }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Submit Button */}
        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full  bg-[#38B6FF] flex items-center justify-center text-white font-semibold text-center py-4 rounded-xl"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#38B6FF",
              height: "60px",
              borderRadius: "10px",
            }}
          >
            {loading ? <HashLoader size={31} color="white" /> : "Get Started"} 
          </button>

          <div className="text-center mt-4">
            If you already have an account you can{" "}
            <b>
              <Link href="/auth/login">Sign In</Link>
            </b>
          </div>

          {/* Or section */}
          <div className="my-6 text-center">
            <div className="text-gray-600 flex items-center justify-center">
              <span className="flex-grow border-t border-gray-300"></span>
              <span className="leading-none px-2 mx-4 text-sm font-semibold bg-white">
                Or
              </span>
              <span className="flex-grow border-t border-gray-300"></span>
            </div>
          </div>

          <GoogleBtn />
          <div className="text-sm my-6 text-[#333333] text-center">
            BluPro Pvt. Ltd 2023©, All rights reserved
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
