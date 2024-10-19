"use client";
import React, { useState } from "react";
import Image from "next/image";
import BlueBtn from "@/components/shared/auth/BlueBtn";
import { GoogleBtn } from "@/components/shared/GoogleBtn";
import Link from "next/link";
import {signIn,useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
const Login = () => {
  const [email, setEmail] = useState("asfarma2815@gmail.com");
  const [password, setPassword] = useState("asfarafar");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const session = useSession();
  const  router = useRouter();

  if(session.data){
    router.push('/');
  }

  const validateForm = () => {
    let formErrors= {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password should be at least 6 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulating an API request for login
    try {
      console.log("Logging in...");
      console.log(email,password)
      const res =  await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if(!res.ok)
      {
        toast.error(res.error);
        return
      }
      toast.success("Logged in successfully");
      router.push('/');
    } catch (error) {
      console.error("Login failed", error);
      setErrors({ email: "Invalid login credentials" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="mb-4 pt-8">
        <div className="text-2xl mb-4 flex items-center flex-col space-y-1">
          <Image
            src="/hands.svg"
            width={100}
            height={100}
            alt="logo icon"
            className="mr-2 mb-1"
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
            Sign in
          </div>
          <div
            className="pt-2"
            style={{
              color: "#828282",
              fontSize: "16px",
              lineHeight: "22px",
              letterSpacing: "3%",
            }}
          >
            Enter your credential to access your account.
          </div>
        </div>
      </div>
      <form className="flex flex-col items-start " onSubmit={handleSubmit}>
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
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10 "
          style={{
            height: "60px",
          }}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

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
          placeholder="Enter your password"
          value={password}
          
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10 "
          style={{
            height: "60px",
          }}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

        {/* Submit Button */}
        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full bg-[#38B6FF] text-white font-semibold text-center py-4 rounded-xl"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#38B6FF",
              height: "60px",
              borderRadius: "10px",
            }}
          >
            {loading ? <HashLoader size={25} color="white" /> : "Login"}
          </button>
          <div className="text-center mt-4">
            Don&#39;t have an account?{" "}
            <b>
              <Link href={"/auth/signup"}>Register here!</Link>
            </b>
          </div>

          <div className="my-6 text-center">
            <div className="text-gray-600 flex items-center justify-center">
              <span className="flex-grow border-t border-gray-300"></span>
              <span className="leading-none px-2 mx-4 text-sm font-medium bg-white">Or</span>
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

export default Login;
