import mongoose, {Schema, models} from 'mongoose';

const ProductSchema = new Schema({
        productNo: {
            type: Number,
            required: true
        },
        productName: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);


const Product = models?.Prodcut || mongoose.model('Product', ProductSchema);

export default Product;