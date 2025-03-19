import React from 'react'
import Activities from '@/components/shared/Activities'
import { getAllActivities } from '@/database/actions/activity.action';
import { getAllUsersWithFiltering } from '@/database/actions/user.action';



const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.name || "";
  const allActivities = await getAllActivities({
    page,
    limit: 4,
    search
  });
    const usersWithoutFilter =  await getAllUsersWithFiltering();
  
  return (
    <Activities activities={allActivities.activities} 
    totalPages={allActivities.totalPages}
    page={page}
    users={usersWithoutFilter.users}
    />
  )
}

export default page