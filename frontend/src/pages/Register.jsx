import { useState } from "react";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";





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
        <div className="w-full min-h-screen bg-blue-50">

            <div className="flex justify-center pt-10 ">
                <div>
                    <div className=" flex flex-col items-center mb-16 text-center">
                        <FaLightbulb size={40} className="text-[#3525CD] mb-6" />
                        <h1 className=" font-bold text-4xl mb-4">Join ZenNotes</h1>
                        <div className="w-70 text-center">
                            <p>Your new digital sanctuary for deep focus and organized thought.</p>
                        </div>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className="shadow-2xl p-8 flex flex-col gap-4 max-w-96 w-full bg-white">
                            <label className="flex flex-col gap-2">
                                <p>Full Name</p>
                                <div className="flex  items-center gap-2 bg-blue-50 p-2">
                                    <CgProfile /><input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} placeholder="Alex Rivera" className="focus:outline-none focus:ring-0"></input>
                                </div>
                            </label>
                            <div className="flex flex-col gap-2">
                                <p>Email Address</p>
                                <label className="flex  items-center gap-2 bg-blue-50 p-2">
                                    <MdEmail /><input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} placeholder="alex@gmail.com" className="focus:outline-none focus:ring-0"></input>
                                </label>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Secure Password</p>
                                <label className="flex  items-center gap-2 bg-blue-50 p-2">
                                    <TbLockPassword /><input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="focus:outline-none focus:ring-0"></input>
                                </label>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="flex justify-center font-bold items-center gap-2 px-4 py-2 rounded-md w-full bg-blue-700 text-white  hover:bg-blue-800 cursor-pointer tranistion">Create My Account <FaArrowRight /></button>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                By registering, you agree to our Terms of Service
                                and Privacy Policy.
                            </div>
                        </div>
                    </form>
                    <div className="flex  justify-center mt-8 mb-10">
                        <p className="flex gap-2">Already have an account? <Link to="/login" className="text-blue-500 font-semibold ">Log in here</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register;