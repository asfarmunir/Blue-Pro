import React from 'react'
import Activities from '@/components/shared/Activities'
import { getAllActivities } from '@/database/actions/activity.action';
import { getAllUsers, getAllUsersWithFiltering } from '@/database/actions/user.action';



const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.name || "";
  const allActivities = await getAllActivities({
    page,
    limit: 4,
    search
  });
    const usersWithoutFilter =  await getAllUsersWithFiltering();
      const allUsers =  await getAllUsers();
    
  
  return (
    <Activities activities={allActivities.activities} 
    totalPages={allActivities.totalPages}
    page={page}
    users={allUsers.users}
    />
  )
}

export default page