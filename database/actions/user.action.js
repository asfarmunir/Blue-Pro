'use server'
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "..";
import User from '@/database/user.modal';


export const getRecentUsers = async () => {
    try {
        await connectToDatabase();
        const users = await User.find().sort({ createdAt: -1 }).limit(10);
        return JSON.parse(JSON.stringify({users,status:200}));
    } catch (error) {
        console.error("Get recent users failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
};

export const getAllUsers = async ({
  page = 1, // Default to page 1 if not provided
  limit = 8, // Default limit to 8 if not provided
  name, // Username to search for
}) => {
  console.log("🚀 ~ name:", name)
  try {
    await connectToDatabase();

    let query = {}; // Empty query object to build on
    if (name) {
      // If 'name' param is provided, search for users by username
      query = { username: { $regex: name, $options: "i" } }; // Case-insensitive search
    }

    // Get total number of users for pagination
    const totalEntries = await User.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / limit);

    // Fetch paginated users, or search by username if 'name' is provided
    const users = await User.find(query)
      .skip((page - 1) * limit) // Skip based on the page number
      .limit(limit); // Limit number of results per page

    // Revalidate path as needed
    revalidatePath('/user');

    return JSON.parse(
      JSON.stringify({
        users,
        totalPages,
        totalEntries,
        currentPage: page,
        status: 200,
      })
    );
  } catch (error) {
    console.error("Get all users failed", error);
    return JSON.parse(
      JSON.stringify({
        error: error.message,
        status: 500,
      })
    );
  }
};



export const getUserById = async (id) =>{
    try {
        await connectToDatabase();
        const user = await User.findById(id);
        if(!user){
        return JSON.parse(JSON.stringify({status:404}));
        }
        return JSON.parse(JSON.stringify({user,status:200}));

    } catch (error) {
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
        
    }
}

export const addBluepoints = async (id,bluepoints) => {
    try {
        await connectToDatabase();

        const user = await User.findById(id);
        if(!user) throw new Error('invalid token');
        user.bluepoints =  user.bluepoints + Number(bluepoints);
        await user.save();
        revalidatePath(`/user/${id}`)
        return JSON.parse(JSON.stringify({user,status:200}));
        
    } catch (error) {
        return JSON.parse(JSON.stringify({error: error.message,status:500}));

        
    }
}

export const blockUser = async (id) => {
    try {
        await connectToDatabase();

        const user = await User.findById(id);
        if(!user) throw new Error('invalid token');
        user.isBlocked = !user.isBlocked;
        await user.save();
        revalidatePath(`/user`)
        return JSON.parse(JSON.stringify({user,status:200}));
        
    } catch (error) {
        return JSON.parse(JSON.stringify({error: error.message,status:500}));

        
    }
}