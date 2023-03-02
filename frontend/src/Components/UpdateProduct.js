import React, { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router-dom"
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params=useParams();
  const navigate=useNavigate();
  useEffect(()=>{
   getProductdetails();
  },[])
  const getProductdetails= async()=>{
console.log(params);
let result= await fetch(`http://localhost:5000/updateproduct/${params.id}`);
result=await result.json();

setName(result.name);
setPrice(result.price);
setCategory(result.category);
setCompany(result.company);

  }
  const updateProduct = async () => {
   console.warn(name,price,category,company);
   let result= await fetch(`http://localhost:5000/updateproduct/${params.id}`,{
    method:"Put",
    body:JSON.stringify({name,price,company,category}),
    headers:{
      'Content-Type':'Application/json'
    }
   });
   result=await result.json();
   if(result){
    navigate('/');
   }else{
    
   }
  };
  return (
    <div className="product">
      <h2>Update Product</h2>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />

      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
