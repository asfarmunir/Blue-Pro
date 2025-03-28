"use server"

import { connectToDatabase } from "..";
import { revalidatePath } from "next/cache";
import Activity from  "@/database/activity.modal";

export const createActivity = async (data,path) => {
    try {
        await connectToDatabase();
        const activity = new Activity(data);
        await activity.save();
        revalidatePath(path);
        return JSON.parse(JSON.stringify({
            status: 201,
            message: "Activity created successfully",
            activity
        }));
    } catch (error) {
        console.error("Error creating activity:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to create activity"
        }));
    }
}

export const getAllActivities = async ({page, limit, search }) => {
    try {
        await connectToDatabase();

        // Define query conditions
        const query = search
            ? { $or: [
                    { title: { $regex: search, $options: "i" } },
                ] }
            : {};

        // Get total entries and calculate pages
        const totalEntries = await Activity.countDocuments(query);
        const totalPages = Math.ceil(totalEntries / limit);

        // Retrieve activities with pagination
        const activities = await Activity.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        return JSON.parse(JSON.stringify({
            status: 200,
            activities,
            totalPages,
            totalEntries,
            currentPage: page,
        }));
    } catch (error) {
        console.error("Error getting all activities:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to get activities",
        }));
    }
};


export const getSingleActivity = async (id) => {
    try {
        await connectToDatabase();
        const activity = await Activity.findById(id);
        return JSON.parse(JSON.stringify({
            status: 200,
            activity,
        }));
    } catch (error) {
        console.error("Error getting single activity:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to get activity",
        }));
    }
}


export const updateActivity = async (id, data, path) => {
    try {
        await connectToDatabase();
        const activity = await Activity.findByIdAndUpdate(id, data, {
            new: true,
        });
        revalidatePath(path);
        return JSON.parse(JSON.stringify({
            status: 200,
            message: "Activity updated successfully",
            activity,
        }));
    }
    catch (error) {
        console.error("Error updating activity:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to update activity",
        }));
    }

}


export const deleteActivity = async (id, path) => {
    try {
        await connectToDatabase();
        await Activity.findByIdAndDelete(id);
        revalidatePath(path);
        return JSON.parse(JSON.stringify({
            status: 200,
            message: "Activity deleted successfully",
        }));
    } catch (error) {
        console.error("Error deleting activity:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to delete activity",
        }));
    }
}
