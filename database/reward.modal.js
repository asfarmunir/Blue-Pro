import  {Schema, model, models} from 'mongoose';

const rewardSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bluepoints: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
    },
    link:{
        type: String,
    },
    attachedProducts : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
},{
    timestamps: true
})


const   Reward = models.Reward || model('Reward', rewardSchema);
export default Reward;