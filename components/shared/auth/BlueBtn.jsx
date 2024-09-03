import React from "react";

const BlueBtn = ({ title }) => {
  return (
    <button className="w-full bg-[#38B6FF] text-white font-semibold text-center py-4 rounded-xl">
      {title}
    </button>
  );
};

export default BlueBtn;
