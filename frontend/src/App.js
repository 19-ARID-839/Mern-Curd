import "./App.css";
import Product from "./Components/Product";
import Navbar from "./Components/Navbar";
import UpdateProduct from "./Components/UpdateProduct"
import AddProduct from "./Components/AddProduct"
import Profile from "./Components/Profile"
import Signup from "./Components/Signup";
import Logout from "./Components/Logout"
import Footer from "./Components/Footer";
import PrivateComponent from "./Components/PrivateComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
function App() {
  return (
    <div className="App">
    
      <Router>
      <Navbar />
        <Routes>
        <Route element={<PrivateComponent/>}>
          <Route path="/" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
</Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </Router>
      <Footer />
    </div> 
  );
}

export default App;
