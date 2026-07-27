import { useState } from "react";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            alert("User Registered Successfully");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Something Went Wrong");
        }

    }

    return (
        <>
            <form onSubmit={handleForm}>
                Username <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange}></input>
                Email Address <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}></input>
                Secure Password <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}></input>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </>
    )
}

export default Register;