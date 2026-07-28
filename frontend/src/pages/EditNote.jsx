import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditNote = () =>{
    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: ""
    });

    useEffect(() =>{
        const fetchNote = async () =>{
            try{
                 const res = await api.get(`/note/${id}`);
                 setForm({
                    title: res.data.data.title,
                    description: res.data.data.description
                 });
            
            }catch(error){
                console.log(error.response?.data?.message || error.message);
            } 
        }

        fetchNote();

    }, [id]);

    const handleChange = (e) =>{
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            
        await api.put(`/note/${id}`, form);
        setForm({
            title: "",
            description: ""
        });
        navigate("/");
        }catch(error){
            console.log(error.response?.data?.message || error.message);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            Note Title <input type="text" name="title" value={form.title} onChange={handleChange}></input>
            <textarea name="description" value={form.description} onChange={handleChange}></textarea>
            <button>Save Changes</button>
        </form>
        </>
    )
}

export default EditNote;