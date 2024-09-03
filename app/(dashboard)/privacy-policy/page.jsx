import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" p-3 ">
      <h2 className="text-xl 2xl:text-2xl font-bold mb-3">Privacy Policy</h2>
      <p>You can check th e activity management details here</p>
      <div className="flex flex-col my-6 md:flex-row gap-4 items-center justify-between">
        <h2 className="text-lg 2xl:text-xl font-bold">
          How we Use your information ?
        </h2>
        <p className="text-slate-500">Updated at 26 August 2024, 12:45 AM</p>
      </div>
      <div className="flex items-start gap-3 w-full my-4">
        <h2 className="text-2xl 2xl:text-4xl mb-1">👉</h2>
        <p className="text-sm 2xl:text-balance  text-slate-800 tracking-wide leading-snug">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe,
          repellendus odit. Voluptates soluta ipsum quasi, exercitationem
          perspiciatis ad, ab beatae at officia consequuntur suscipit laborum
          qui velit, accusantium neque. In? <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe,
          repellendus odit. Voluptates soluta ipsum quasi, exercitationem
          perspiciatis ad, ab beatae at officia consequuntur suscipit laborum
          qui velit, accusantium neque. In?
        </p>
      </div>
      <div className="flex items-start gap-3 w-full my-4">
        <h2 className="text-2xl 2xl:text-4xl mb-1">👉</h2>
        <p className="text-sm 2xl:text-balance  text-slate-800 tracking-wide leading-snug">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe,
          repellendus odit. Voluptates soluta ipsum quasi, exercitationem
          perspiciatis ad, ab beatae at officia consequuntur suscipit laborum
          qui velit, accusantium neque. In? <br />
          repellendus odit. Voluptates soluta ipsum quasi, exercitationem
        </p>
      </div>
      <p className=" py-5 text-sm 2xl:text-base border-t w-full border-gray-400">
        Visit our Website at{" "}
        <span className=" font-semibold mx-1"> www.blupro/support.com</span> to
        get support and further information.
      </p>
    </div>
  );
};

export default page;
