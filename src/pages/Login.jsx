import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
import { API } from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, []);



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
        const styles = {
            page: {
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
            },
            card: {
                background: "#fff",
                padding: 30,
                width: 350,
                borderRadius: 8,
            },
            btn: {
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: 10,
                marginTop: 10,
                width: "100%",
            },
            logout: {
                marginTop: 10,
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: 10,
                width: "100%",
            },
        };

    };

    // return (
    //     <div>
    //         <h2>Seller Login</h2>
    //         <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
    //         <br />
    //         <input
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <br />
    //         <button onClick={login}>Login</button>
    //     </div>
    // );
    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2>Seller Login</h2>

                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login} style={styles.btn}>
                    Login
                </button>
            </div>
        </div>
    );

}

export default Login;
