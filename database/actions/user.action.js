"use server"
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "..";
import User from '@/database/user.modal';

const API_URL = "https://stats.blupro.live/api/user/";
const BEARER_TOKEN = "b3lu462ab148e68fge56e4te4534t";

export const getRecentUsers = async () => {
  try {
    await connectToDatabase();
    
    // Get 10 most recent users
    const users = await User.find().sort({ createdAt: -1 }).limit(10);

    // Fetch additional details from the external API
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const userObj = user.toObject(); // Ensure all fields are accessible

        if (!userObj.bluId) return userObj; // Skip if no bluId

        try {
          const response = await axios.post(
            `${API_URL}${userObj.bluId}`,
            {}, // No request body needed
            {
              headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );

          return {
            ...userObj, // Keep existing user details
            ...response.data, // Attach extra data from the API
          };
        } catch (error) {
          console.error(`Failed to fetch BluData for ${userObj.bluId}:`, error.message);
          return { ...userObj }; // Handle errors gracefully
        }
      })
    );

    return JSON.parse(JSON.stringify({ users: usersWithDetails, status: 200 }));
  } catch (error) {
    console.error("Get recent users failed", error);
    return JSON.parse(JSON.stringify({ error: error.message, status: 500 }));
  }
};

export const getCountOfAllUsers = async()=>{
    
  try {
    await connectToDatabase();
    const totalUsers = await User.countDocuments();
    return totalUsers;
  } catch (error) {
    console.error("Get total users failed", error);
    return 0;
  }
}

import axios from "axios";

export const getAllUsers = async () => {
  try {
    const API_URL = "https://stats.blupro.live/api/user/";
    const BEARER_TOKEN = "b3lu462ab148e68fge56e4te4534t";

    // 1️⃣ Fetch Users from Your Database
    const users = await User.find({}, "-authToken -__v"); // Exclude sensitive fields

    // 2️⃣ Fetch External Data in Parallel
    const usersWithDetails = await Promise.all(

      users.map(async (userObj) => {
            const user = userObj.toObject(); // Convert Mongoose document to plain object

        try {
          if (!user.bluId) return user; // Skip if no bluId

          const response = await axios.post(
            `${API_URL}${user.bluId}`,
            {}, // No body required
            {
              headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Merge user data with external API response
          return {
            ...user,
            ...response.data, // Attach API data
          };
        } catch (error) {
          console.error(`Failed to fetch BluData for ${user.bluId}:`, error.message);
          return { ...user }; // Return null if request fails
        }
      })
    );

    return JSON.parse(
      JSON.stringify({
        users: usersWithDetails,
        status: 200,
      })
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      error: error.message,
      status: 500,
      users: [], // Return an empty array in case of error
    };
  }
};


export const getAllUsersWithFiltering = async () => {
  try {
    await connectToDatabase();

    // Fetch paginated users, or search by username if 'name' is provided
    const users = await User.find();
    // revalidatePath('/user');

    return JSON.parse(
      JSON.stringify({
        users,
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

        const userObj = user.toObject(); // Convert Mongoose document to plain object
        const { bluId } = userObj;
        const API_URL = `https://stats.blupro.live/api/user/${bluId}`;

        const res = await axios.post(API_URL, {}, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        const { data } = res;
        if (!data) {
            return JSON.parse(JSON.stringify({status:404}));
        }
        const mergedUser = { ...userObj, ...data };
        return JSON.parse(JSON.stringify({user: mergedUser,status:200}));

    } catch (error) {
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
        
    }
}

export const addBluepoints = async (id,bluepoints) => {
    console.log("🚀 ~ addBluepoints ~ bluepoints:", bluepoints)
    console.log("🚀 ~ addBluepoints ~ id:", id)
    try {
        await connectToDatabase();

        const user = await User.findById(id);
        if(!user) throw new Error('invalid token');
        user.totalGems =  user.totalGems + Number(bluepoints);
        await user.save();
        revalidatePath(`/user/${id}`)
        return JSON.parse(JSON.stringify({user,status:200}));
        
    } catch (error) {
      console.error("Error adding bluepoints:", error);
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