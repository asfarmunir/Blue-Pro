import React from "react";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import SummaryCard from "./SummaryCard";
import { getCountOfAllUsers } from "@/database/actions/user.action";

const Summary = async () => {
  const numberOfUsers = await getCountOfAllUsers();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <div>
          <SummaryCard
            title={"Active Users"}
            number={numberOfUsers - 1}
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
