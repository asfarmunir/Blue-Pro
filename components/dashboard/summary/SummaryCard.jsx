import React from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

const SummaryCard = ({
  title,
  percentage,
  description,
  chart,
  arrow,
  number,
  color,
}) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center space-x-10 mb-5">
        <div>
          <Dropdown />
        </div>
        <div className={`flex text-red-500 space-x-1`}>
          {arrow}
          <div className="text-xs">{percentage}%</div>
        </div>
      </div>
      <div className="flex justify-between space-x-6">
        <div>
          <div className="text-[#042124] text-sm font-bold">{title}</div>
          <div className="text-xl 2xl:text-2xl font-bold ">{number}</div>
          <div className="text-[#616161] font-semibold mt-2 text-xs">
            {description}
          </div>
        </div>
        <div>
          <Image
            src={`/${chart}.svg`}
            width={120}
            height={120}
            alt="blue-chart"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
