import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
    <img className="logo" alt="logo" src="https://cdn.pixabay.com/photo/2017/11/16/09/13/monogram-2953821_960_720.png"/>
      { auth ?
        <ul className="nav-ul">
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/addproduct">Add Product</Link>
          </li>
          <li>
            <Link to="/updateproduct">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
          </li>
          </ul>
           :
          <ul className="nav-ul nav-right">
           <li>
              <Link to="/signup">Sign Up</Link>
           </li>
           <li>
              <Link to="/login">Log In</Link>
           </li>
          </ul>
      }
    </div>
  );
};

export default Navbar;
