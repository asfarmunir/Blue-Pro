'use server'

import { connectToDatabase } from "..";
import streamModal from "../stream.modal";


import {
IngressAudioEncodingPreset,
IngressVideoEncodingPreset,
IngressClient,
TrackSource,
IngressInput,
RoomServiceClient,
} from "livekit-server-sdk"
import User from "../user.modal";
// import {
// TrackSource,

// } from "livekit-client-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.NEXT_PUBLIC_LIVEKIT_APP_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
);

const ingressClient = new IngressClient(
    process.env.NEXT_PUBLIC_LIVEKIT_APP_URL,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET
);


 const resetIngresses = async (hostIdentity) => {

const ingresses = await ingressClient.listIngress({
  roomName: hostIdentity,
});
console.log("🚀 ~ resetIngresses ~ rooms:", ingresses)

const rooms = await roomService.listRooms([hostIdentity]);
console.log("🚀 ~ resetIngresses ~ room2:", rooms)

for (const room of rooms) {
await roomService.deleteRoom(room.name);

}
for (const ingress of ingresses) {
if (ingress.ingressId) {
await ingressClient.deleteIngress(ingress.ingressId);
}}}


export const createIngress = async (id) => {

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

            video: {
                source: TrackSource.SCREEN_SHARE,
                preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
            audio: {
                source: TrackSource.SCREEN_SHARE_AUDIO,
                preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS,
            },
            // video : {
            //     // source : TrackSource.CAMERA,
                
            //     source : TrackSource.SCREEN_SHARE,
            //     preset : IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            // },
            // audio : {
            //     source: TrackSource.MICROPHONE,
            //     preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            // }
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
            name: userData.username,
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
            userId: userData._id
        }

        const stream = new streamModal(streamData);
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