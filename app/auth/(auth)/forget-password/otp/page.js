"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BlueBtn from "@/components/shared/auth/BlueBtn";
import { GoogleBtn } from "@/components/shared/GoogleBtn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const Otp = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="mb-4">
        <div className="text-2xl mb-4 flex items-center flex-col space-y-1">
          <Image
            src="/envelope.svg"
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
            Enter OTP
          </div>
          <p
            className="pt-2 max-w-xs text-center"
            style={{
              color: "#828282",
              fontSize: "16px",
              lineHeight: "22px",
              letterSpacing: "3%",
            }}
          >
            Enter the OTP code we just sent   you on your registered Email/Phone
            number
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="my-2">
          <InputOTP maxLength={5}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="w-full mt-4">
          <Link href={"/auth/reset-password"}>
            <BlueBtn title={"Verify"} />
          </Link>
          <div className="text-center mt-4">
            Did you get OTP? <b>Send Again</b>
          </div>

          <div class="my-6 text-center">
            <div class=" text-gray-600 flex items-center justify-center">
              <span class="flex-grow border-t border-gray-300"></span>
              <span class="leading-none px-2 text-sm mx-4 font-medium bg-white">
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

export default Otp;
