import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { connectToDatabase } from "@/database";
import streamModal from "@/database/stream.modal";


const receiver = new WebhookReceiver({
    apiKey: process.env.LIVEKIT_API_KEY,
    apiSecret: process.env.LIVEKIT_API_SECRET,
    });


    export async function POST(req)
    {
        const body = await req.text();
        await connectToDatabase();
        const headerPayload = headers()
        const authorization = headerPayload.get('Authorization');

        if(!authorization)
        {
            return {
                status: 401,
                body: 'Unauthorized'
            }
        }

        const event = await receiver.receive(body, authorization);
        console.log("🚀 ~ file: route.js ~ line 85 ~ POST ~ event", event)


           
            if(event.event === 'ingress_started'){
                const stream = await streamModal.findOne({ingressId:  event.ingressInfo.ingressId});
                if(stream){
                    stream.isLive = true;
                    await stream.save();
                }
            }

            if(event.event === 'ingress_ended'){
                const stream = await streamModal.findOne({ingressId: event.ingressInfo.ingressId});
                if(stream){
                    stream.isLive = false;
                    await stream.save();
                }



            }

    }