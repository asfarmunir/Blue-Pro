import { Schema,model, models } from "mongoose";


const streamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail :{
        type:String,
    },
    ingressId :{
        type: String,
    },
    serverUrl: {
        type: String,
    },
    streamKey:{
        type:String,
    },

    isLive:{
        type:Boolean,
        default:false
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
},{
    timestamps:true
});


const streamModal = models.Stream || model('Stream', streamSchema);

export default streamModal