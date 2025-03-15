import Summary from "@/components/dashboard/summary/Summary";
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
import Link from "next/link";
import BlockUser from "@/components/shared/BlockUser";
import Pagination from "@/components/shared/Pagination";



async function User({ searchParams }) {

  const page = Number(searchParams.page) || 1;
  const name = searchParams.name|| undefined;
  const allUsers =  await getAllUsers(
    {
      page,
      limit: 8,
      name
    }
  );

  return (
    <div className="" style={{ backgroundColor: "white" }}>
      {/* <Summary /> */}

      <div className="border rounded-xl py-7 mb-4 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Users Details</h2>
          
          <div className="flex items-center gap-8">
          <Search />
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
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
             <Button className="bg-[#E7E7E7] w-full  rounded-md mb-2 text-black hover:text-white">
              View User
            </Button>
            </Link>
            <Link href={`/user/chat/${user._id}`}>
             <Button className="bg-[#E7E7E7] w-full  rounded-md mb-2 text-black hover:text-white">
              Chat with User
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
        
            {
              allUsers.users.length === 0 && (
                <div className="text-center w-full text-sm text-gray-500 py-4">
                  No User Record Found
                </div>
              )
            }
         <div className=" w-full mt-4">
          <Pagination
            page={page}
            totalPages={allUsers.totalPages}
            urlParamName="page"
          />
        </div>
      </div>
    </div>
  );
}

export default User;
