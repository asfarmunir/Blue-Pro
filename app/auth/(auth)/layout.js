import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <div className=" h-screen w-full flex flex-col md:flex-row items-center justify-center font-mulish">
      <div className="w-full min-h-screen relative hidden md:block">
        <div className="w-1/2 h-full fixed left-0">
          <Image
            src="/auth-img.svg"
            alt="logo icon"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-white w-full p-4 flex items-center justify-center lg:mt-16">
        <div className="p-4 pt-12 md:pt-36 2xl:pt-4 w-full md:w-3/4">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
