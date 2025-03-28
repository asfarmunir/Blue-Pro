
import { getAllUsers} from "@/database/actions/user.action";
export const dynamic = "force-dynamic"; // Force dynamic renderin
import AllUsers from "@/components/shared/AllUsers";

async function  Page() {

  const allUsers =  await getAllUsers();

  return (
  <AllUsers allUsers={allUsers}  />
  );
}

export default Page;
