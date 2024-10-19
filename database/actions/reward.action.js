'use server'
import Reward from "../reward.modal";
import { connectToDatabase } from "..";
import { revalidatePath } from "next/cache";

export const createReward = async (data) => {
  try {
    await connectToDatabase();
    const reward = new Reward(data);
    await reward.save();
    revalidatePath('/inventory');
    return JSON.parse(JSON.stringify({reward,status:200}));


  } catch (error) {
    console.log("🚀 ~ file: reward.action.js ~ line 33 ~ createReward ~ error", error)
    return JSON.parse(JSON.stringify({error,status:500}));
  }
};
export const getAllRewards = async ({
  page , // Default to page 1 if not provided
  limit, // Default limit to 10 if not provided
}) => {
  try {
    await connectToDatabase();

    const totalEntries = await Reward.countDocuments(); // Get total number of entries
    const totalPages = Math.ceil(totalEntries / limit); // Calculate total pages

    // Fetch paginated results
    const rewards = await Reward.find()
      .skip((page - 1) * limit) // Skip entries based on the page number
      .limit(limit); // Limit the number of entries per page

    return JSON.parse(
      JSON.stringify({
        rewards,
        totalPages,
        totalEntries,
        currentPage: page,
        status: 200,
      })
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: reward.action.js ~ line 47 ~ getAllRewards ~ error",
      error
    );
    return JSON.parse(
      JSON.stringify({
        error: "An error occurred while fetching rewards",
        status: 500,
      })
    );
  }
};


export const getRewardById = async (id) => {
  try {
    await connectToDatabase();
    const reward = await Reward.findById(id).populate('attachedProducts');
    
    if (!reward) {
      return JSON.parse(JSON.stringify({ message: "Reward not found", status: 404 }));
    }
    
    return JSON.parse(JSON.stringify({ reward, status: 200 }));
  } catch (error) {
    console.log("🚀 ~ file: reward.action.js ~ line 61 ~ getRewardById ~ error", error);
    return JSON.parse(JSON.stringify({ error: error.message, status: 500 }));
  }
};


export const updateReward = async (id,reward) => {
    try {
        await connectToDatabase();
        const updatedReward = await Reward.findByIdAndUpdate(id,reward,{new:true});
        revalidatePath("/iventory");
        return JSON.parse(JSON.stringify({updatedReward,status:200}));
    }
    catch (error) {
        console.error("Update product failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}

export const deleteReward = async (id) => {
    try {
        await connectToDatabase();
         await Reward.findByIdAndDelete(id);
        revalidatePath("/iventory");
        return JSON.parse(JSON.stringify({status:200}));
    } catch (error) {
        console.error("Delete product failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}