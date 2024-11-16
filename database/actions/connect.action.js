'use server'

import Group from '@/database/connect.modal';
import { connectToDatabase } from "..";
import { revalidatePath } from 'next/cache';

export const createGroup = async (group) => {
    try {
        await connectToDatabase();
        const newGroup = await Group.create(group);
        revalidatePath('/connect');
        return JSON.parse(JSON.stringify({newGroup,status:200}));
    } catch (error) {
        console.error("Create group failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}

export const getAllGroups = async ({
  page = 1, // Default to page 1 if not provided
  limit = 10, // Default limit to 10 if not provided
  name
}) => {
  try {
    await connectToDatabase();

    let query = {};

    // If name is provided, add the name filter to the query
    if (name) {
      query = { name: { $regex: name, $options: "i" } }; // Case-insensitive search using regex
    }

    // Get the total number of groups matching the query
    const totalEntries = await Group.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / limit); // Calculate total pages

    // Fetch paginated groups based on the query
    const groups = await Group.find(query)
      .skip(Number((page - 1)) * limit) // Skip entries based on the page number
      .limit(limit); // Limit the number of entries per page

    return JSON.parse(
      JSON.stringify({
        groups,
        totalPages,
        totalEntries,
        currentPage: page,
        status: 200,
      })
    );
  } catch (error) {
    console.error("Get all groups failed", error);
    return JSON.parse(
      JSON.stringify({
        error: error.message,
        status: 500,
      })
    );
  }
};


export const getGroupById = async (id) => {
    try {
        await connectToDatabase();
        const group = await Group.findById(id);

        if (!group) {
            return JSON.parse(
                JSON.stringify({
                    error: "Group not found",
                    status: 404,
                })
            );
        }

        return JSON.parse(JSON.stringify({ group, status: 200 }));
    }
    catch (error) {
        console.error("Get group by id failed", error);
        return JSON.parse(
            JSON.stringify({
                error: error.message,
                status: 500,
            })
        );
    }
}


export const createJoinRequest = async (groupId, userId) => {
    try {
        await connectToDatabase();
        const group = await Group.findById(groupId);
        console.log("🚀 ~ createJoinRequest ~ group:", group)

        if (!group) {
            return JSON.parse(
                JSON.stringify({
                    error: "Group not found",
                    status: 404,
                })
            );
        }

        // Check if the user is already a member of the group
        const isMember = group.members.some(member => member.user.toString() === userId);
        if (isMember) {
            return JSON.parse(
                JSON.stringify({
                    error: "User is already a member of the group",
                    status: 400,
                })
            );
        }

        // Check if the user has already sent a join request
        const hasPendingApproval = group.pendingApprovals.some(request => request.user.toString() === userId);
        if (hasPendingApproval) {
            return JSON.parse(
                JSON.stringify({
                    error: "User has already sent a join request",
                    status: 400,
                })
            );
        }

        // Add user to pending approvals
        group.pendingApprovals.push({
            user: userId,
            requestedAt: Date.now(),  // This will be set by default but can be explicitly set
        });

        await group.save();
        
        return JSON.parse(JSON.stringify({ group, status: 200 }));

    } catch (error) {
        console.error("Create join request failed", error);
        return JSON.parse(
            JSON.stringify({
                error: error.message,
                status: 500,
            })
        );
    }
};


export const getPendingJoinRequestsOfGroup = async (groupId) => {
    try {
        await connectToDatabase();

        // Find the group by its ID and select only the pendingApprovals field
        const group = await Group.findById(groupId).populate('pendingApprovals.user', 'username email createdAt');

        if (!group) {
            return JSON.parse(
                JSON.stringify({
                    error: "Group not found",
                    status: 404,
                })
            );
        }

        const pendingRequests = group.pendingApprovals.map(request => ({
            userId: request.user._id,
            username: request.user.username,
            userEmail: request.user.email,
            requestedAt: request.requestedAt,
            groupName : group.name,
             createdAt: request.requestedAt,
             groupId: group._id

        }));

        return JSON.parse(
            JSON.stringify({
                pendingRequests,
                status: 200,
            })
        );
    } catch (error) {
        console.error("Get pending requests failed", error);
        return JSON.parse(
            JSON.stringify({
                error: error.message,
                status: 500,
            })
        );
    }
};


export const getAllPendingJoinRequests = async () => {
    try {
        await connectToDatabase();

        // Use aggregation to get pending requests across all groups
        const pendingRequests = await Group.aggregate([
            { 
                $unwind: "$pendingApprovals" // Unwind the pendingApprovals array
            },
            { 
                $lookup: {
                    from: "users", // Reference to the User model collection
                    localField: "pendingApprovals.user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails" // Unwind the user details
            },
            {
                $project: {
                    groupName: "$name",
                    groupId: "$_id",
                    userId: "$pendingApprovals.user",
                    username: "$userDetails.username",
                    userEmail: "$userDetails.email",
                    requestedAt: "$pendingApprovals.requestedAt",
                    userCreatedAt: "$userDetails.createdAt"
                }
            }
        ]);

        if (!pendingRequests.length) {
            return JSON.parse(
                JSON.stringify({
                    message: "No pending join requests found",
                    status: 404,
                })
            );
        }

        return JSON.parse(
            JSON.stringify({
                pendingRequests,
                status: 200,
            })
        );
    } catch (error) {
        console.error("Get all pending requests failed", error);
        return JSON.parse(
            JSON.stringify({
                error: error.message,
                status: 500,
            })
        );
    }
};



export const handleJoinRequest = async (groupId, userId, action, path) => {
    try {
        await connectToDatabase();

        // Find the group by its ID
        const group = await Group.findById(groupId);

        if (!group) {
            return JSON.parse(
                JSON.stringify({
                    error: "Group not found",
                    status: 404,
                })
            );
        }

        // Find the pending approval request
        const pendingRequestIndex = group.pendingApprovals.findIndex(
            (request) => request.user.toString() === userId.toString()
        );

        if (pendingRequestIndex === -1) {
            return JSON.parse(
                JSON.stringify({
                    error: "Join request not found",
                    status: 404,
                })
            );
        }

        // Handle approval
        if (action === "approve") {
            // Move user to members array
            group.members.push({
                user: userId,
                joinedAt: new Date(),
            });

            // Remove the user from pending approvals
            group.pendingApprovals.splice(pendingRequestIndex, 1);

            await group.save();

            return JSON.parse(
                JSON.stringify({
                    message: "User approved and added to members list",
                    group,
                    status: 200,
                })
            );
        }

        // Handle disapproval
        if (action === "disapprove") {
            // Simply remove the user from pending approvals
            group.pendingApprovals.splice(pendingRequestIndex, 1);

            await group.save();

            return JSON.parse(
                JSON.stringify({
                    message: "User disapproved and removed from pending list",
                    group,
                    status: 200,
                })
            );
        }
        revalidatePath(path);
        return JSON.parse(
            JSON.stringify({
                error: "Invalid action. Must be 'approve' or 'disapprove'.",
                status: 400,
            })
        );
    } catch (error) {
        console.error("Handle join request failed", error);
        return JSON.parse(
            JSON.stringify({
                error: error.message,
                status: 500,
            })
        );
    }
};


