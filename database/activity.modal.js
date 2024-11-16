import {Schema,model,models } from 'mongoose';

const activitySchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
   
    description: {
        type: String,
        required: true,
    },
    link :{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    scheduleTime: {
        type: String,
    },
    scheduleDate: {
        type: String,
    },

});

export default models.Activity || model('Activity', activitySchema);


