import Summary from "@/components/dashboard/summary/Summary";
import { columns, removeJob } from "./columns";
import DataTable from "@/components/shared/DataTable";
import Search from "@/components/shared/Search";
import { CiCircleChevDown, CiFilter } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuCalendarDays } from "react-icons/lu";
import { getAllUsers } from "@/database/actions/user.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import BlockUser from "@/components/shared/BlockUser";

const users = [
  {
    pid: "1",
    name: "Fareed",
    userTypes: "Creator",
    bluPoints: 10,
    email: "fareedjaved203@gmail.com",
    rewards: "1",
  },
  {
    pid: "2",
    name: "Alice",
    userTypes: "Contributor",
    bluPoints: 20,
    email: "alice@example.com",
    rewards: "2",
  },
  {
    pid: "3",
    name: "Bob",
    userTypes: "Creator",
    bluPoints: 15,
    email: "bob@example.com",
    rewards: "1",
  },
  {
    pid: "4",
    name: "Charlie",
    userTypes: "Viewer",
    bluPoints: 5,
    email: "charlie@example.com",
    rewards: "0",
  },
  {
    pid: "5",
    name: "Diana",
    userTypes: "Contributor",
    bluPoints: 25,
    email: "diana@example.com",
    rewards: "3",
  },
  {
    pid: "6",
    name: "Ethan",
    userTypes: "Creator",
    bluPoints: 30,
    email: "ethan@example.com",
    rewards: "4",
  },
  {
    pid: "7",
    name: "Fiona",
    userTypes: "Viewer",
    bluPoints: 12,
    email: "fiona@example.com",
    rewards: "1",
  },
  {
    pid: "8",
    name: "George",
    userTypes: "Contributor",
    bluPoints: 22,
    email: "george@example.com",
    rewards: "2",
  },
  {
    pid: "9",
    name: "Hannah",
    userTypes: "Creator",
    bluPoints: 18,
    email: "hannah@example.com",
    rewards: "3",
  },
  {
    pid: "10",
    name: "Isaac",
    userTypes: "Viewer",
    bluPoints: 8,
    email: "isaac@example.com",
    rewards: "0",
  },
  {
    pid: "11",
    name: "Jack",
    userTypes: "Contributor",
    bluPoints: 28,
    email: "jack@example.com",
    rewards: "2",
  },
  {
    pid: "12",
    name: "Kara",
    userTypes: "Creator",
    bluPoints: 35,
    email: "kara@example.com",
    rewards: "5",
  },
  {
    pid: "13",
    name: "Leo",
    userTypes: "Viewer",
    bluPoints: 11,
    email: "leo@example.com",
    rewards: "1",
  },
  {
    pid: "14",
    name: "Mia",
    userTypes: "Contributor",
    bluPoints: 26,
    email: "mia@example.com",
    rewards: "3",
  },
  {
    pid: "15",
    name: "Nina",
    userTypes: "Creator",
    bluPoints: 19,
    email: "nina@example.com",
    rewards: "2",
  },
];



const jobSeekers = async (pageNo = 1) => {
  const jobs = users;
  const limit = 10;
  const startIndex = (pageNo - 1) * limit;
  const endIndex = startIndex + limit;
  const slicedData = jobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(jobs.length / limit);

  return {
    data: slicedData,
    pagination: {
      pageNo,
      limit,
      totalPages,
      totalRecords: jobs.length,
    },
  };
};

async function User({ searchParams }) {

  const allUsers =  await getAllUsers();
  console.log("🚀 ~ User ~ allUsers:", allUsers)
  console.log("id is: ", removeJob);
  const { page } = searchParams;
  const { data, pagination } = await jobSeekers(page);

  return (
    <div className="" style={{ backgroundColor: "white" }}>
      <Summary />

      <div className="border rounded-xl py-7 mb-4 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Users Details</h2>
          
          <div className="flex items-center gap-8">
          <Search />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className=" px-4 py-2  inline-flex items-center rounded-lg font-bold border-2"
              >
                Today
                <LuCalendarDays className=" text-lg 2xl:text-xl ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="px-4 bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="mb-3" />

              <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
                View all Details
              </Button>

              <hr
                className="pt-2 border-t-1 block w-full"
                style={{ borderColor: "#CCCCCD" }}
              />
              <Button
                className="bg-[#D3175233] w-full rounded-md mb-2"
                style={{ color: "#D31752" }}
                >
                Delete
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        
        </div>
            <Table>
          <TableHeader className="bg-[#F9FAFB] border">
            <TableRow>
              <TableHead>PID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead className="text-center">Bluepoints</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center" >Rewards</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers?.users?.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className=" capitalize text-xs max-w-[120px]  2xl:text-sm  ">
                    #{index+1}
                  </TableCell>
                  <TableCell className=" capitalize text-xs max-w-[120px]  2xl:text-sm  font-semibold">
                    {user.username}
                  </TableCell>
                  <TableCell className="text-xs max-w-[120px] 2xl:text-sm">
                    <p className="bg-[#E6F7F8] text-[#00A3B4] flex items-center  justify-center w-fit gap-2 text-center font-bold px-3  py-2 rounded-full">
                      <span className=" h-2 w-2 capitalize  rounded-full bg-[#00A3B4]"></span>
                      {user.userType}
                    </p>
                  </TableCell>
                  <TableCell className=" text-xs max-w-[100px] text-center  2xl:text-sm  ">
                    {user.bluepoints}
                  </TableCell>
                  <TableCell className=" text-xs max-w-[180px]  2xl:text-sm  ">
                    {user.email}
                  </TableCell>
                  <TableCell className=" text-xs max-w-[180px] text-center  2xl:text-sm  ">
                    {user.rewards || 0}
                  </TableCell>
                  <TableCell className="  max-w-[130px] text-xs 2xl:text-sm  ">
                     <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <CiCircleChevDown className="text-3xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="px-4 pt-4 bg-white">
            <Link href={`/user/${user._id}`}>
             <Button className="bg-[#E7E7E7] w-full px-12  rounded-md mb-2 text-black hover:text-white">
              View User
            </Button>
            </Link>
            <hr
              className="pt-2 border-t-1 block w-full "
              style={{ borderColor: "#CCCCCD" }}
            />
            {/* <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
              Send Blu Points
            </Button>
            <hr
              className="pt-2 border-t-1 block w-full"
              style={{ borderColor: "#CCCCCD" }}
            />
            <Button className="bg-[#E7E7E7] w-full rounded-md mb-2 text-black hover:text-white">
              View Claimed Rewards
            </Button> */}
            {/* <hr
              className="pt-2 border-t-1 block w-full"
              style={{ borderColor: "#CCCCCD" }}
            /> */}
            <BlockUser id={user._id} isBlocked={user.isBlocked}/>
          </DropdownMenuContent>
        </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          title={"Total Users"}
        /> */}
      </div>
    </div>
  );
}

export default User;
