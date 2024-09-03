import React from "react";
import Dropdown from "./Dropdown";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import Image from "next/image";
import SummaryCard from "./SummaryCard";

const Summary = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <div>
          <SummaryCard
            title={"Active Users"}
            number={3632}
            description={"Overall last month"}
            arrow={<TbArrowBigUpLines />}
            percentage={30.5626}
            chart={"blueChart"}
            color={"#24BC73"}
          />
        </div>
        <div>
          <SummaryCard
            title={"Total Resources"}
            number={400}
            description={"Overall last month"}
            arrow={<TbArrowBigUpLines />}
            percentage={30.5626}
            chart={"redChart"}
            color={"#24BC73"}
          />
        </div>
        <div>
          <SummaryCard
            title={"Total Interactions"}
            number={400}
            description={"Overall last month"}
            arrow={<TbArrowBigDownLines />}
            percentage={30.5626}
            chart={"greenChart"}
            color={"red-400"}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
