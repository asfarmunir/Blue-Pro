"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BlueBtn from "@/components/shared/auth/BlueBtn";
import { GoogleBtn } from "@/components/shared/GoogleBtn";
import Link from "next/link";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="mb-4">
        <div className="text-2xl mb-4 flex items-center flex-col space-y-1">
          <Image
            src="/lock.svg"
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
            Reset Password
          </div>
          <div
            className="pt-2"
            style={{
              color: "##828282",
              fontSize: "16px",
              lineHeight: "22px",
              letterSpacing: "3%",
            }}
          >
            Enter your credential to access your account.{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start mt-8">
        <label
          htmlFor="password"
          className="mt-4 mb-2 flex font-semibold justify-between items-center w-full"
          style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "16px" }}
        >
          Enter New Password
        </label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter password"
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10 "
          style={{
            height: "60px",
          }}
        />

        <label
          htmlFor="passsword"
          className="mt-4 mb-2 flex font-semibold justify-between items-center w-full"
          style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "16px" }}
        >
          Confirm New Password
        </label>
         <input
                 type="password"
          id="passsword"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter password again"
          className="w-full pl-4 rounded-2xl bg-[#38B6FF]/10 "
          style={{
            height: "60px",
          }}
        />


        <div className="w-full mt-4">
          <Link href={"/"}>
            <BlueBtn title={"Login"} />
          </Link>
          <div className="text-center mt-4">
            Don&#39;t have an account?{" "}
            <b>
              <Link href={"/auth/signup"}>Register here!</Link>
            </b>
          </div>

          <div class="my-6 text-center">
            <div class=" text-gray-600 flex items-center justify-center">
              <span class="flex-grow border-t border-gray-300"></span>
              <span class="leading-none px-2 mx-4 text-sm font-medium bg-white">
                Or
              </span>
              <span class="flex-grow border-t border-gray-300"></span>
            </div>
          </div>

          <GoogleBtn />
          <div className="text-sm my-6 text-[#333333] text-center">
            BluPro Pvt. Ltd 2023©, All rights reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
