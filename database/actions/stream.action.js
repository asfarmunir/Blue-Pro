"use server"

import { connectToDatabase } from "..";
import Stream from "../stream.modal";


import {
IngressAudioEncodingPreset,
IngressVideoEncodingPreset,
IngressClient,
IngressInput,
RoomServiceClient,
} from "livekit-server-sdk"
import User from "../user.modal";
import {
TrackSource} from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";
import { type } from "os";

const roomService = new RoomServiceClient(
    process.env.NEXT_PUBLIC_LIVEKIT_APP_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
);

const ingressClient = new IngressClient(process.env.NEXT_PUBLIC_LIVEKIT_APP_URL);
// process.env.LIVEKIT_API_KEY,
//     process.env.LIVEKIT_API_SECRET

 const resetIngresses = async (hostIdentity) => {

const ingresses = await ingressClient.listIngress({
  roomName: hostIdentity,
});
console.log("🚀 ~ resetIngresses ~ ingresses:", ingresses)

const rooms = await roomService.listRooms([hostIdentity]);
console.log("🚀 ~ resetIngresses ~ room2:", rooms)

for (const room of rooms) {
await roomService.deleteRoom(room.name);

}
for (const ingress of ingresses) {
if (ingress.ingressId) {
await ingressClient.deleteIngress(ingress.ingressId);
}}



}


export const createIngress = async (id,data) => {

    try {
      
        await connectToDatabase();
        const userData  = await User.findById(id);

        if(!userData){
            return JSON.parse(JSON.stringify({
                status: 404,
                message: "User not found",
            }));
        }

        await resetIngresses(userData._id.toString());

        const options = {
            name: userData.username,
            roomName: userData._id.toString(),
            participantName : userData.username,
            participantIdentity: userData._id.toString(),

            // video: {
            //     source: TrackSource.SCREEN_SHARE,
            //     preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            // },
            // audio: {
            //     source: TrackSource.SCREEN_SHARE_AUDIO,
            //     preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS,
            // },
            video : {
                source : TrackSource.CAMERA,
                preset : IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
            audio : {
                source: TrackSource.MICROPHONE,
                preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            }
        }


        const ingress = await ingressClient.createIngress(
             IngressInput.RTMP_INPUT,
            options,

        );

        if(!ingress|| !ingress.url || !ingress.streamKey){
            return JSON.parse(JSON.stringify({
                status: 500,
                message: "Failed to create ingress",
            }));
        }

        const streamData = {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
            userId: userData._id,
            name: data.name,
            thumbnail: data.thumbnail,
            tags: data.tags,
            externalUrl: data.externalUrl,
            description: data.description,

        }

        const stream = new Stream(streamData);
        await stream.save();

        revalidatePath('/live/go-live');

        return JSON.parse(JSON.stringify({
            status: 200,
            message: "Ingress created successfully",
            data: streamData
        }));
        
    } catch (error) {

        console.error("Error creating ingress:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to create ingress"
        }));
        
    }

}

export const getUserStream = async (id) => {

    try {
        await connectToDatabase();
        const userData = await User.findById(id);

        if(!userData){
            return JSON.parse(JSON.stringify({
                status: 404,
                message: "User not found",
            }));
        }

        const streamData = await Stream.findOne({userId: userData._id});

        if(!streamData){
            return JSON.parse(JSON.stringify({
                status: 404,
                message: "Stream not found",
            }));
        }

        return JSON.parse(JSON.stringify({
            status: 200,
            data: streamData
        }));


    }
    catch (error) {
        console.error("Error getting user stream:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to get user stream"
        }));
    }
}

export const getStreamById = async (id) => {
    try {
        await connectToDatabase();
        const streamData = await Stream.findById(id);

        if(!streamData){
            return JSON.parse(JSON.stringify({
                status: 404,
                message: "Stream not found"
            }));
        }

        return JSON.parse(JSON.stringify({

            status: 200,
            data: streamData
        }));

    } catch (error) {
        console.error("Error getting stream by id:", error);
        return JSON.parse(JSON.stringify({
            status: 500,
            message: "Failed to get stream by id"
        }));
    }
}


// export const getAllStreams = async () => {

//     try {
//         await connectToDatabase();
//         const streams = await Stream.find({});

//         if(!streams){
//             return JSON.parse(JSON.stringify({
//                 status: 404,
//                 message: "Streams not found",
//             }));
//         }

//         return JSON.parse(JSON.stringify({
//             status: 200,
//             data: streams
//         }));

//     } catch (error) {
//         console.error("Error getting all streams:", error);
//         return JSON.parse(JSON.stringify({
//             status: 500,
//             message: "Failed to get all streams"
//         }));
//     }
// }

export const getAllStreams = async ({page = 1, limit = 6, name}) => {
    console.log("🚀 ~ getAllStreams ~ name:", name)
  try {
    await connectToDatabase();

    const query = name
      ? {  name : { $regex: name, $options: "i" } } // Case-insensitive search by stream title
      : {};

    const totalStreams = await Stream.countDocuments(query); // Total streams matching the query
    const streams = await Stream.find(query)
      .skip((page - 1) * limit) // Skip documents for pagination
      .limit(limit); // Limit number of documents

    if (!streams || streams.length === 0) {
      return JSON.parse(
        JSON.stringify({
          status: 200,
          data: [],
          total: 0,
          message: name
            ? `No streams found for the search term: "${name}"`
            : "No streams available",
        })
      );
    }

    return JSON.parse(
      JSON.stringify({
        status: 200,
        data: streams,
        total: Math.ceil(totalStreams / limit),
        message: "Streams fetched successfully",
      })
    );
  } catch (error) {
    console.error("Error getting all streams:", error);
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Failed to get all streams",
      })
    );
  }
};


export const updateStreamStatus = async (id, status) => {
    
        try {
            await connectToDatabase();
            const streamData = await Stream.findById(id);

            if(!streamData){
                return JSON.parse(JSON.stringify({
                    status: 404,
                    message: "Stream not found"
                }));
            }

            if(status === "live"){
                streamData.isLive = true;
            }
            else if(status === "offline"){
                streamData.isLive = false;
            }
           
            
            await streamData.save();

            revalidatePath('/live');

            return JSON.parse(JSON.stringify({
                status: 200,
                message: "Stream status updated successfully"
            }));

        } catch (error) {

            console.error("Error updating stream status:", error);
            return JSON.parse(JSON.stringify({
                status: 500,
                message: "Failed to update stream status"
            }));
        }

}


export const deleteStreamById = async (id) => {
    try {
        
        await connectToDatabase();
        await Stream.findByIdAndDelete(id);
        revalidatePath('/live');

        return {
            status: 200,
            message: "Stream deleted successfully"
        }

    } catch (error) {
        
        console.error("Error deleting stream:", error);
        return {
            status: 500,
            message: "Failed to delete stream"
        }
    }
}