import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true, //duy nhất
        defaultValue: "Uncategorized"
    },
    slug: {
        type: String,
        require: true,
        unique: true,
        defaultValue: "Uncategoried"
    },
    products:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ]

}, {
    timestamps: true, versionKey: false
})
export default mongoose.model("Category", categorySchema)