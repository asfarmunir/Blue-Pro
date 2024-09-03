import React from "react";
import Image from "next/image";

export const GoogleBtn = () => {
  return (
    <div className="flex items-center justify-center text-black w-full border border-[#C8C8C8] rounded-xl py-1 cursor-pointer">
      <button className="px-4 py-2 flex gap-2 justify-center items-center">
        <Image
          width={20}
          height={20}
          src={"https://www.svgrepo.com/show/475656/google-color.svg"}
          loading="lazy"
          alt="google logo"
        />
        <span className=" font-bold">Sign in with Google</span>
      </button>
    </div>
  );
};
