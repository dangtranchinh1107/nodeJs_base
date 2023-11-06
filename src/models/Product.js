import mongoose from "mongoose";
import mongoosepagonate from 'mongoose-paginate-v2';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }

}, { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosepagonate)
export default mongoose.model('Product', productSchema)