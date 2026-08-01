import { useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaFile } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";



const CreateNote = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/note", form);
            setForm({
                title: "",
                description: ""
            });

            navigate("/");
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className="h-full w-full">
            <div className="max-w-6xl m-auto w-full p-8">
                <div className="flex flex-col">
                    <div>
                        <p className="font-semibold text-[#3525CD]">---- NEW WORKSPACE</p>
                        <h2 className="font-bold text-xl">Create New Note</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <div className=" mt-10 w-4xl h-140 shadow-2xl p-8">
                        <div className="flex flex-col gap-4">
                            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter title..." className="text-4xl text-blue-500 focus:outline-none focus:ring-0"></input>
                            <div className="flex gap-6 mb-10">
                                <p className="bg-blue-200 px-2 rounded-md font-semibold text-white flex items-center gap-1"><FaFile />Personal</p>
                                <p className="text-gray-400">{new Date().toLocaleDateString("en-UN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" placeholder="Start typing your thoughts..." className="w-3xl h-80 resize-none focus:outline-none focus:ring-0"></textarea>
                       <div className="flex justify-end-safe gap-6">
                        <button onClick={() =>{navigate("/")}} className="font- text-gray-500 cursor-pointer">Cancel</button>
                         <button type="submit" className="flex gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 rounded-md cursor-pointer transition">Create Note <FaArrowRight /></button>
                       </div>
                        </div>
                    
                        </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNote