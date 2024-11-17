'use server'
import { AccessToken } from "livekit-server-sdk";
import { getUserById } from "./user.action";
import { connectToDatabase } from "..";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const createToken = async (identity) => {

    const self = await getServerSession(authOptions);
    const selfData = await getUserById(self.user._id);
    const host = await getUserById(identity);

    if(!host){
        throw new Error('invalid token');
    }

    const isHost = self.user._id === host.user._id

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
        identity:  isHost ? `host-${selfData.user.username}` : selfData.user.username,
        name: selfData.user.username
    });

    token.addGrant({
        room: host.user._id,
        canPublish: false,
        roomJoin: true,
        canPublishData: true,
    })

    return await Promise.resolve(token.toJwt());
}
