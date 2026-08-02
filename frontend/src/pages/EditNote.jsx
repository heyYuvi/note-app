import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { RiEditBoxFill } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import { CiCircleCheck } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";




const EditNote = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    const [update, setUpdate] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/note/${id}`);
                console.log(res);
                setForm({
                    title: res.data.data.title,
                    description: res.data.data.description
                });
                setUpdate(res.data.data.updatedAt);

            } catch (error) {
                console.log(error.response?.data?.message || error.message);
            }
        }

        fetchNote();

    }, [id]);


    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.put(`/note/${id}`, form);
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
        <div className="h-screen w-full">
        <div className="max-w-6xl m-auto w-full p-10 ">
            <div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                    <RiEditBoxFill className="text-blue-700" /><p className="font-semibold">EDITOR MODE</p>
                </div>
                <div>
                    
                    <p className="text-gray-500">Last updated {formatDistanceToNow(new Date(update), {
                        addSuffix: true,
                    })}</p>
                </div>
                </div>
                
                    <form onSubmit={handleSubmit} className="flex justify-center">
                        <div>
                            <div className="shadow-2xl px-8 py-12 mt-16 w-4xl flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[#3525CD] font-semibold ">
                                Note Title
                            </h2>
                        <input type="text" name="title" value={form.title} onChange={handleChange} className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-0"></input>
                        </div>    
                         
                        <div>
                            <textarea name="description" value={form.description} onChange={handleChange} className="w-3xl h-80 resize-none focus:outline-none"></textarea>
                        </div>
                        </div>
                        <div className="flex gap-6 mt-6 justify-end-safe">
                            
                        <button onClick={() =>{navigate("/")}} className="flex items-center gap-2 cursor-pointer"><GoArrowLeft /> Cancel</button>
                        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer flex items-center gap-2"><CiCircleCheck size={20}/>Save Changes</button>
                        </div>
                        </div>
                    </form>
                
            </div>
        </div>
        </div>
    )
}

export default EditNote;