import {Schema,model,models } from 'mongoose';

const activitySchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    usersToShow: {
        type: [String], 
        default: [] 
    },
    description: {
        type: String,
        required: true,
    },
    externalLink :{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
    },
     media: {
        type: String,
    },
    isVideo: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: String,
    },
    scheduleDate: {
        type: String,
    },
     location: {
        type: String,
        required: true,
    },
    likes: [{
        type: String,
        required: true,
    }],
    comments: [{
        userId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        userImage: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
});

export default models.Activity || model('Activity', activitySchema);


