import {React,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.warn("email,password", email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
    // localStorage.setItem("user", JSON.stringify(result));
    // navigate("/");
  };

  return (
    <div className="login">
      <h2>Login </h2>
      <input
        type="text"
        placeholder="Enter Your Email"
        className="inputBox"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Password"
      />
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
