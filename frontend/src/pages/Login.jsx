import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            
        await api.post("/auth/login", form);
        alert("User Logged")
        navigate("/");
        }catch(error){
            alert(error.response?.data?.message || "Somtheing Went Wrong");
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            Email Address <input type="email" name="email" value={form.email} onChange={handleChange}></input>
            Password <input type="password" name="password" value={form.password} onChange={handleChange}></input>
            <button type="submit">Login to Lumina</button>
        </form>
        <p>Don't have an account?<Link to="/register">Register</Link></p>
        </>
    )
}

export default Login;