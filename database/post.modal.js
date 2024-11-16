import {Schema,model,models} from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags : {
        type: [String],

    },
    url: {
        type: String,
    },
    groupId : {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    }

}, { timestamps: true });

const Post = models.Post || model('Post', postSchema);

export default Post;
