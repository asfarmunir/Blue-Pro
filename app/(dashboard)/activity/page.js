import React from 'react'
import Activities from '@/components/shared/Activities'
import { getAllActivities } from '@/database/actions/activity.action';



const page = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.name || "";
  const allActivities = await getAllActivities({
    page,
    limit: 4,
    search
  });
  console.log("🚀 ~ page ~ allActivities:", allActivities)
  return (
    <Activities activities={allActivities.activities} 
    totalPages={allActivities.totalPages}
    page={page}
    />
  )
}

export default page