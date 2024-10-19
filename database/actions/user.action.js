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

export const getAllUsers = async () => {
    try {
        await connectToDatabase();
        const users = await User.find();
        return JSON.parse(JSON.stringify({users,status:200}));
    } catch (error) {
        console.error("Get all users failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}


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
        user.bluepoints = bluepoints;
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