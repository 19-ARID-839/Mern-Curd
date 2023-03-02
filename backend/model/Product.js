import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userID:String,
    company:String,
});

export default mongoose.model('products', productSchema);