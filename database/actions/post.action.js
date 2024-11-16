"use server"

import Post from "@/database/post.modal";
import { connectToDatabase } from "..";
import { revalidatePath } from "next/cache";


export const createPost = async (data,path) => {
    try {
        await connectToDatabase();
        const post = new Post(data);
        await post.save();
        revalidatePath(path);
        return JSON.parse(JSON.stringify({
            status: 201,
            message: "Post created successfully",
            post
        }));
    } catch (error) {
        console.error("Error creating post:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to create post"
        }));
    }
}


export const getPostsOfGroup = async (groupId) => {
    try {
        await connectToDatabase();
        const posts = await Post.find({ groupId }).populate('creator').sort({createdAt: -1});

        if(!posts){
            return JSON.parse(JSON.stringify({
                status: 404,
                message: "No posts found"
            }));
        }

        return JSON.parse(JSON.stringify({
            status: 200,
            posts
        }));
    } catch (error) {
        console.error("Error fetching posts:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to fetch posts"
        }));
    }
}