import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./model/User.js";
import Product from "./model/Product.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //It will help us to get file body in under route
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://19-Arid-839:19arid839@cluster0.wpyujq6.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB connection error", err));
////////////////////////////////////////////////////////////////////////////////////////
app.post("/register", async (req, res) => {
  try {
    // Create a new User instance using the request body
    let user = new User(req.body);
    // Save the user data to the database
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    // Send the result back as the response
    res.send(result);
  } catch (err) {
    console.error("Error saving user to database", err);
    res.status(500).send("Error saving user to database");
  }
});
//////////////////////////////////////////////////////////////////////////////////////
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user Found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////
app.post("/add-product", async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (err) {
    console.error("Error saving user to database", err);
    res.status(500).send("Error saving user to database");
  }
});
////////////////////////////////////////////////////////////////////////////////////////
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
});
////////////////////////////////////////////////////////////////////////////////////////
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
//////////////////////////////////////////////////////////////////////////////////////
app.get("/updateproduct/:id", async(req,res)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.send({result:"Invalid ID"});
    return;
  }

  let result=await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send({result:"No Record Found"})
  }
})
/////////////////////////////////////////////////////////////////////////////

app.put("/updateproduct/:id", async(req,res)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.send({result:"Invalid ID"});
    return;
  }

  try {
    let result = await Product.updateOne(
      {_id: req.params.id},
      {$set: req.body}
    );
    res.send({result: "Product updated successfully"});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
