import {Schema, model, models} from 'mongoose';

const ProductSchema = new Schema(
    {
        name: {type: String, required: true},
        attachedBluePoints: {type: Number, required: true, default: 0},
        description: {type: String, required: true},
        image: {type: String, },
    },
    {timestamps: true}
);

const Product = models.Product || model('Product', ProductSchema);

export default Product;