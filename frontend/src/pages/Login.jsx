import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { IoSparkles } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/auth/login", form);
            alert("User Logged")
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Somtheing Went Wrong");
        }
    }

    return (
        <div className="bg-blue-50 h-screen w-full">
            <div className="flex  justify-center pt-16 ">
                <div className="shadow-2xl p-6 max-w-96 w-full bg-white rounded-md">
                    <div>
                        <div className="flex flex-col items-center p-2">
                            <IoSparkles size={60} className="bg-blue-600 p-2 rounded-md text-white mb-4"/>
                            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                            <div className="w-60">
                                <p className="text-center mb-6">Enter your credentials to access your digital sanctuary.</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    Email Address
                                    <label className="flex gap-2 items-center bg-blue-50 p-2 rounded-md">
                                        <MdEmail /> <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@gmail.com" className="focus:outline-none focus:ring-0"></input>
                                    </label>
                                </div>
                                <div className="flex flex-col gap-1">
                                    Password
                                    <label className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                                        <TbLockPassword /> <input type="password" name="password" value={form.password} onChange={handleChange}className="focus:outline-none focus:ring-0"></input>
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="flex items-center justify-center gap-2 font-bold px-4 py-2 bg-blue-700 text-white w-full rounded-md hover:bg-blue-800 cursor-pointer tranistion">Login to ZenNotes <FaArrowRight /></button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-8">
                            <p className="flex gap-2 justify-center font-semibold text-center text-gray-500">Don't have an account?<Link to="/register" className="text-blue-400 font-semibold">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;