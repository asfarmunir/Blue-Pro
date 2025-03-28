
import { getAllUsers, getAllUsersWithFiltering } from "@/database/actions/user.action";

import AllUsers from "@/components/shared/AllUsers";

async function  Page() {

  const allUsers =  await getAllUsers();
  // console.log("🚀 ~ User ~ allUsers:", allUsers)
  const usersWithoutFilter =  await getAllUsersWithFiltering();

  return (
  <AllUsers allUsers={allUsers} usersWithoutFilter={usersWithoutFilter} />
  );
}

export default Page;
