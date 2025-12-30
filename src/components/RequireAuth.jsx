import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { API } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const login = async () => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Seller Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
